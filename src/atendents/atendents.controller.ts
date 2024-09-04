import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtendentsService } from './atendents.service';
import { CreateAtendentDto } from './dto/create-atendent.dto';
import { UpdateAtendentDto } from './dto/update-atendent.dto';
import { userAttends as modelAttend } from '@prisma/client';
@Controller('atendents')
export class AtendentsController {
  constructor(private readonly atendentsService: AtendentsService) {}

  @Post()
  create(@Body() createAtendentDto: CreateAtendentDto) {
    return this.atendentsService.create(createAtendentDto);
  }

  @Get()
  findAll(): Promise<modelAttend[]> {
    return this.atendentsService.findAll({ orderBy: { id: 'asc' } });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<modelAttend> {
    return this.atendentsService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAtendentDto: UpdateAtendentDto,
  ): Promise<modelAttend> {
    return this.atendentsService.update({
      data: updateAtendentDto,
      where: { id },
      id,
      clockout: updateAtendentDto.clockOut,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atendentsService.remove({ id });
  }
}
