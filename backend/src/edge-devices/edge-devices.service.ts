import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RegisterDeviceDto } from 'src/dto/register-device.dto';
import * as crypto from 'crypto';
import * as bcryt from 'bcrypt';
import * as passwordGenerator from 'generate-password';
import { MinioService } from 'src/minio.service';
import { ConfigResponse } from "grpc/edge_agent_pb";

export type EdgeDeviceWithModel = Prisma.EdgeDeviceGetPayload<{
    select: {
        label: true,
        ip: true,
        apiKey: true,
        clientId: true,
        lastSeen: true,
        uploadRaw: true,
        model: {
            select: {
                id: true,
                name: true,
                version: true,
                objectName: true
            }
        }
    }
}>

export type EdgeDeviceWithModelUser = Prisma.EdgeDeviceGetPayload<{
    select: {
        id: true,
        label: true,
        ip: true,
        apiKey: true,
        clientId: true,
        lastSeen: true,
        uploadRaw: true,
        model: {
            select: {
                id: true,
                name: true,
                version: true,
                objectName: true
            }
        },
        client: {
            select: {
                email: true
            }
        }
    }
}>

@Injectable()
export class EdgeDevicesService {
    constructor(
        private prisma: PrismaService,
        private minio: MinioService
    ) { }

    async getDevices(): Promise<EdgeDeviceWithModelUser[]> {
        return this.prisma.edgeDevice.findMany({
            select: {
                id: true,
                label: true,
                ip: true,
                apiKey: true,
                clientId: true,
                lastSeen: true,
                uploadRaw: true,
                model: {
                    select: {
                        id: true,
                        name: true,
                        version: true,
                        objectName: true
                    }
                },
                client: {
                    select: {
                        email: true
                    }
                }
            }
        });
    }

    async getClientDevices(clientId: string): Promise<EdgeDeviceWithModel[]> {
        return this.prisma.edgeDevice.findMany({
            where: {
                clientId: clientId
            },
            select: {
                label: true,
                ip: true,
                apiKey: true,
                clientId: true,
                lastSeen: true,
                uploadRaw: true,
                model: {
                    select: {
                        id: true,
                        name: true,
                        version: true,
                        objectName: true
                    }
                }
            }
        });
    }

    async getDevice(deviceId: string): Promise<EdgeDeviceWithModel | null> {
        return this.prisma.edgeDevice.findUnique({
            where: {
                id: deviceId
            },
            select: {
                label: true,
                ip: true,
                apiKey: true,
                clientId: true,
                lastSeen: true,
                uploadRaw: true,
                model: {
                    select: {
                        id: true,
                        name: true,
                        version: true,
                        objectName: true
                    }
                }
            }
        });
    }

    async getDeviceByApiKey(apiKey: string): Promise<EdgeDeviceWithModel | null> {
        return this.prisma.edgeDevice.findUnique({
            where: {
                apiKey: apiKey
            },
            select: {
                label: true,
                ip: true,
                apiKey: true,
                clientId: true,
                lastSeen: true,
                uploadRaw: true,
                model: {
                    select: {
                        id: true,
                        name: true,
                        version: true,
                        objectName: true
                    }
                }
            }
        });
    }

    async getDeviceConfig(deviceId: string): Promise<ConfigResponse.AsObject | null> {
        const device = await this.getDevice(deviceId);
        if (!device) {
            return null;
        }
        return {
            model: device.model,
            uploadRaw: device.uploadRaw
        };
    }

    // Update the last seen timestamp of a device
    async updateDeviceLastSeen(deviceId: string): Promise<boolean> {
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
    async getStatus(deviceId: string): Promise<any> {
        const device = await this.getDevice(deviceId);
        const lastStatistic = await this.prisma.statistic.findFirst({
            where: {
                edgeDeviceId: deviceId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        let date = new Date();
        date.setSeconds(date.getSeconds() - 10); // last seen more than 10 seconds ago
        if (lastStatistic.createdAt > date) {
            return { status: 'detecting' }
        }
        if (device.lastSeen > date) {
            return { status: 'idle' };
        }
        return { status: 'offline' };
    }

    // Register a new device
    async registerDevice(clientId: string, device: RegisterDeviceDto): Promise<any> {
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
                ip: device.ip,
                uploadRaw: device.uploadRaw
            }
        });

        if (device.uploadRaw) {
            const bucketName = 'vegeval.' + clientId + '.' + item.id;
            return this.minio.minioClient.makeBucket(bucketName, process.env.MINIO_REGION)
                .then(() => {
                    return { id: item.id, bucketName: bucketName, apiKey: token, secretKey: secret }
                })
                .catch(err => {
                    throw new Error('Error creating MinIO bucket: ' + err);
                })
        }

        return { id: item.id, apiKey: token, secretKey: secret }
    }

    // Update an existing device
    async updateDevice(deviceId: string, device: RegisterDeviceDto): Promise<any> {
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

    // Get the number of devices
    async getDevicesCount(): Promise<number> {
        return this.prisma.edgeDevice.count();
    }
}