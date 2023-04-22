import { Module } from '@nestjs/common';
import { ModelsService } from 'src/models/models.service';
import { EdgeDevicesService } from './edge-devices.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [
        EdgeDevicesService,
        PrismaService,
        ModelsService
    ],
})
export class EdgeDevicesModule {}
