package handlers

import (
	"fmt"
	"net/http"

	"store/spdb/core"
	"store/spdb/models"

	"github.com/labstack/echo/v4"
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
		return nil
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
