import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EdgeDevice } from '@prisma/client';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GrpcStrategy {
  constructor(private readonly EdgeDevicesService: EdgeDevicesService) { }
  async validate(apiKey: string, apiSecret: string): Promise<EdgeDevice> {
    const device = await this.EdgeDevicesService.getDeviceByApiKey(apiKey);
    if (!device || !await bcrypt.compare(apiSecret, device.secretKey)) {
      throw new UnauthorizedException();
    }
    return device;
  }
}