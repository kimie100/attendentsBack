import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FuncsModule } from 'src/funcs/funcs.module';
import { AuthsModule } from 'src/auths/auths.module';

@Module({
  imports: [PrismaModule, FuncsModule, AuthsModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
