export interface User {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  position: string | null;
  groups: string[];
}

export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  position: string;
  phone_number: string;
  last_login: string | null;
  is_online: boolean;
}
