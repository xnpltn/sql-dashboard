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
  title: string;
  dataType: number;
  dataTypeString: string;
  value: string;
  row_id: string;
  createdAt: string;
  updatedAt: string;
}

export function generateRandomString(length = 16) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
