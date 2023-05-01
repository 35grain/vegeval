import { Injectable } from '@nestjs/common';
import grpc from '@grpc/grpc-js';
import { EdgeAgentServiceClient } from './edge_agent_grpc_pb';
import { StartDetectionRequest, StopDetectionRequest, StopDetectionResponse } from './edge_agent_pb';
import { StartDetectionResponse } from './types/edge_agent';

@Injectable()
export class GrpcService {
    private client: any;

    constructor(host: string) {
        this.client = new EdgeAgentServiceClient(host, grpc.credentials.createInsecure());
    }

    async startDetection(): Promise<StartDetectionResponse> {
        const request = new StartDetectionRequest();
        return this.client.startDetection(request, (err: any, response: StartDetectionResponse) => {
            if (err) {
                throw new Error(err);
            } else {
                return response;
            }
        });
    }

    async stopDetection(): Promise<StopDetectionResponse> {
        const request = new StopDetectionRequest();
        return this.client.stopDetection(request, (err: any, response: StopDetectionResponse) => {
            if (err) {
                throw new Error(err);
            } else {
                return response;
            }
        });
    }
}
