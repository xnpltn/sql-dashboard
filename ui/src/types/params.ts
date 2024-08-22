import type { DataType } from "./table";

export interface NewSheetParams {
  name: string,
  titles: NewTitleParams[],
}

export interface NewTitleParams {
  name: string,
  dataTypeString: string,
}


export interface NewRowparams {
  cells: NewCellParams[],
  sheet_id: string,
}

export interface NewCellParams {
  dataTypeString: string,
  value: string
}

export interface NewEntryParams {
  [key: string]: any;
}
