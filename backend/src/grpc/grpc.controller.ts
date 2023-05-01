import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcGuard } from 'src/auth/guards/grpc.guard';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';
import { ConfigResponse, HeartbeatResponse } from './edge_agent_pb';

@Controller('grpc')
export class GrpcController {
    constructor(private readonly EdgeDevicesService: EdgeDevicesService) { }

    @UseGuards(GrpcGuard)
    @GrpcMethod('EdgeAgentService')
    async heartbeat(data: any): Promise<HeartbeatResponse> {
        const device = data.device;
        const response = new HeartbeatResponse();
        if (await this.EdgeDevicesService.updateDeviceLastSeen(device.id)) {
            response.setSuccess(true);
            return response;
        }
        response.setSuccess(false);
        return response;
    }

    @UseGuards(GrpcGuard)
    @GrpcMethod('EdgeAgentService')
    async getConfig(data: any): Promise<ConfigResponse> {
        const device = data.device;
        const config = await this.EdgeDevicesService.getDeviceConfig(device.id);
        return config;
    }
}
