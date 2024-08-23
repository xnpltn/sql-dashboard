package handlers

import (
	"fmt"
	"net/http"

	"store/spdb/core"
	"store/spdb/models"

	"github.com/labstack/echo/v4"
)

func CreateEntry(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var newRow models.Row
		if err := c.Bind(&newRow); err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "error binding data"})
		}
		if res := app.DB().Where("sheet_id = ? ", newRow.SheetID).Create(&newRow); res.Error != nil {
			fmt.Println("error creating data", res.Error)
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "error saving data"})
		}
		fmt.Println("data created successfully")
		return c.JSON(http.StatusOK, "ok")
	}
}

func DeleteEntry(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func UpdateEntry(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var cells []models.Cell
		if err := c.Bind(&cells); err != nil {
			fmt.Println(err)
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "error saving data"})
		}
		for _, cell := range cells {
			if res := app.DB().Model(&models.Cell{}).Where("id = ?", cell.ID).Update("value", cell.Value); res.Error != nil {
				fmt.Println(res.Error)
				continue
			}
		}
		return c.JSON(http.StatusOK, echo.Map{"ok": "updated"})
	}
}

func GetEntry(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func GetAllEntries(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func DeleteAllEntries(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}
