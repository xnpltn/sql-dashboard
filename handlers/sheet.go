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
		err := c.Bind(&sheet)
		if err != nil {
			fmt.Println(err)
		} else {
			app.DB().Create(&sheet)
			fmt.Println("data added succesffuly")
		}

		return c.JSON(http.StatusOK, "ok")
	}
}

func GetAllSheets(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var sheets []models.Sheet
		app.DB().Preload("Rows").Preload("Rows.Cells").Preload("Titles").Find(&sheets)
		return c.JSON(http.StatusOK, sheets)
	}
}

func DeleteSheet(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var data map[string]string
		c.Bind(&data)
		if err := app.DB().Transaction(func(tx *gorm.DB) error {
			// Find the sheet
			var sheet models.Sheet
			if err := tx.Where("id= ?", data["id"]).First(&sheet).Error; err != nil {
				return err
			}

			// Delete associated records (assuming you have defined the relationships in your models)
			if err := tx.Select(clause.Associations).Delete(&sheet).Error; err != nil {
				return err
			}

			return nil
		}); err != nil {
			fmt.Println("Error:", err)
		} else {
			fmt.Println("Successfully deleted sheet and associated data")
		}
		return c.JSON(http.StatusOK, "ok")
	}
}

func UpdateSheet(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
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
