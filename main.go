package main

import (
	"context"
	"flag"
	"log"
	"os"
	"os/signal"

	"store/spdb/application"
	"store/spdb/db"

	_ "github.com/glebarez/sqlite"
)

var PORT uint64

func init() {
	flag.Uint64Var(&PORT, "port", 6969, "port for server to listen on")
	db.ConnectDB()
}

func main() {
	flag.Parse()
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, os.Kill)
	defer cancel()

	app := application.New(PORT)
	if err := app.Start(ctx); err != nil {
		log.Fatal(err)
	}
}
