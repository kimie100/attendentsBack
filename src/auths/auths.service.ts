import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './secret';

@Injectable()
export class AuthsService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async create(id: string, username: string) {
    const payload = { sub: id, username: username };
    let token = await this.jwtService.signAsync(payload);
    let data = {
      jwt: token,
      isLogin: true,
      userId: id,
    };
    await this.prisma.auth.create({ data });
    return token;
  }
  async createAdmin(id: string, username: string) {
    const payload = { sub: id, username: username };
    let token = await this.jwtService.signAsync(payload);
    let data = {
      jwt: token,
      isLogin: true,
      adminid: id,
    };
    await this.prisma.auth.create({ data });
    return token;
  }
  async findJwtUser(userid: string, jwt: string) {
    try {
      const payload = await this.jwtService.verifyAsync(jwt, {
        secret: jwtConstants.secret,
      });
      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
  async checkSignIn(userId: string) {
    let u = await this.prisma.auth.findFirst({ where: { userId } });
    if (u.isLogin) return true;
    return false;
  }
  async renewToken(token: string, userId: string, username: string) {
    let u = await this.prisma.auth.findFirst({ where: { userId } });
    if (token !== u.jwt) throw new UnauthorizedException();
    const payload = { sub: userId, username: username };
    let newToken = await this.jwtService.signAsync(payload);

    return { token: newToken };
  }
  async resetIsLogin(userId: string) {
    // let u = await this.prisma.auth.findFirst({ where: { userId } });
    // if (!u) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // u.isLogin = false;
    return {
      status: HttpStatus.OK,
    };
  }
}
