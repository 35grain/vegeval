import { Injectable } from '@nestjs/common';
import { credentials } from '@grpc/grpc-js';
import { EdgeAgentServiceClient } from 'grpc/edge_agent_grpc_pb';
import { StartDetectionRequest, StartDetectionResponse, StopDetectionRequest, StopDetectionResponse } from 'grpc/edge_agent_pb';

@Injectable()
export class GrpcService {
    private client: any;

    constructor(host: string) {
        this.client = new EdgeAgentServiceClient(host + ':20048', credentials.createInsecure());
    }

    async startDetection(): Promise<boolean> {
        const request = new StartDetectionRequest();
        this.client.startDetection(request, (err: any) => {
            if (err) {
                throw new Error(err);
            }
        });
        return true;
    }

    async stopDetection(): Promise<boolean> {
        const request = new StopDetectionRequest();
        this.client.stopDetection(request, (err: any) => {
            if (err) {
                throw new Error(err);
            }
        });
        return true;
    }
}
