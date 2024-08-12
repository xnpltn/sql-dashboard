// core  specifies the interface main application should follow
package core

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// main application interface
type App interface {
	// start starts the app
	Start(context.Context) error

	// shutdown shuts down the app
	Shutdown(*http.Server) error

	// db returns the database
	DB() *gorm.DB

	// router is the handler of the appl
	Router() *echo.Echo
}
