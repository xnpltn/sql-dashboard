export enum DataType {
  Text,
  Boolean,
  Status,
  Tag,
  Date,
  Number,
  Label,
}

export interface Sheet {
  id: string;
  name: string;
  titles: Title[];
  rows: Row[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Row {
  id: string;
  cells: Cell[];
  sheet_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Title {
  id: string;
  name: string;
  dataType: DataType;
  dataTypeString: string;
  sheet_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cell {
  id: string;
  name: string;
  dataType: DataType;
  dataTypeString: string;
  value: string;
  row_id: string;
  createdAt: Date;
  updatedAt: Date;
}




export const exampleSheet1: Sheet = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Example Sheet",
  titles: [
    {
      id: "223e4567-e89b-12d3-a456-426614174001",
      name: "Title 1",
      dataType: DataType.Text,
      dataTypeString: "Text",
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date("123456"),
      updatedAt: new Date(),
    },
    {
      id: "223e4567-e89b-12d3-a456-426614174002",
      name: "Title 2",
      dataType: DataType.Boolean,
      dataTypeString: "Boolean",
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  rows: [
    {
      id: "323e4567-e89b-12d3-a456-426614174003",
      cells: [
        {
          id: "423e4567-e89b-12d3-a456-426614174004",
          name: "Cell 1",
          dataType: DataType.Text,
          dataTypeString: "Text",
          value: "Example Value 1",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      id: "323e4567-e89b-12d3-a456-426614174003",
      cells: [
        {
          id: "423e4567-e89b-12d3-a456-426614174004",
          name: "Cell 1",
          dataType: DataType.Text,
          dataTypeString: "Text",
          value: "Example Value 1",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleSheet2: Sheet = {
  id: "123e4567-e89b-12d3-a456-426614174006",
  name: "Example Sheet 2",
  titles: [
    {
      id: "223e4567-e89b-12d3-a456-426614174001",
      name: "Title 4",
      dataType: DataType.Text,
      dataTypeString: "Text",
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date("123456"),
      updatedAt: new Date(),
    },
    {
      id: "223e4567-e89b-12d3-a456-426614174002",
      name: "Title 3",
      dataType: DataType.Boolean,
      dataTypeString: "Boolean",
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  rows: [
    {
      id: "323e4567-e89b-12d3-a456-426614174003",
      cells: [
        {
          id: "423e4567-e89b-12d3-a456-426614174004",
          name: "Cell 1",
          dataType: DataType.Text,
          dataTypeString: "Text",
          value: "Example Value 1",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      id: "323e4567-e89b-12d3-a456-426614174003",
      cells: [
        {
          id: "423e4567-e89b-12d3-a456-426614174004",
          name: "Cell 1",
          dataType: DataType.Text,
          dataTypeString: "Text",
          value: "Example Value 1",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

