import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';
import { GrpcStrategy } from './strategies/grpc.strategy';
import { ModelsService } from 'src/models/models.service';
import { MinioService } from 'src/minio.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '15min' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    GrpcStrategy,
    EdgeDevicesService,
    ModelsService,
    MinioService
  ],
  exports: [AuthService, GrpcStrategy],
})
export class AuthModule {}
