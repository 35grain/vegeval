import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcGuard } from 'src/auth/guards/grpc.guard';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';
import { ConfigResponse, HeartbeatResponse, StatisticsReportResponse } from 'grpc/edge_agent_pb';
import { StatisticsService } from 'src/statistics/statistics.service';

@Controller('grpc')
export class GrpcController {
    constructor(
        private readonly edgeDevicesService: EdgeDevicesService,
        private readonly statisticsService: StatisticsService) { }

    @UseGuards(GrpcGuard)
    @GrpcMethod('EdgeAgentService')
    async heartbeat(data: any): Promise<HeartbeatResponse.AsObject> {
        const device = data.device;
        if (await this.edgeDevicesService.updateDeviceLastSeen(device.id)) {
            return { success: true }
        }
        return { success: false }
    }

    @UseGuards(GrpcGuard)
    @GrpcMethod('EdgeAgentService')
    async getConfig(data: any): Promise<ConfigResponse.AsObject> {
        const device = data.device;
        const config = await this.edgeDevicesService.getDeviceConfig(device.id);
        return config;
    }

    @UseGuards(GrpcGuard)
    @GrpcMethod('EdgeAgentService')
    async statisticsReport(data: any): Promise<StatisticsReportResponse.AsObject> {
        const device = data.device;
        if (await this.statisticsService.createStatisticsReport(device.id, data)) {
            return { success: true }
        }
        return { success: false }
    }
}
