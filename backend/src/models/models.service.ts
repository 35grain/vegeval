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

    async getModel(modelId: string): Promise<Model | null> {
        return this.prisma.model.findUnique({ where: { id: modelId } });
    }

    async registerModel(model: RegisterModelDto, file: Express.Multer.File): Promise<Model> {
        const objectName = new UrlSafeString().generate(model.name) + '.zip';
        return this.minio.minioClient.putObject('vegeval.models', objectName, file.buffer, file.size)
            .then((res) => {
                return this.prisma.model.create({
                    data: {
                        objectName: objectName,
                        ...model
                    }
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
}
