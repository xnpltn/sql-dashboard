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
		c.Bind(&newRow)
		fmt.Println("len cells: ", len(newRow.Cells))
		if res := app.DB().Where("sheet_id = ? ", newRow.SheetID).Create(&newRow); res.Error != nil {
			fmt.Println("error creating data", res.Error)
		} else {
			fmt.Println("data created successfully")
		}
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
