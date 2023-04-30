import { Inject, Injectable } from '@nestjs/common';
import grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

@Injectable()
export class GrpcService {


    async startDetection(): Promise<StartDetectionResponse> {
        return this.grpcService.startDetection();
    }

    async stopDetection(): Promise<StartDetectionResponse> {
        return this.grpcService.stopDetection();
    }
}
