import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EdgeDevice } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GrpcStrategy {
  constructor(private readonly prismaService: PrismaService) { }
  async validate(apiKey: string, apiSecret: string, ip: string): Promise<EdgeDevice | null> {
    const device = await this.prismaService.edgeDevice.findUnique({ where: { apiKey: apiKey } });
    if (!device || ip !== device.ip.split(':')[0] || !await bcrypt.compare(apiSecret, device.secretKey)) {
      return null;
    }
    return device;
  }
}