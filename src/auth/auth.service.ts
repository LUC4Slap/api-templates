import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth';

@Injectable()
export class AuthService {
  async signup(data: SignupDto) {
    return data;
  }

  async signin(data: SigninDto) {
    return data;
  }
}
