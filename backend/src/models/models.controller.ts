import { BadRequestException, Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from '@prisma/client';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RegisterModelDto } from 'src/dto/register-model.dto';
import { PrismaService } from 'src/prisma.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('models')
export class ModelsController {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly modelsService: ModelsService) { }

    @Get()
    async getModels(): Promise<Model[]> {
        return this.modelsService.getModels();
    }

    @Get(':modelId')
    async getModel(@Param('modelId') modelId: string): Promise<Model | null> {
        return this.modelsService.getModel(modelId);
    }

    @Roles(Role.Admin)
    @Post('register')
    @UseInterceptors(FileInterceptor('file'))
    async registerModel(@Body() model: RegisterModelDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 20000000 }),
                new FileTypeValidator({ fileType: 'zip' })
            ]
        })
    ) file: Express.Multer.File): Promise<Model> {
        if (!file) {
            throw new BadRequestException('No file provided!');
        }
        const exists = await this.prismaService.model.findUnique({ where: { name: model.name } });
        if (exists) {
            throw new BadRequestException('Model with provided name already exists!');
        }
        return this.modelsService.registerModel(model, file);
    }
}
