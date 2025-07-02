export interface SignupDto {
  name: string;
  email: string;
  password: string;
  document: string;
}

export interface SigninDto {
  email: string;
  password: string;
}
