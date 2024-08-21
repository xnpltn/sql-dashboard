package application

import (
	"store/spdb/core"
	"store/spdb/handlers"

	"github.com/labstack/echo/v4"
)

func loadEntryRoutes(apiGroup *echo.Group, app core.App) {
	entry := apiGroup.Group("/entry")
	entry.POST("", handlers.CreateEntry(app))
	entry.DELETE("", handlers.DeleteAllEntries(app))
	entry.DELETE("/:id", handlers.DeleteEntry(app))
	entry.PUT("/:id", handlers.UpdateEntry(app))
	entry.GET("", handlers.GetAllEntries(app))
	entry.GET("/:id", handlers.GetEntry(app))
}

func loadSheetRoutes(apiGroup *echo.Group, app core.App) {
	table := apiGroup.Group("/sheet")
	table.POST("", handlers.CreateSheet(app))
	table.DELETE("", handlers.DeleteAllSheets(app))
	table.DELETE("/:id", handlers.DeleteSheet(app))
	table.PUT("/:id", handlers.UpdateSheet(app))
	table.GET("", handlers.GetAllSheets(app))
	table.GET("/:id", handlers.GetSheet(app))
}

func loadRowRoutes(apiGroup *echo.Group, app core.App) {
	table := apiGroup.Group("/row")
	apiGroup.DELETE("/delete-row/:id", handlers.DeleteRow(app))
	apiGroup.POST("/delete-rows", handlers.DeleteRows(app))
	table.GET("/:sheetId", handlers.GetRows(app))
}
