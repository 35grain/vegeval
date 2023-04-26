import { Module } from '@nestjs/common';
import { ModelsService } from 'src/models/models.service';
import { EdgeDevicesService } from './edge-devices.service';
import { PrismaService } from 'src/prisma.service';
import { MinioService } from 'src/minio.service';

@Module({
    providers: [
        EdgeDevicesService,
        PrismaService,
        ModelsService,
        MinioService
    ],
})
export class EdgeDevicesModule {}
