package handlers

import (
	"fmt"
	"net/http"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"store/spdb/core"
	"store/spdb/models"

	"github.com/labstack/echo/v4"
)

func GetRows(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var rows []models.Row
		app.DB().Preload("Cells").Find(&rows, "sheet_id = ?", c.Param("sheetId"))
		return c.JSON(http.StatusOK, rows)
	}
}

func DeleteRow(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		if err := app.DB().Transaction(func(tx *gorm.DB) error {
			// Find the row
			var row models.Row
			if err := tx.Preload(clause.Associations).Where("id = ?", id).First(&row).Error; err != nil {
				fmt.Println("error getting sheet from id: ", err.Error())
				return err
			}

			// Delete the row and associated records
			if err := tx.Select(clause.Associations).Delete(&row).Error; err != nil {
				fmt.Println("error deleting row and associations: ", err.Error())
				return err
			}

			return nil
		}); err != nil {
			fmt.Println("Transaction error:", err)
			return c.JSON(http.StatusInternalServerError, "failed to delete row")
		}
		return c.JSON(http.StatusOK, echo.Map{"success": "deleted successfully"})
	}
}
