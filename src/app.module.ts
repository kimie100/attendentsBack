import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FuncsModule } from './funcs/funcs.module';
import { AtendentsModule } from './atendents/atendents.module';
import { AuthsModule } from './auths/auths.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [PrismaModule, UsersModule, FuncsModule, AtendentsModule, AuthsModule, AdminsModule],
  providers: [],
})
export class AppModule {}
