import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos/auth';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return await this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SigninDto) {
    return await this.authService.signin(body);
  }

  @UseGuards(AuthGuard)
  @Get('infosUser')
  async infosUser(@Request() req) {
    // return req.user;
    return await this.authService.infosUser(req.user.email);
  }
}
