import { Controller, Get, Param } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from '@prisma/client';

@Controller('models')
export class ModelsController {
    constructor(private readonly modelsService: ModelsService) {}
    
    @Get()
    async getModels(): Promise<Model[]> {
        return this.modelsService.getModels();
    }

    @Get(':modelId')
    async getModel(@Param('modelId') modelId: number): Promise<Model | null> {
        return this.modelsService.getModel(modelId);
    }
}
