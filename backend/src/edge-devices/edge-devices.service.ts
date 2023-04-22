import { Injectable } from '@nestjs/common';
import { EdgeDevice, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RegisterDeviceDto } from 'src/dto/register-device.dto';
import * as crypto from 'crypto';
import * as bcryt from 'bcrypt';
import * as passwordGenerator from 'generate-password';
import { ModelsService } from 'src/models/models.service';
import { ConfigResponse } from 'src/grpc/types/configuration';

export type EdgeDeviceWithModel = Prisma.EdgeDeviceGetPayload<{
    include: { model: true }
}>

@Injectable()
export class EdgeDevicesService {
    constructor(private prisma: PrismaService, private readonly modelsService: ModelsService) { }

    async getDevices(): Promise<EdgeDeviceWithModel[]> {
        return this.prisma.edgeDevice.findMany({ include: { model: true } });
    }

    async getClientDevices(clientId: number): Promise<EdgeDeviceWithModel[]> {
        return this.prisma.edgeDevice.findMany({ where: { clientId: clientId }, include: { model: true } });
    }

    async getDevice(deviceId: number): Promise<EdgeDeviceWithModel | null> {
        return this.prisma.edgeDevice.findUnique({ where: { id: deviceId }, include: { model: true } });
    }

    async getDeviceByApiKey(apiKey: string): Promise<EdgeDeviceWithModel | null> {
        return this.prisma.edgeDevice.findUnique({ where: { apiKey: apiKey }, include: { model: true } });
    }

    async getDeviceConfig(deviceId: number): Promise<ConfigResponse> {
        const device = await this.getDevice(deviceId);
        return {
            model: device.model
        }
    }

    // Update the last seen timestamp of a device
    async updateDeviceLastSeen(deviceId: number): Promise<boolean> {
        if (await this.prisma.edgeDevice.update({
            where: { id: deviceId },
            data: {
                lastSeen: new Date()
            }
        })) {
            return true;
        }
        return false;
    }

    // Get the current status of a device
    async getStatus(deviceId: number): Promise<any> {
        const device = await this.getDevice(deviceId);
        let date = new Date();
        date.setSeconds(date.getSeconds() - 10); // last heartbeat was more than 10 seconds ago
        if (device.lastSeen < date) {
            return { status: 'offline' };
        }
        return { status: 'online' };
    }

    // Register a new device
    async registerDevice(clientId: any, device: RegisterDeviceDto): Promise<any> {
        const token = crypto.randomUUID();
        const salt = await bcryt.genSalt();
        const secret = passwordGenerator.generate({ length: 32, numbers: true, symbols: true, lowercase: true, uppercase: true, strict: true });
        const hash = await bcryt.hash(secret, salt);

        const item = await this.prisma.edgeDevice.create({
            data: {
                label: device.label,
                apiKey: token,
                secretKey: hash,
                clientId: clientId,
                modelId: device.model,
                ip: device.ip
            }
        });
        return { id: item.id, apiKey: token, secretKey: secret }
    }

    // Update an existing device
    async updateDevice(deviceId: number, device: RegisterDeviceDto): Promise<any> {
        return this.prisma.edgeDevice.update({
            where: { id: deviceId },
            data: {
                label: device.label,
                modelId: device.model,
                ip: device.ip
            },
            select: {
                id: true,
                label: true,
                modelId: true,
                ip: true
            }
        });
    }
}