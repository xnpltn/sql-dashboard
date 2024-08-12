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
	pragmas := "?_pragma=busy_timeout(10000)&_pragma=journal_mode(WAL)&_pragma=journal_size_limit(200000000)&_pragma=synchronous(NORMAL)&_pragma=foreign_keys(ON)&_pragma=temp_store(MEMORY)&_pragma=cache_size(-16000)"

	db, err = gorm.Open(sqlite.Open("store.db" + pragmas))
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
