import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_Response, SigninDto, SignupDto } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signup(data: SignupDto): Promise<JWT_Response> {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExist) throw new UnauthorizedException('Usuario ja existe');

    const hashedPassword = await bcrypt.hashSync(
      data.password,
      process.env.SALTOS_HASH || 10,
    );

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        document: data.document,
        password: hashedPassword,
      },
    });

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signin(data: SigninDto): Promise<JWT_Response> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new UnauthorizedException('Usuario nao existe');

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Email ou senha invalidos');
    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
