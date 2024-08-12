package ui

import (
	"embed"

	"github.com/labstack/echo/v4"
)

//go:embed dist/*
var ui embed.FS

var UI = echo.MustSubFS(ui, "dist")
