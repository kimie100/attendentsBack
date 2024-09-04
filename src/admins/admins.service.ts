import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Admin } from '@prisma/client';
import { FuncsService } from 'src/funcs/funcs.service';
import { AuthsService } from 'src/auths/auths.service';
@Injectable()
export class AdminsService {
  constructor(
    private prisma: PrismaService,
    private func: FuncsService,
    private auth: AuthsService,
  ) {}
  async create(data: Prisma.AdminCreateInput) {
    return this.prisma.admin.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AdminWhereUniqueInput;
    where?: Prisma.AdminWhereInput;
    orderBy?: Prisma.AdminOrderByWithRelationInput;
  }): Promise<Admin[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.admin.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.AdminWhereInput): Promise<Admin | null> {
    return await this.prisma.admin.findFirst({ where });
  }

  update(params: {
    where: Prisma.AdminWhereUniqueInput;
    data: Prisma.AdminUpdateInput;
  }): Promise<Admin> {
    const { where, data } = params;
    return this.prisma.admin.update({ where, data });
  }

  remove(where: Prisma.AdminWhereUniqueInput): Promise<Admin> {
    return this.prisma.admin.delete({ where });
  }
  async signin(data: { username: string; password: string }) {
    let u = await this.findOne({ username: data.username });
    if (!u) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    let p = await this.func.comparePassword(data.password, u.password);
    if (!p)
      throw new HttpException(
        'Password or username not match',
        HttpStatus.NOT_FOUND,
      );
    let token = await this.auth.createAdmin(u.id, u.username);
    return {
      id: u.id,
      token: token,
    };
  }
}
