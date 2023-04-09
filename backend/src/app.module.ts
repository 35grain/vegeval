import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ModelsModule } from './models/models.module';
import { EdgeDevicesModule } from './edge-devices/edge-devices.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ModelsModule,
    EdgeDevicesModule
  ]
})
export class AppModule { }