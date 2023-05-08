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
        id: true,
        label: true,
        ip: true,
        apiKey: true,
        clientId: true,
        lastSeen: true,
        lastStatus: true,
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
        lastStatus: true,
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
                lastStatus: true,
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
                id: true,
                label: true,
                ip: true,
                apiKey: true,
                clientId: true,
                lastSeen: true,
                lastStatus: true,
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
                id: true,
                label: true,
                ip: true,
                apiKey: true,
                clientId: true,
                lastSeen: true,
                lastStatus: true,
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
                id: true,
                label: true,
                ip: true,
                apiKey: true,
                clientId: true,
                lastSeen: true,
                lastStatus: true,
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
        await this.updateDeviceLastSeen(deviceId, 'idle');
        return {
            model: device.model,
            uploadRaw: device.uploadRaw,
            bucketName: 'vegeval.' + device.clientId + '.' + device.id,
        };
    }

    // Update the last seen timestamp of a device
    async updateDeviceLastSeen(deviceId: string, status: 'idle' | 'detecting'): Promise<boolean> {
        if (await this.prisma.edgeDevice.update({
            where: { id: deviceId },
            data: {
                lastSeen: new Date(),
                lastStatus: status
            }
        })) {
            return true;
        }
        return false;
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
                ip: device.ip + ':' + device.port,
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