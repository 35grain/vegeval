import { Injectable } from '@nestjs/common';
import { credentials } from '@grpc/grpc-js';
import { EdgeAgentServiceClient } from 'grpc/edge_agent_grpc_pb';
import { StartDetectionRequest, StartDetectionResponse, StopDetectionRequest, StopDetectionResponse } from 'grpc/edge_agent_pb';

@Injectable()
export class GrpcService {
    private client: any;

    constructor(host: string) {
        this.client = new EdgeAgentServiceClient(host, credentials.createInsecure());
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
