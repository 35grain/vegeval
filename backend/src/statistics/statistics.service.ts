import { Injectable } from '@nestjs/common';
import { Statistic } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticsService {
    constructor(private readonly prismaService: PrismaService) { }

    async createStatisticsReport(deviceId: string, statistics: any): Promise<boolean> {
        try {
            statistics.data.forEach(async (stat) => {
                await this.prismaService.statistic.create({
                    data: {
                        localId: stat.id,
                        clsId: stat.clsId,
                        clsName: stat.clsName,
                        confs: stat.confs,
                        frames: stat.frames,
                        timestamp: stat.timestamp,
                        edgeDeviceId: deviceId,
                        modelId: statistics.model,
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

    async getAllStatisticsCountByModels(): Promise<any> {
        return this.prismaService.statistic.groupBy({
            by: ['modelId'],
            _count: {
                modelId: true
            }
        })
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
}
