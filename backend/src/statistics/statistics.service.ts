import { Injectable } from '@nestjs/common';
import { Statistic } from '@prisma/client';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';
import { ModelsService } from 'src/models/models.service';
import { PrismaService } from 'src/prisma.service';

interface Stat {
    id: number;
    cls_id: number;
    cls_name: string;
    confs: number[];
    frames: number;
    timestamp: number;
}

@Injectable()
export class StatisticsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly modelsService: ModelsService,
        private readonly edgeDevicesService: EdgeDevicesService
    ) { }

    async createStatisticsReport(deviceId: string, statistics: Stat[], model: string): Promise<boolean> {
        try {
            statistics.forEach(async (stat) => {
                await this.prismaService.statistic.create({
                    data: {
                        localId: stat.id,
                        clsId: stat.cls_id,
                        clsName: stat.cls_name,
                        confs: stat.confs,
                        frames: stat.frames,
                        timestamp: stat.timestamp,
                        edgeDeviceId: deviceId,
                        modelId: model,
                    }
                })
            });
        }
        catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    async getAllStatistics(): Promise<Statistic[]> {
        return this.prismaService.statistic.findMany();
    }

    async getStatisticsByUser(userId: string): Promise<Statistic[]> {
        return this.prismaService.statistic.findMany({
            where: {
                EdgeDevice: {
                    clientId: userId
                },
                timestamp: {
                    // Get statistics from the last 6 hours
                    gte: (Date.now() - 6 * 60 * 60 * 1000) / 1000
                }
            }
        });
    }

    async getNumberOfFramesInDetection(userId: string): Promise<any> {
        return this.prismaService.statistic.groupBy({
            by: ['frames'],
            _count: {
                frames: true
            },
            where: {
                EdgeDevice: {
                    clientId: userId
                }
            }
        });
    }

    async getStatisticsByDevice(deviceId: string): Promise<Statistic[]> {
        return this.prismaService.statistic.findMany({
            where: {
                edgeDeviceId: deviceId
            }
        });
    }

    async getAllStatisticsByModel(modelId: string): Promise<Statistic[]> {
        return this.prismaService.statistic.findMany({
            where: {
                modelId: modelId
            }
        });
    }

    async getStatisticsByModel(userId: string, modelId: string): Promise<Statistic[]> {
        return this.prismaService.statistic.findMany({
            where: {
                modelId: modelId,
                EdgeDevice: {
                    clientId: userId
                }
            }
        });
    }

    async getAllStatisticsCount(): Promise<number> {
        return this.prismaService.statistic.count();
    }

    async getStatisticsCountByUser(userId: string): Promise<number> {
        return this.prismaService.statistic.count({
            where: {
                EdgeDevice: {
                    clientId: userId
                }
            }
        });
    }

    async getStatisticsCountByModels(userId: string): Promise<any> {
        return this.prismaService.statistic.groupBy({
            by: ['modelId'],
            _count: {
                modelId: true
            },
            where: {
                EdgeDevice: {
                    clientId: userId
                }
            }
        })
    }

    async getClassDistributionByModel(userId: string): Promise<any> {
        const models = await this.modelsService.getModels();
        const stats = [];
        for (const model of models) {
            const modelStats = await this.prismaService.statistic.groupBy({
                by: ['clsName'],
                _count: {
                    clsName: true
                },
                where: {
                    modelId: model.id,
                    EdgeDevice: {
                        clientId: userId
                    }
                }
            });
            if (modelStats.length > 0) {
                stats.push({
                    modelName: model.name,
                    stats: modelStats
                });
            }
        }
        return stats;
    }

    async getStatisticsCountByDevice(userId: string): Promise<any> {
        const devices = await this.edgeDevicesService.getClientDevices(userId);
        const deviceStats: any = await this.prismaService.statistic.groupBy({
            by: ['edgeDeviceId'],
            _count: {
                edgeDeviceId: true
            },
            where: {
                EdgeDevice: {
                    clientId: userId
                }
            }
        })
        const stats = [];
        deviceStats.forEach(stat => {
            const device = devices.find(device => device.id === stat.edgeDeviceId);
            stats.push({
                deviceLabel: device.label,
                count: stat._count.edgeDeviceId
            })
        });
        return stats;
    }
}
