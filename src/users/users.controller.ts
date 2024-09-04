import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users as UserModel } from '@prisma/client';
import { SignIn } from './dto/signin-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('/signin')
  async signIn(@Body() data: SignIn) {
    return await this.usersService.signin(data);
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll({ orderBy: { name: 'asc' } });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.usersService.update({
      data: updateUserDto,
      where: { id },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove({ id });
  }
}
