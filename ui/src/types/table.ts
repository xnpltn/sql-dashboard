export enum DataType {
  Text = 0,
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
  createdAt: string;
  updatedAt: string;
}

export interface Row {
  id: string;
  cells: Cell[];
  sheet_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Title {
  id: string;
  name: string;
  dataType: number;
  dataTypeString: string;
  sheet_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cell {
  id: string;
  name: string;
  dataType: number;
  dataTypeString: string;
  value: string;
  row_id: string;
  createdAt: string;
  updatedAt: string;
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
      createdAt: "today",
      updatedAt: "today",
    },
    {
      id: "223e4567-e89b-12d3-a456-426614174002",
      name: "Title 2",
      dataType: DataType.Boolean,
      dataTypeString: "Boolean",
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "today",
      updatedAt: "today",
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
          createdAt: "today",
          updatedAt: "today",
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: "today",
          updatedAt: "today",
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "today",
      updatedAt: "today",
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
          createdAt: "today",
          updatedAt: "today",
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: "today",
          updatedAt: "today",
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "today",
      updatedAt: "today",
    }
  ],
  createdAt: "today",
  updatedAt: "today",
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
      createdAt: "today",
      updatedAt: "today",
    },
    {
      id: "223e4567-e89b-12d3-a456-426614174002",
      name: "Title 3",
      dataType: DataType.Boolean,
      dataTypeString: "Boolean",
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "today",
      updatedAt: "today",
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
          createdAt: "today",
          updatedAt: "today",
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: "today",
          updatedAt: "today",
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "today",
      updatedAt: "today",
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
          createdAt: "today",
          updatedAt: "today",
        },
        {
          id: "423e4567-e89b-12d3-a456-426614174005",
          name: "Cell 2",
          dataType: DataType.Number,
          dataTypeString: "Number",
          value: "42",
          row_id: "323e4567-e89b-12d3-a456-426614174003",
          createdAt: "today",
          updatedAt: "today",
        },

      ],
      sheet_id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "today",
      updatedAt: "today",
    }
  ],
  createdAt: "today",
  updatedAt: "today",
};


export function generateRandomString(length = 16) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
