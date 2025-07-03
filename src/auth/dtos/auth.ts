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

export interface JWT_Response {
  access_token: string;
}
