// GENERATED CODE -- DO NOT EDIT!

'use strict';
import { makeGenericClientConstructor } from '@grpc/grpc-js';
import { ConfigRequest, ConfigResponse, HeartbeatRequest, HeartbeatResponse, StartDetectionRequest, StartDetectionResponse, StatisticsReportRequest, StatisticsReportResponse, StopDetectionRequest, StopDetectionResponse } from './edge_agent_pb.js';

function serialize_edge_agent_ConfigRequest(arg) {
  if (!(arg instanceof ConfigRequest)) {
    throw new Error('Expected argument of type edge_agent.ConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_ConfigRequest(buffer_arg) {
  return ConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_ConfigResponse(arg) {
  if (!(arg instanceof ConfigResponse)) {
    throw new Error('Expected argument of type edge_agent.ConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_ConfigResponse(buffer_arg) {
  return ConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_HeartbeatRequest(arg) {
  if (!(arg instanceof HeartbeatRequest)) {
    throw new Error('Expected argument of type edge_agent.HeartbeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_HeartbeatRequest(buffer_arg) {
  return HeartbeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_HeartbeatResponse(arg) {
  if (!(arg instanceof HeartbeatResponse)) {
    throw new Error('Expected argument of type edge_agent.HeartbeatResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_HeartbeatResponse(buffer_arg) {
  return HeartbeatResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StartDetectionRequest(arg) {
  if (!(arg instanceof StartDetectionRequest)) {
    throw new Error('Expected argument of type edge_agent.StartDetectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StartDetectionRequest(buffer_arg) {
  return StartDetectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StartDetectionResponse(arg) {
  if (!(arg instanceof StartDetectionResponse)) {
    throw new Error('Expected argument of type edge_agent.StartDetectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StartDetectionResponse(buffer_arg) {
  return StartDetectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StatisticsReportRequest(arg) {
  if (!(arg instanceof StatisticsReportRequest)) {
    throw new Error('Expected argument of type edge_agent.StatisticsReportRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StatisticsReportRequest(buffer_arg) {
  return StatisticsReportRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StatisticsReportResponse(arg) {
  if (!(arg instanceof StatisticsReportResponse)) {
    throw new Error('Expected argument of type edge_agent.StatisticsReportResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StatisticsReportResponse(buffer_arg) {
  return StatisticsReportResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StopDetectionRequest(arg) {
  if (!(arg instanceof StopDetectionRequest)) {
    throw new Error('Expected argument of type edge_agent.StopDetectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StopDetectionRequest(buffer_arg) {
  return StopDetectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StopDetectionResponse(arg) {
  if (!(arg instanceof StopDetectionResponse)) {
    throw new Error('Expected argument of type edge_agent.StopDetectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StopDetectionResponse(buffer_arg) {
  return StopDetectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EdgeAgentServiceService = exports.EdgeAgentServiceService = {
  // Starts the object detection process on the edge device.
startDetection: {
    path: '/edge_agent.EdgeAgentService/StartDetection',
    requestStream: false,
    responseStream: false,
    requestType: StartDetectionRequest,
    responseType: StartDetectionResponse,
    requestSerialize: serialize_edge_agent_StartDetectionRequest,
    requestDeserialize: deserialize_edge_agent_StartDetectionRequest,
    responseSerialize: serialize_edge_agent_StartDetectionResponse,
    responseDeserialize: deserialize_edge_agent_StartDetectionResponse,
  },
  // Stops the object detection process on the edge device.
stopDetection: {
    path: '/edge_agent.EdgeAgentService/StopDetection',
    requestStream: false,
    responseStream: false,
    requestType: StopDetectionRequest,
    responseType: StopDetectionResponse,
    requestSerialize: serialize_edge_agent_StopDetectionRequest,
    requestDeserialize: deserialize_edge_agent_StopDetectionRequest,
    responseSerialize: serialize_edge_agent_StopDetectionResponse,
    responseDeserialize: deserialize_edge_agent_StopDetectionResponse,
  },
  // Requests the saved configuration of the edge device from web app.
getConfig: {
    path: '/edge_agent.EdgeAgentService/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: ConfigRequest,
    responseType: ConfigResponse,
    requestSerialize: serialize_edge_agent_ConfigRequest,
    requestDeserialize: deserialize_edge_agent_ConfigRequest,
    responseSerialize: serialize_edge_agent_ConfigResponse,
    responseDeserialize: deserialize_edge_agent_ConfigResponse,
  },
  // Sends periodical statistics reports to the web application.
statisticsReport: {
    path: '/edge_agent.EdgeAgentService/StatisticsReport',
    requestStream: true,
    responseStream: false,
    requestType: StatisticsReportRequest,
    responseType: StatisticsReportResponse,
    requestSerialize: serialize_edge_agent_StatisticsReportRequest,
    requestDeserialize: deserialize_edge_agent_StatisticsReportRequest,
    responseSerialize: serialize_edge_agent_StatisticsReportResponse,
    responseDeserialize: deserialize_edge_agent_StatisticsReportResponse,
  },
  // Sends a heartbeat message to the web application.
heartbeat: {
    path: '/edge_agent.EdgeAgentService/Heartbeat',
    requestStream: false,
    responseStream: false,
    requestType: HeartbeatRequest,
    responseType: HeartbeatResponse,
    requestSerialize: serialize_edge_agent_HeartbeatRequest,
    requestDeserialize: deserialize_edge_agent_HeartbeatRequest,
    responseSerialize: serialize_edge_agent_HeartbeatResponse,
    responseDeserialize: deserialize_edge_agent_HeartbeatResponse,
  },
};

export const EdgeAgentServiceClient = makeGenericClientConstructor(EdgeAgentServiceService);
