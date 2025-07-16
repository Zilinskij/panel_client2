export interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export interface Table {
  imjakompanii: string;
  kodkompanii: number | string;
}

export type Company = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: number | any;
  imjakompanii: string;
  kodkompanii?: number | string;
  dyrector?: string;
  stvorena?: string | number;
  nomertel?: number | string;
  adresa?: string;
  kilkprac?: number | string;
  kilkprychepiv?: number | string;
  kilkavto?: number | string;
  strahfirm?: string;
};

export interface InitialValuesProps {
  imjakompanii: string | null;
  kodkompanii?: string | null;
  nomertel?: string | null;
  stvorena?: string | null;
  adresa?: string | null;
  kilkprac?: string | null;
  kilkprychepiv?: string | null;
  dyrector?: string | null;
  kilkavto: string | null;
  strahfirm?: string | null;
}

export interface CompanyFormProps {
  name: string;
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ClientsValue {
  kod: number;
  nurdokl: string;
  nurdoklfix: string;
  nur: string;
  adrpunkt: string;
  adrvul: string;
  director: string;
  isclient: boolean;
  ispostach: boolean;
  iselse: string;
  isexp: boolean;
  permn: string;
  pernegabarit: string;
}

export type CustomColumnMeta = {
  headerLabel?: string;
};

export type CreateCompany = {
  id_admuser: number;
  company_name: string;
  id_country: number;
  locality: string;
  edrpou: string;
};

export type CompanyTable = {
  id?: number;
  company_name: string;
  dt_reestr: string | null;
  is_active: boolean;
  edrpou: string;
  lat: number | null;
  lon: number | null;
  locality: string;
  country: string;
  dt_blocked: string | null;
  dt_deleted: string | null;
};

export type CompanyFields = {
  id: number;
  country_name: string;
}
