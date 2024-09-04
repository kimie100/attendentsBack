import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin as modelAdmin } from '@prisma/client';
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll(): Promise<modelAdmin[]> {
    return this.adminsService.findAll({ orderBy: { id: 'asc' } });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<modelAdmin> {
    return this.adminsService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<modelAdmin> {
    return this.adminsService.update({ data: updateAdminDto, where: { id } });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<modelAdmin> {
    return this.adminsService.remove({ id });
  }
}
