import { Module } from '@nestjs/common';
import { FuncsService } from './funcs.service';
import { FuncsController } from './funcs.controller';

@Module({
  exports: [FuncsService],
  controllers: [FuncsController],
  providers: [FuncsService],
})
export class FuncsModule {}
