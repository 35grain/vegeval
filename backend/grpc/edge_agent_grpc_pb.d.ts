// package: edge_agent
// file: edge_agent.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as edge_agent_pb from "./edge_agent_pb";

interface IEdgeAgentServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    startDetection: IEdgeAgentServiceService_IStartDetection;
    stopDetection: IEdgeAgentServiceService_IStopDetection;
    restartDevice: IEdgeAgentServiceService_IRestartDevice;
    getConfig: IEdgeAgentServiceService_IGetConfig;
    statisticsReport: IEdgeAgentServiceService_IStatisticsReport;
    heartbeat: IEdgeAgentServiceService_IHeartbeat;
}

interface IEdgeAgentServiceService_IStartDetection extends grpc.MethodDefinition<edge_agent_pb.StartDetectionRequest, edge_agent_pb.StartDetectionResponse> {
    path: "/edge_agent.EdgeAgentService/StartDetection";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<edge_agent_pb.StartDetectionRequest>;
    requestDeserialize: grpc.deserialize<edge_agent_pb.StartDetectionRequest>;
    responseSerialize: grpc.serialize<edge_agent_pb.StartDetectionResponse>;
    responseDeserialize: grpc.deserialize<edge_agent_pb.StartDetectionResponse>;
}
interface IEdgeAgentServiceService_IStopDetection extends grpc.MethodDefinition<edge_agent_pb.StopDetectionRequest, edge_agent_pb.StopDetectionResponse> {
    path: "/edge_agent.EdgeAgentService/StopDetection";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<edge_agent_pb.StopDetectionRequest>;
    requestDeserialize: grpc.deserialize<edge_agent_pb.StopDetectionRequest>;
    responseSerialize: grpc.serialize<edge_agent_pb.StopDetectionResponse>;
    responseDeserialize: grpc.deserialize<edge_agent_pb.StopDetectionResponse>;
}
interface IEdgeAgentServiceService_IRestartDevice extends grpc.MethodDefinition<edge_agent_pb.RestartDeviceRequest, edge_agent_pb.RestartDeviceResponse> {
    path: "/edge_agent.EdgeAgentService/RestartDevice";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<edge_agent_pb.RestartDeviceRequest>;
    requestDeserialize: grpc.deserialize<edge_agent_pb.RestartDeviceRequest>;
    responseSerialize: grpc.serialize<edge_agent_pb.RestartDeviceResponse>;
    responseDeserialize: grpc.deserialize<edge_agent_pb.RestartDeviceResponse>;
}
interface IEdgeAgentServiceService_IGetConfig extends grpc.MethodDefinition<edge_agent_pb.ConfigRequest, edge_agent_pb.ConfigResponse> {
    path: "/edge_agent.EdgeAgentService/GetConfig";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<edge_agent_pb.ConfigRequest>;
    requestDeserialize: grpc.deserialize<edge_agent_pb.ConfigRequest>;
    responseSerialize: grpc.serialize<edge_agent_pb.ConfigResponse>;
    responseDeserialize: grpc.deserialize<edge_agent_pb.ConfigResponse>;
}
interface IEdgeAgentServiceService_IStatisticsReport extends grpc.MethodDefinition<edge_agent_pb.StatisticsReportRequest, edge_agent_pb.StatisticsReportResponse> {
    path: "/edge_agent.EdgeAgentService/StatisticsReport";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<edge_agent_pb.StatisticsReportRequest>;
    requestDeserialize: grpc.deserialize<edge_agent_pb.StatisticsReportRequest>;
    responseSerialize: grpc.serialize<edge_agent_pb.StatisticsReportResponse>;
    responseDeserialize: grpc.deserialize<edge_agent_pb.StatisticsReportResponse>;
}
interface IEdgeAgentServiceService_IHeartbeat extends grpc.MethodDefinition<edge_agent_pb.HeartbeatRequest, edge_agent_pb.HeartbeatResponse> {
    path: "/edge_agent.EdgeAgentService/Heartbeat";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<edge_agent_pb.HeartbeatRequest>;
    requestDeserialize: grpc.deserialize<edge_agent_pb.HeartbeatRequest>;
    responseSerialize: grpc.serialize<edge_agent_pb.HeartbeatResponse>;
    responseDeserialize: grpc.deserialize<edge_agent_pb.HeartbeatResponse>;
}

export const EdgeAgentServiceService: IEdgeAgentServiceService;

export interface IEdgeAgentServiceServer extends grpc.UntypedServiceImplementation {
    startDetection: grpc.handleUnaryCall<edge_agent_pb.StartDetectionRequest, edge_agent_pb.StartDetectionResponse>;
    stopDetection: grpc.handleUnaryCall<edge_agent_pb.StopDetectionRequest, edge_agent_pb.StopDetectionResponse>;
    restartDevice: grpc.handleUnaryCall<edge_agent_pb.RestartDeviceRequest, edge_agent_pb.RestartDeviceResponse>;
    getConfig: grpc.handleUnaryCall<edge_agent_pb.ConfigRequest, edge_agent_pb.ConfigResponse>;
    statisticsReport: grpc.handleUnaryCall<edge_agent_pb.StatisticsReportRequest, edge_agent_pb.StatisticsReportResponse>;
    heartbeat: grpc.handleUnaryCall<edge_agent_pb.HeartbeatRequest, edge_agent_pb.HeartbeatResponse>;
}

