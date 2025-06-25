export interface TranslateTableData {
  id?: number;
  lang?: string;
  expr: string;
  fld?: string;
  keystr?: string;
  tbl?: string;
  kilperekl?: number;
  ids?: string;
  id_admuser?: string | number;
  table?: string;
  field?: string;
  name?: string
}

export type TranslateTbl = {
  tbl: string;
  name: string;
};
