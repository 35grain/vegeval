import { Controller, Request, Get, Param, BadRequestException } from '@nestjs/common';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService,
        private readonly edgeDevicesService: EdgeDevicesService) { }

    @Get()
    async getStatistics(@Request() req) {
        if (req.user.role === 'admin') {
            return this.statisticsService.getAllStatistics();
        }
        return this.statisticsService.getStatisticsByUser(req.user.id);
    }

    @Get('device/:id')
    async getStatisticsByDevice(@Request() req, @Param('id') deviceId: string ) {
        const device = await this.edgeDevicesService.getDevice(deviceId);
        if (!device) {
            throw new BadRequestException('Device with provided ID does not exist!');
        }
        if (req.user.role === 'admin' || device.clientId === req.user.id) {
            return this.statisticsService.getStatisticsByDevice(deviceId);
        }
    }

    @Get('model/:id')
    async getStatisticsByModel(@Request() req, @Param('id') modelId: string ) {
        if (req.user.role === 'admin') {
            return this.statisticsService.getAllStatisticsByModel(modelId);
        }
        return this.statisticsService.getStatisticsByModel(req.user.id, modelId);
    }

    @Get('count')
    async getStatisticsCount(@Request() req) {
        if (req.user.role === 'admin') {
            return this.statisticsService.getAllStatisticsCount();
        }
        return this.statisticsService.getStatisticsCountByUser(req.user.id);
    }

    @Get('count/model')
    async getStatisticsCountByModels(@Request() req) {
        if (req.user.role === 'admin') {
            return this.statisticsService.getAllStatisticsCountByModels();
        }
        return this.statisticsService.getStatisticsCountByModels(req.user.id);
    }
}
