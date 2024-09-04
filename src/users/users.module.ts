import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FuncsModule } from 'src/funcs/funcs.module';
import { AuthsModule } from 'src/auths/auths.module';

@Module({
  imports: [PrismaModule, FuncsModule, AuthsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
