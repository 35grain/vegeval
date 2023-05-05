import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { GrpcStrategy } from '../strategies/grpc.strategy';

@Injectable()
export class GrpcGuard implements CanActivate {
  constructor(private readonly grpcStrategy: GrpcStrategy) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const metadata = context.getArgByIndex(1) as Metadata;
    const ip = context.getArgByIndex(2).getPeer().split(':')[0];
    const apiKey = metadata.get('x-api-key')[0];
    const apiSecret = metadata.get('x-api-secret')[0];

    if (!apiKey || !apiSecret) {
      return false;
    }

    const device = await this.grpcStrategy.validate(apiKey.toString(), apiSecret.toString(), ip);
    if (!device) {
      return false
    }

    const data = context.switchToRpc().getData();
    data.device = device;

    return true;
  }
}
