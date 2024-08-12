package application

import (
	"context"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"time"

	"store/spdb/core"
	"store/spdb/db"
	"store/spdb/ui"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

var _ core.App = (*app)(nil)

type app struct {
	router      *echo.Echo
	db          *gorm.DB
	port        uint64
	staticFiles fs.FS
}

func New(port uint64) core.App {
	return &app{
		router:      echo.New(),
		db:          db.DB(),
		port:        port,
		staticFiles: ui.UI,
	}
}

func (a *app) Start(ctx context.Context) error {
	server := http.Server{
		Handler: a.router,
		Addr:    fmt.Sprintf(":%d", a.port),
	}

	// a.router.Use(middleware.Logger())
	a.router.Use(middleware.CORS())

	// serve static files
	a.router.StaticFS("/", a.staticFiles)

	apiGroup := a.router.Group("/api")
	// initiate routes
	loadEntryRoutes(apiGroup, a)
	loadTableRoutes(apiGroup, a)

	// application routes

	errChan := make(chan error, 1)
	go func() {
		log.Println("Server listening on port: ", a.port)
		fmt.Println(a.db)
		err := server.ListenAndServe()
		if err != nil {
			errChan <- err
		}
	}()
	select {
	case <-errChan:
		err := <-errChan
		return err
	case <-ctx.Done():
		// graceful termination
		err := a.Shutdown(&server)
		if err != nil {
			log.Println("Failed to gracefully shutdown the server")
			log.Println(" Cause error: ", err.Error())
			log.Println("Forcefull shutting down the server")
			os.Exit(1)
		}
	}
	return nil
}

// shuts down the app gracefully waiting 10 seconds to finish running tasks
func (a *app) Shutdown(server *http.Server) error {
	log.Println("gracefully shutting down ...")
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	return server.Shutdown(ctx)
}

// exposes the db instance of the app
func (a *app) DB() *gorm.DB {
	return a.db
}

// exposes the router of the app
func (a *app) Router() *echo.Echo {
	return a.router
}
