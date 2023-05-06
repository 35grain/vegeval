import { Injectable } from '@nestjs/common';
import { Model } from '@prisma/client';
import { RegisterModelDto } from 'src/dto/register-model.dto';
import { MinioService } from 'src/minio.service';
import { PrismaService } from 'src/prisma.service';
import * as UrlSafeString from 'url-safe-string';

export type ModelsUsage = {
    id: string;
    name: string;
    _count: {
        EdgeDevices: number;
    }
}


export type StatisticsCount = {
    id: string;
    name: string;
    _count: {
        Statistics: number;
    }
}

@Injectable()
export class ModelsService {
    constructor(
        private prisma: PrismaService,
        private minio: MinioService
    ) { }

    async getModels(): Promise<Model[]> {
        return this.prisma.model.findMany();
    }

    async getModelsUsage(): Promise<ModelsUsage[]> {
        return this.prisma.model.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        EdgeDevices: true
                    }
                }
            }
        });
    }

    async getStatisticsCount(): Promise<StatisticsCount[]> {
        return this.prisma.model.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        Statistics: true
                    }
                }
            }
        });
    }

    async getModel(modelId: string): Promise<Model | null> {
        return this.prisma.model.findUnique({ where: { id: modelId } });
    }

    async registerModel(model: RegisterModelDto, file: Express.Multer.File): Promise<Model> {
        const objectName = new UrlSafeString().generate(model.name) + '.zip';
        return this.minio.minioClient.putObject('vegeval.models', objectName, file.buffer, file.size)
            .then(() => {
                return this.prisma.model.create({
                    data: {
                        objectName: objectName,
                        ...model
                    }
                });
            })
            .catch((err) => {
                throw new Error("Error uploading model to MinIO:" + err);
            });
    }
}
