import { Injectable } from '@nestjs/common';
import { EdgeDevice } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateDeviceDto } from 'src/dto/create-device.dto';

@Injectable()
export class EdgeDevicesService {
    constructor(private prisma: PrismaService, private readonly authService: AuthService) { }

    async getDevices(clientId: number): Promise<EdgeDevice[]> {
        return this.prisma.edgeDevice.findMany({ where: { clientId: clientId } });
    }

    async getDevice(deviceId: number): Promise<EdgeDevice | null> {
        return this.prisma.edgeDevice.findUnique({ where: { id: deviceId } });
    }

    async createDevice(clientId: any, device: CreateDeviceDto): Promise<EdgeDevice> {
        const token = crypto.randomUUID();
        const hash = await this.authService.hashData(token);
        return this.prisma.edgeDevice.create({
            data: {
                label: device.label,
                apiKey: hash,
                clientId: clientId
            }
        });
    }
}
