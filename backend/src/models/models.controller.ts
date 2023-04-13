import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from '@prisma/client';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RegisterModelDto } from 'src/dto/register-model.dto';

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

    @Roles(Role.Admin)
    @Post('register')
    async registerDevice(@Body() model: RegisterModelDto): Promise<Model> {
        return this.modelsService.registerModel(model);
    }
}
