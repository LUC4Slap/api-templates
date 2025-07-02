import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(data: SignupDto): Promise<User> {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExist) throw new UnauthorizedException('Usuario ja existe');

    const hashedPassword = await bcrypt.hashSync(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        document: data.document,
        password: hashedPassword,
      },
    });
    return user;
  }

  async signin(data: SigninDto) {
    return data;
  }
}
