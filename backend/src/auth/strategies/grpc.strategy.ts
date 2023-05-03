import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EdgeDevice } from '@prisma/client';
import { EdgeDevicesService } from 'src/edge-devices/edge-devices.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GrpcStrategy {
  constructor(private readonly prismaService: PrismaService) { }
  async validate(apiKey: string, apiSecret: string): Promise<EdgeDevice> {
    const device = await this.prismaService.edgeDevice.findUnique({ where: { apiKey: apiKey } });
    if (!device || !await bcrypt.compare(apiSecret, device.secretKey)) {
      throw new UnauthorizedException();
    }
    return device;
  }
}