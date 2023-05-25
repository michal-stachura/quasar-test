export interface User {
  email: string;
  password?: string;
  terms?: boolean;
}

export interface RegisterUser {
  email: string;
  password: string;
  terms: boolean;
}
