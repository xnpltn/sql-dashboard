package handlers

import (
	"net/http"

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
