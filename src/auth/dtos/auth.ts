export interface SignupDto {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export interface SigninDto {
  email: string;
  password: string;
}
