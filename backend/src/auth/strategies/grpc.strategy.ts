import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EdgeDevice } from '@prisma/client';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';

@Injectable()
export class GrpcStrategy {
  constructor(private readonly EdgeDevicesService: EdgeDevicesService) {}
  validate(apiKey: string): Promise<EdgeDevice> | EdgeDevice {
    const device = this.EdgeDevicesService.getDeviceByApiKey(apiKey);
    if (!device) {
      throw new UnauthorizedException();
    }
    return device;
  }
}