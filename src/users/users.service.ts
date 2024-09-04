import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users, Prisma } from '@prisma/client';
import { FuncsService } from 'src/funcs/funcs.service';
import { SignIn } from './dto/signin-user.dto';
import { AuthsService } from 'src/auths/auths.service';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private funct: FuncsService,
    private auth: AuthsService,
  ) {}
  async create(data: Prisma.UsersCreateInput) {
    let hash = await this.funct.Hash(data.password);
    data.password = hash;
    return await this.prisma.users.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<Users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UsersWhereInput,
  ): Promise<Users | null> {
    return await this.prisma.users.findFirst({ where: userWhereUniqueInput });
  }

  update(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  remove(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.prisma.users.delete({
      where,
    });
  }
  async signin(data: SignIn) {
    let user = await this.findOne({ name: data.username });
    let islogin = await this.auth.checkSignIn(user.id);
    if (islogin)
      throw new HttpException('User have login', HttpStatus.NOT_FOUND);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    let p = await this.funct.comparePassword(data.password, user.password);
    if (!p)
      throw new HttpException(
        'Password or username not match',
        HttpStatus.NOT_FOUND,
      );
    let token = await this.auth.create(user.id, user.username);
    let users = {
      id: user.id,
      token: token,
    };
    return users;
  }
}
