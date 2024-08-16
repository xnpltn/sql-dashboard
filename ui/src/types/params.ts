import type { DataType } from "./table";

export interface NewSheetParams {
  name: string,
  titles: NewTitleParams[],
}

export interface NewTitleParams {
  name: string,
  dataType: DataType,
}
