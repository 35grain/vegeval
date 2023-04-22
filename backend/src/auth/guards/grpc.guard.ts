import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { GrpcStrategy } from '../strategies/grpc.strategy';

@Injectable()
export class GrpcGuard implements CanActivate {
  constructor(private readonly grpcStrategy: GrpcStrategy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const metadata = context.getArgByIndex(1) as Metadata;
    const apiKey = metadata.get('x-api-key')[0];

    if (!apiKey) {
      return false;
    }

    const device = this.grpcStrategy.validate(apiKey.toString());
    if (!device) {
      return false
    }

    const data = context.switchToRpc().getData();
    data.device = device;

    return true;
  }
}
