import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '@src/user/entities/user.entity';
import { Role } from '@src/roles/entities/role.entity';
import { JwtGuards } from './guards/jwt.guards';
import { JwtStrategy } from './guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'MAX_APP',
        signOptions: {
          expiresIn: '3600s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuards, JwtStrategy],
})
export class AuthModule {}
