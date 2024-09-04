import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}
  @Post()
  async checkJwt(@Body() req) {
    return await this.authsService.findJwtUser(req.userid, req.token);
  }
  @Post('/jwt')
  async renewJwt(
    @Body() req: { token: string; userid: string; username: string },
  ) {
    return await this.authsService.renewToken(
      req.token,
      req.userid,
      req.username,
    );
  }
  @Post('/reset')
  async reset(@Body() req: { id: string }) {
    return await this.authsService.resetIsLogin(req.id);
  }
}
