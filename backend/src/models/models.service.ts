import { Injectable } from '@nestjs/common';
import { Model } from '@prisma/client';
import { RegisterModelDto } from 'src/dto/register-model.dto';
import { MinioService } from 'src/minio.service';
import { PrismaService } from 'src/prisma.service';
import * as UrlSafeString from 'url-safe-string';

@Injectable()
export class ModelsService {
    constructor(
        private prisma: PrismaService,
        private minio: MinioService
        ) { }

    async getModels(): Promise<Model[]> {
        return this.prisma.model.findMany();
    }

    async getModel(modelId: number): Promise<Model | null> {
        return this.prisma.model.findUnique({ where: { id: modelId } });
    }

    async registerModel(model: RegisterModelDto): Promise<Model> {
        const objectName = UrlSafeString.encode(model.name);
        this.minio.minioClient.putObject('vegeval.models', model.name, objectName, function(err, objectInfo) {
            if (err) {
                throw new Error(err.message);
            }
        })
        return this.prisma.model.create({ data: model });
    }
}
