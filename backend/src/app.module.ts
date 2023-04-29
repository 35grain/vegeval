import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ModelsModule } from './models/models.module';
import { EdgeDevicesModule } from './edge-devices/edge-devices.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { EdgeDevicesController } from './edge-devices/edge-devices.controller';
import { ModelsController } from './models/models.controller';
import { ModelsService } from './models/models.service';
import { EdgeDevicesService } from './edge-devices/edge-devices.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GrpcController } from './grpc/grpc.controller';
import { GrpcModule } from './grpc/grpc.module';
import { MinioService } from './minio.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    ModelsModule,
    EdgeDevicesModule,
    GrpcModule
  ],
  controllers: [
    AuthController,
    UsersController,
    ModelsController,
    EdgeDevicesController,
    GrpcController
  ],
  providers: [
    PrismaService,
    MinioService,
    JwtService,
    AuthService,
    UsersService,
    ModelsService,
    EdgeDevicesService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
  ]
})
export class AppModule { }