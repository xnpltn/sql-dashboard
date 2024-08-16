package models

import (
	"time"
)

type DataType uint8

const (
	Text DataType = iota
	CheckBox
	Status
	Tag
	Date
	Number
	Label
)

type Sheet struct {
	ID        string    `gorm:"type:string;primaryKey;default:(lower(hex(randomblob(16))))" json:"id"`
	Name      string    `json:"name" gorm:"type:varchar(100)"`
	Titles    []Title   `json:"titles" gorm:"foreignKey:SheetID"`
	Rows      []Row     `json:"rows" gorm:"foreignKey:SheetID"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
}

// Row represents a row in a spreadsheet, containing multiple cells.
type Row struct {
	ID        string    `gorm:"type:string;primaryKey;default:(lower(hex(randomblob(16))))" json:"id"`
	Cells     []Cell    `json:"cells" gorm:"foreignKey:RowID"`
	SheetID   string    `json:"sheet_id" gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
}

type Title struct {
	ID             string    `gorm:"type:string;primaryKey;default:(lower(hex(randomblob(16))))" json:"id"`
	Name           string    `json:"name"`
	DataType       DataType  `json:"dataType"`
	DataTypeString string    `json:"dataTypeString"`
	SheetID        string    `gorm:"not null"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
}

// Cell represents a single cell in a row, holding a specific type of data.
type Cell struct {
	ID             string    `gorm:"type:string;primaryKey;default:(lower(hex(randomblob(16))))" json:"id"`
	Name           string    `gorm:"type:text" json:"name"`
	DataType       DataType  `gorm:"type:int"`
	DataTypeString string    `json:"dataType" gorm:"type:text"`
	Value          string    `json:"value" gorm:"type:text not null"` // Using text type to store any value.
	RowID          string    `gorm:"not null"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
}
