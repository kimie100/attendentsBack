import { Injectable } from '@nestjs/common';
import { CreateAtendentDto } from './dto/create-atendent.dto';
import { UpdateAtendentDto } from './dto/update-atendent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FuncsService } from 'src/funcs/funcs.service';
import { Prisma, userAttends } from '@prisma/client';

@Injectable()
export class AtendentsService {
  constructor(
    private prisma: PrismaService,
    private func: FuncsService,
  ) {}
  async create(data: Prisma.userAttendsCreateInput) {
    let img = await this.func.uploadImg(data.imgClockIn);
    data.imgClockIn = img;
    let d = await this.prisma.userAttends.create({ data });
    return { id: d.id };
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userAttendsWhereUniqueInput;
    where?: Prisma.userAttendsWhereInput;
    orderBy?: Prisma.userAttendsOrderByWithRelationInput;
  }): Promise<userAttends[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.userAttends.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(
    userAttendentsWhereUniqueInput: Prisma.userAttendsWhereInput,
  ): Promise<userAttends | null> {
    return this.prisma.userAttends.findFirst({
      where: userAttendentsWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.userAttendsWhereUniqueInput;
    data: Prisma.userAttendsUpdateInput;
    id: string;
    clockout: Date;
  }): Promise<userAttends> {
    const { where, data, id, clockout } = params;
    let u = await this.findOne({ id });
    let h = await this.func.totalHours(u.clockIn, clockout);
    data.totalHours = h.toString();
    return this.prisma.userAttends.update({
      data,
      where,
    });
  }

  remove(where: Prisma.userAttendsWhereUniqueInput): Promise<userAttends> {
    return this.prisma.userAttends.delete({
      where,
    });
  }
}
