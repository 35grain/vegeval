import { Injectable } from '@nestjs/common';
import { Model } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ModelsService {
    constructor(private prisma: PrismaService) { }

    async getModels(): Promise<Model[]> {
        return this.prisma.model.findMany();
    }

    async getModel(modelId: number): Promise<Model | null> {
        return this.prisma.model.findUnique({ where: { id: modelId } });
    }
}
