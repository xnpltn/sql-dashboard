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
  title: string
}

export interface NewEntryParams {
  [key: string]: any;
}

export interface EditCellParams {
  id: string;
  //name: string;
  //title: string;
  //dataTypeString: string;
  value: string;
  //row_id: string;
}
