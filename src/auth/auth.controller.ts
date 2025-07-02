import { Body, Controller, Post } from '@nestjs/common';
import { signinDto, signupDto } from './dtos/auth';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup(@Body() body: signupDto) {
    console.log(body);
  }

  @Post('signin')
  async signin(@Body() body: signinDto) {
    console.log(body);
  }
}
