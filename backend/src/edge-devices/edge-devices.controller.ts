import { BadRequestException, Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { EdgeDevicesService } from './edge-devices.service';
import { EdgeDevice } from '@prisma/client';
import { CreateDeviceDto } from 'src/dto/create-device.dto';

@Controller('devices')
export class EdgeDevicesController {
    constructor(private readonly edgeDevicesService: EdgeDevicesService) {}
    
    @Get()
    async getDevices(@Request() req, @Param('clientId') clientId: number): Promise<EdgeDevice[]> {
        if (req.user.id === clientId || req.user.role === 'admin') {
            return this.edgeDevicesService.getDevices(clientId);
        }
        throw new BadRequestException('Unauthorized!');
    }

    @Get(':deviceId')
    async getDevice(@Request() req, @Param('deviceId') deviceId: number): Promise<EdgeDevice | null> {
        const device = await this.edgeDevicesService.getDevice(deviceId);
        if (device.clientId === req.user.id || req.user.role === 'admin') {
            return device;
        }
        throw new BadRequestException('Unauthorized!');
    }

    @Post()
    async createDevice(@Request() req, @Body() device: CreateDeviceDto): Promise<EdgeDevice> {
        return this.edgeDevicesService.createDevice(req.used.id, device);
    }
}
