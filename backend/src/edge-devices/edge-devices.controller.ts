import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Request, UnauthorizedException } from '@nestjs/common';
import { EdgeDeviceWithModel, EdgeDevicesService } from './edge-devices.service';
import { EdgeDevice } from '@prisma/client';
import { RegisterDeviceDto } from 'src/dto/register-device.dto';
import { ModelsService } from 'src/models/models.service';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('devices')
export class EdgeDevicesController {
    constructor(
        private readonly edgeDevicesService: EdgeDevicesService,
        private readonly modelsService: ModelsService
    ) { }

    @Roles(Role.Admin)
    @Get()
    async getDevices(): Promise<EdgeDeviceWithModel[]> {
        return this.edgeDevicesService.getDevices();
    }

    @Get(':clientId')
    async getClientDevices(@Request() req, @Param('clientId', ParseIntPipe) clientId: number): Promise<EdgeDeviceWithModel[]> {
        if (req.user.id === clientId || req.user.role === 'admin') {
            return this.edgeDevicesService.getClientDevices(clientId);
        }
        throw new UnauthorizedException('Unauthorized!');
    }

    @Get(':deviceId')
    async getDevice(@Request() req, @Param('deviceId', ParseIntPipe) deviceId: number): Promise<EdgeDeviceWithModel | null> {
        const device = await this.edgeDevicesService.getDevice(deviceId);
        if (!device) {
            throw new BadRequestException('Device with provided ID does not exist!');
        }
        if (device.clientId === req.user.id || req.user.role === 'admin') {
            return device;
        }
        throw new UnauthorizedException('Unauthorized!');
    }

    @Roles(Role.Admin)
    @Post('register')
    async registerDevice(@Request() req, @Body() device: RegisterDeviceDto): Promise<any> {
        if (!await this.modelsService.getModel(device.model)) {
            throw new BadRequestException('Model with provided ID does not exist!');
        }
        return this.edgeDevicesService.registerDevice(req.user.id, device);
    }

    @Post('update/:deviceId')
    async updateDevice(@Request() req, @Param('deviceId', ParseIntPipe) deviceId: number, @Body() deviceDto: RegisterDeviceDto): Promise<any> {
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
