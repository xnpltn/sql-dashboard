package handlers

import (
	"fmt"
	"net/http"
	"time"

	"store/spdb/core"
	"store/spdb/models"
	"store/spdb/tools"

	"github.com/labstack/echo/v4"
)

type Field struct {
	Name      string    `json:"name" form:"name" param:"name" query:"name"`
	Type      string    `json:"type" form:"type" param:"type" query:"type"`
	Data      []string  `json:"data" form:"data" param:"data" query:"data"`
	CreatedAt time.Time `json:"created_at" form:"created_at" param:"created_at" query:"created_at"`
	UpdatedAt time.Time `json:"updated_at" form:"updated_at" param:"updated_at" query:"updated_at"`
}

type Table struct {
	Name   string  `json:"name" form:"name" param:"name" query:"name"`
	Fields []Field `json:"fields" form:"fields" param:"fields" query:"fields"`
}

func CreateTable(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		var table models.Table
		c.Bind(&table)
		if err := tools.CreateTable(app, table); err != nil {
			fmt.Println(err)
		}

		return c.JSON(http.StatusCreated, "ok")
	}
}

func DeleteTable(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func UpdateTable(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func GetTable(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func GetAllTables(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}

func DeleteAllTables(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		return nil
	}
}
