package handlers

import (
	"fmt"
	"net/http"

	"store/spdb/core"
	"store/spdb/models"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreateSheet(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var sheet models.Sheet
		if err := c.Bind(&sheet); err != nil {
			fmt.Println("Error binding sheet:", err)
			return c.JSON(http.StatusBadRequest, "Invalid request")
		}

		for i, title := range sheet.Titles {
			if title.DataTypeString == "" {
				fmt.Println("Error: DataTypeString is empty for title at index", i)
				continue
			}
			/*
				const dataTypes: string[] = [
				  "Text",
				  "Status",
				  "Tag",
				  "Date",
				  "Number",
				  "Label"
				];
			*/

			switch title.DataTypeString {
			case "Text":
				sheet.Titles[i].DataType = models.Text
			case "Label":
				sheet.Titles[i].DataType = models.Label
			case "Tag":
				sheet.Titles[i].DataType = models.Tag
			case "Number":
				sheet.Titles[i].DataType = models.Number
			case "Date":
				sheet.Titles[i].DataType = models.Date
			default:
				fmt.Println("Warning: Unrecognized DataTypeString: ", title.DataTypeString, "Defaulting to Text!")
				sheet.Titles[i].DataType = models.Text
			}
		}

		if res := app.DB().Create(&sheet); res.Error != nil {
			fmt.Println("Error occured creating sheet!", res.Error.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "can't create table"})
		}
		fmt.Println("Data added successfully")
		return c.JSON(http.StatusOK, "Sheet created successfully")
	}
}

func GetAllSheets(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var sheets []models.Sheet
		if res := app.DB().Preload("Rows").Preload("Rows.Cells").Preload("Titles").Find(&sheets); res.Error != nil {
			fmt.Println(res.Error)
		}
		return c.JSON(http.StatusOK, sheets)
	}
}

func DeleteSheet(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var data map[string]string
		if err := c.Bind(&data); err != nil {
			fmt.Println("error binding data: ", err.Error())
			return c.JSON(http.StatusBadRequest, "invalid request")
		}

		sheetID := data["id"]
		if sheetID == "" {
			fmt.Println("error: sheet ID is missing")
			return c.JSON(http.StatusBadRequest, "sheet ID is required")
		}

		if err := app.DB().Transaction(func(tx *gorm.DB) error {
			// Find the sheet
			var sheet models.Sheet
			if err := tx.Preload(clause.Associations).Where("id = ?", sheetID).First(&sheet).Error; err != nil {
				fmt.Println("error getting sheet from id: ", err.Error())
				return err
			}

			// Delete the sheet and associated records
			if err := tx.Select(clause.Associations).Delete(&sheet).Error; err != nil {
				fmt.Println("error deleting sheet and associations: ", err.Error())
				return err
			}

			return nil
		}); err != nil {
			fmt.Println("Transaction error:", err)
			return c.JSON(http.StatusInternalServerError, "failed to delete sheet")
		}

		fmt.Println("Successfully deleted sheet and associated data")
		return c.JSON(http.StatusOK, "sheet deleted successfully")
	}
}

func UpdateSheet(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var sheetParams models.Sheet
		if err := c.Bind(&sheetParams); err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusBadRequest, "failed to delete sheet")
		}
		if err := app.DB().Model(&models.Sheet{}).Where("id = ?", sheetParams.ID).Update("name", sheetParams.Name).Error; err != nil {
			fmt.Println(err)
		} else {
			for _, titls := range sheetParams.Titles {
				if err := app.DB().Model(&models.Title{}).Where("id = ?", titls.ID).Update("name", titls.Name).Error; err != nil {
					fmt.Println(err)
				}
			}
		}
		return c.JSON(http.StatusOK, echo.Map{"success": "updated"})
	}
}

func SearchSheet(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var params echo.Map

		c.Bind(&params)
		fmt.Println(params)
		return nil
	}
}

func GetSheet(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func DeleteAllSheets(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}
