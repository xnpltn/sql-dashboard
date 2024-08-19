package db

import (
	"log"

	"store/spdb/models"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

// connect and initialize database
func ConnectDB() {
	var err error

	// do not know what it does. copied from pocketbase think it's a good thing

	db, err = gorm.Open(sqlite.Open("store.db"))
	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(
		&models.Sheet{},
		&models.Row{},
		&models.Title{},
		&models.Cell{},
	)
}

func DB() *gorm.DB {
	return db
}
