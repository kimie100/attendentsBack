import { Module } from '@nestjs/common';
import { AtendentsService } from './atendents.service';
import { AtendentsController } from './atendents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FuncsModule } from 'src/funcs/funcs.module';

@Module({
  imports: [PrismaModule, FuncsModule],
  controllers: [AtendentsController],
  providers: [AtendentsService],
})
export class AtendentsModule {}
