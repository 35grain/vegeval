import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Request, UnauthorizedException } from '@nestjs/common';
import { EdgeDevicesService } from './edge-devices.service';
import { EdgeDevice } from '@prisma/client';
import { RegisterDeviceDto } from 'src/dto/register-device.dto';
import { ModelsService } from 'src/models/models.service';

@Controller('devices')
export class EdgeDevicesController {
    constructor(
        private readonly edgeDevicesService: EdgeDevicesService,
        private readonly modelsService: ModelsService
    ) { }

    @Get(':clientId')
    async getDevices(@Request() req, @Param('clientId', ParseIntPipe) clientId: number): Promise<EdgeDevice[]> {
        if (req.user.id === clientId || req.user.role === 'admin') {
            return this.edgeDevicesService.getDevices(clientId);
        }
        throw new UnauthorizedException('Unauthorized!');
    }

    @Get(':deviceId')
    async getDevice(@Request() req, @Param('deviceId', ParseIntPipe) deviceId: number): Promise<EdgeDevice | null> {
        const device = await this.edgeDevicesService.getDevice(deviceId);
        if (!device) {
            throw new BadRequestException('Device with provided ID does not exist!');
        }
        if (device.clientId === req.user.id || req.user.role === 'admin') {
            return device;
        }
        throw new UnauthorizedException('Unauthorized!');
    }

    @Post('register')
    async registerDevice(@Request() req, @Body() device: RegisterDeviceDto): Promise<EdgeDevice> {
        if (!await this.modelsService.getModel(device.model)) {
            throw new BadRequestException('Model with provided ID does not exist!');
        }
        return this.edgeDevicesService.registerDevice(req.user.id, device);
    }

    @Post('update/:deviceId')
    async updateDevice(@Request() req, @Param('deviceId', ParseIntPipe) deviceId: number, @Body() deviceDto: RegisterDeviceDto): Promise<EdgeDevice> {
        const device = await this.edgeDevicesService.getDevice(deviceId);
        if (!device) {
            throw new BadRequestException('Device with provided ID does not exist!');
        }
        if (device.clientId !== req.user.id && req.user.role !== 'admin') {
            throw new UnauthorizedException('Unauthorized!');
        }
        if (!await this.modelsService.getModel(deviceDto.model)) {
            throw new BadRequestException('Model with provided ID does not exist!');
        }
        return this.edgeDevicesService.updateDevice(deviceId, deviceDto);
    }
}
