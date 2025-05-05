export interface UserIst {
  id: number;
  // dt_active
  // dt_blocked
  // dt_deleted
  // dt_reestr
  is_active: boolean;
  is_admin: boolean;
  phone_num: string;
  surname: string;
  last_name: string;
  name: string;
  password_hash?: string;
  email: string;
  firm_code: string;
}
