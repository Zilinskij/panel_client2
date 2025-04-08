export type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export interface Table {
  imjakompanii: string;
  kodkompanii: number | string;
}

export type Company = {
  id: number;
  imjakompanii: string;
  kodkompanii?: number | string
  dyrector?: string;
  stvorena?: string;
  nomertel?: number;
  adresa?: string;
  kilkprac?: number;
  kilkprychepiv?: number;
  kilkavto?: number;
  strahfirm?: string;
};


