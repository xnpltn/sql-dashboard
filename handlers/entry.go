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
		return nil
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
