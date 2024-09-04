import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FuncsService } from './funcs.service';
import { CreateFuncDto } from './dto/create-func.dto';
import { UpdateFuncDto } from './dto/update-func.dto';

@Controller('funcs')
export class FuncsController {
  constructor(private readonly funcsService: FuncsService) {}

  @Get()
  create(@Body() createFuncDto: CreateFuncDto) {
    return this.funcsService.uploadImg('ss');
  }
}
