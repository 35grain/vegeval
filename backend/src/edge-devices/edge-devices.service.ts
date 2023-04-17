import { Injectable } from '@nestjs/common';
import { EdgeDevice } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDeviceDto } from 'src/dto/register-device.dto';
import * as crypto from 'crypto';

@Injectable()
export class EdgeDevicesService {
    constructor(private prisma: PrismaService, private readonly authService: AuthService) { }

    async getDevices(): Promise<EdgeDevice[]> {
        return this.prisma.edgeDevice.findMany();
    }

    async getClientDevices(clientId: number): Promise<EdgeDevice[]> {
        return this.prisma.edgeDevice.findMany({ where: { clientId: clientId } });
    }

    async getDevice(deviceId: number): Promise<EdgeDevice | null> {
        return this.prisma.edgeDevice.findUnique({ where: { id: deviceId } });
    }

    // Register a new device
    async registerDevice(clientId: any, device: RegisterDeviceDto): Promise<EdgeDevice> {
        const token = crypto.randomUUID();
        return this.prisma.edgeDevice.create({
            data: {
                label: device.label,
                apiKey: token,
                clientId: clientId,
                modelId: device.model,
                ip: device.ip
            }
        });
    }

    // Update an existing device
    async updateDevice(deviceId: number, device: RegisterDeviceDto): Promise<EdgeDevice> {
        return this.prisma.edgeDevice.update({
            where: { id: deviceId },
            data: {
                label: device.label,
                modelId: device.model,
                ip: device.ip
            }
        });
    }
}
