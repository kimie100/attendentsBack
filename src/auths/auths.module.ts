import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './secret';

@Module({
  exports: [AuthsService],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
