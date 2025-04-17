export interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export interface Table {
  imjakompanii: string;
  kodkompanii: number | string;
}

export type Company = {
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