export interface IEdgeAgentServiceClient {
    startDetection(request: edge_agent_pb.StartDetectionRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StartDetectionResponse) => void): grpc.ClientUnaryCall;
    startDetection(request: edge_agent_pb.StartDetectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StartDetectionResponse) => void): grpc.ClientUnaryCall;
    startDetection(request: edge_agent_pb.StartDetectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StartDetectionResponse) => void): grpc.ClientUnaryCall;
    stopDetection(request: edge_agent_pb.StopDetectionRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StopDetectionResponse) => void): grpc.ClientUnaryCall;
    stopDetection(request: edge_agent_pb.StopDetectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StopDetectionResponse) => void): grpc.ClientUnaryCall;
    stopDetection(request: edge_agent_pb.StopDetectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StopDetectionResponse) => void): grpc.ClientUnaryCall;
    restartDevice(request: edge_agent_pb.RestartDeviceRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.RestartDeviceResponse) => void): grpc.ClientUnaryCall;
    restartDevice(request: edge_agent_pb.RestartDeviceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.RestartDeviceResponse) => void): grpc.ClientUnaryCall;
    restartDevice(request: edge_agent_pb.RestartDeviceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.RestartDeviceResponse) => void): grpc.ClientUnaryCall;
    getConfig(request: edge_agent_pb.ConfigRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.ConfigResponse) => void): grpc.ClientUnaryCall;
    getConfig(request: edge_agent_pb.ConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.ConfigResponse) => void): grpc.ClientUnaryCall;
    getConfig(request: edge_agent_pb.ConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.ConfigResponse) => void): grpc.ClientUnaryCall;
    statisticsReport(request: edge_agent_pb.StatisticsReportRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StatisticsReportResponse) => void): grpc.ClientUnaryCall;
    statisticsReport(request: edge_agent_pb.StatisticsReportRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StatisticsReportResponse) => void): grpc.ClientUnaryCall;
    statisticsReport(request: edge_agent_pb.StatisticsReportRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StatisticsReportResponse) => void): grpc.ClientUnaryCall;
    heartbeat(request: edge_agent_pb.HeartbeatRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.HeartbeatResponse) => void): grpc.ClientUnaryCall;
    heartbeat(request: edge_agent_pb.HeartbeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.HeartbeatResponse) => void): grpc.ClientUnaryCall;
    heartbeat(request: edge_agent_pb.HeartbeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.HeartbeatResponse) => void): grpc.ClientUnaryCall;
}

export class EdgeAgentServiceClient extends grpc.Client implements IEdgeAgentServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public startDetection(request: edge_agent_pb.StartDetectionRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StartDetectionResponse) => void): grpc.ClientUnaryCall;
    public startDetection(request: edge_agent_pb.StartDetectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StartDetectionResponse) => void): grpc.ClientUnaryCall;
    public startDetection(request: edge_agent_pb.StartDetectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StartDetectionResponse) => void): grpc.ClientUnaryCall;
    public stopDetection(request: edge_agent_pb.StopDetectionRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StopDetectionResponse) => void): grpc.ClientUnaryCall;
    public stopDetection(request: edge_agent_pb.StopDetectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StopDetectionResponse) => void): grpc.ClientUnaryCall;
    public stopDetection(request: edge_agent_pb.StopDetectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StopDetectionResponse) => void): grpc.ClientUnaryCall;
    public restartDevice(request: edge_agent_pb.RestartDeviceRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.RestartDeviceResponse) => void): grpc.ClientUnaryCall;
    public restartDevice(request: edge_agent_pb.RestartDeviceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.RestartDeviceResponse) => void): grpc.ClientUnaryCall;
    public restartDevice(request: edge_agent_pb.RestartDeviceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.RestartDeviceResponse) => void): grpc.ClientUnaryCall;
    public getConfig(request: edge_agent_pb.ConfigRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.ConfigResponse) => void): grpc.ClientUnaryCall;
    public getConfig(request: edge_agent_pb.ConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.ConfigResponse) => void): grpc.ClientUnaryCall;
    public getConfig(request: edge_agent_pb.ConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.ConfigResponse) => void): grpc.ClientUnaryCall;
    public statisticsReport(request: edge_agent_pb.StatisticsReportRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StatisticsReportResponse) => void): grpc.ClientUnaryCall;
    public statisticsReport(request: edge_agent_pb.StatisticsReportRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StatisticsReportResponse) => void): grpc.ClientUnaryCall;
    public statisticsReport(request: edge_agent_pb.StatisticsReportRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.StatisticsReportResponse) => void): grpc.ClientUnaryCall;
    public heartbeat(request: edge_agent_pb.HeartbeatRequest, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.HeartbeatResponse) => void): grpc.ClientUnaryCall;
    public heartbeat(request: edge_agent_pb.HeartbeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.HeartbeatResponse) => void): grpc.ClientUnaryCall;
    public heartbeat(request: edge_agent_pb.HeartbeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: edge_agent_pb.HeartbeatResponse) => void): grpc.ClientUnaryCall;
}
