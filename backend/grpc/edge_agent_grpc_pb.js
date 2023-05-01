// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var edge_agent_pb = require('./edge_agent_pb.js');

function serialize_edge_agent_ConfigRequest(arg) {
  if (!(arg instanceof edge_agent_pb.ConfigRequest)) {
    throw new Error('Expected argument of type edge_agent.ConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_ConfigRequest(buffer_arg) {
  return edge_agent_pb.ConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_ConfigResponse(arg) {
  if (!(arg instanceof edge_agent_pb.ConfigResponse)) {
    throw new Error('Expected argument of type edge_agent.ConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_ConfigResponse(buffer_arg) {
  return edge_agent_pb.ConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_HeartbeatRequest(arg) {
  if (!(arg instanceof edge_agent_pb.HeartbeatRequest)) {
    throw new Error('Expected argument of type edge_agent.HeartbeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_HeartbeatRequest(buffer_arg) {
  return edge_agent_pb.HeartbeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_HeartbeatResponse(arg) {
  if (!(arg instanceof edge_agent_pb.HeartbeatResponse)) {
    throw new Error('Expected argument of type edge_agent.HeartbeatResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_HeartbeatResponse(buffer_arg) {
  return edge_agent_pb.HeartbeatResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StartDetectionRequest(arg) {
  if (!(arg instanceof edge_agent_pb.StartDetectionRequest)) {
    throw new Error('Expected argument of type edge_agent.StartDetectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StartDetectionRequest(buffer_arg) {
  return edge_agent_pb.StartDetectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StartDetectionResponse(arg) {
  if (!(arg instanceof edge_agent_pb.StartDetectionResponse)) {
    throw new Error('Expected argument of type edge_agent.StartDetectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StartDetectionResponse(buffer_arg) {
  return edge_agent_pb.StartDetectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StatisticsReportRequest(arg) {
  if (!(arg instanceof edge_agent_pb.StatisticsReportRequest)) {
    throw new Error('Expected argument of type edge_agent.StatisticsReportRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StatisticsReportRequest(buffer_arg) {
  return edge_agent_pb.StatisticsReportRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StatisticsReportResponse(arg) {
  if (!(arg instanceof edge_agent_pb.StatisticsReportResponse)) {
    throw new Error('Expected argument of type edge_agent.StatisticsReportResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StatisticsReportResponse(buffer_arg) {
  return edge_agent_pb.StatisticsReportResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StopDetectionRequest(arg) {
  if (!(arg instanceof edge_agent_pb.StopDetectionRequest)) {
    throw new Error('Expected argument of type edge_agent.StopDetectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StopDetectionRequest(buffer_arg) {
  return edge_agent_pb.StopDetectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edge_agent_StopDetectionResponse(arg) {
  if (!(arg instanceof edge_agent_pb.StopDetectionResponse)) {
    throw new Error('Expected argument of type edge_agent.StopDetectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edge_agent_StopDetectionResponse(buffer_arg) {
  return edge_agent_pb.StopDetectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EdgeAgentServiceService = exports.EdgeAgentServiceService = {
  // Starts the object detection process on the edge device.
startDetection: {
    path: '/edge_agent.EdgeAgentService/StartDetection',
    requestStream: false,
    responseStream: false,
    requestType: edge_agent_pb.StartDetectionRequest,
    responseType: edge_agent_pb.StartDetectionResponse,
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
    requestType: edge_agent_pb.StopDetectionRequest,
    responseType: edge_agent_pb.StopDetectionResponse,
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
    requestType: edge_agent_pb.ConfigRequest,
    responseType: edge_agent_pb.ConfigResponse,
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
    requestType: edge_agent_pb.StatisticsReportRequest,
    responseType: edge_agent_pb.StatisticsReportResponse,
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
    requestType: edge_agent_pb.HeartbeatRequest,
    responseType: edge_agent_pb.HeartbeatResponse,
    requestSerialize: serialize_edge_agent_HeartbeatRequest,
    requestDeserialize: deserialize_edge_agent_HeartbeatRequest,
    responseSerialize: serialize_edge_agent_HeartbeatResponse,
    responseDeserialize: deserialize_edge_agent_HeartbeatResponse,
  },
};

exports.EdgeAgentServiceClient = grpc.makeGenericClientConstructor(EdgeAgentServiceService);
