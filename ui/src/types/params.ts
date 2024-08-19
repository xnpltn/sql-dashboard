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
  dataType: DataType,
  value: string
}
