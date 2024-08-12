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

func loadTableRoutes(apiGroup *echo.Group, app core.App) {
	table := apiGroup.Group("/table")
	table.POST("", handlers.CreateTable(app))
	table.DELETE("", handlers.DeleteAllTables(app))
	table.DELETE("/:id", handlers.DeleteTable(app))
	table.PUT("/:id", handlers.UpdateTable(app))
	table.GET("", handlers.GetAllTables(app))
	table.GET("/:id", handlers.GetTable(app))
}
