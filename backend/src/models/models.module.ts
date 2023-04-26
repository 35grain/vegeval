import { Module } from '@nestjs/common';
import { MinioService } from 'src/minio.service';
import { PrismaService } from 'src/prisma.service';
import { ModelsService } from './models.service';

@Module({})
export class ModelsModule {
    providers: [
        ModelsService,
        PrismaService,
        MinioService
    ]
}
