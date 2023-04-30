/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "edge_agent";

export interface StartDetectionRequest {
}

export interface StartDetectionResponse {
  /** Acknowledgement of the request to start the detection process. */
  success: boolean;
}

export interface StopDetectionRequest {
}

export interface StopDetectionResponse {
  /** Acknowledgement of the request to stop the detection process. */
  success: boolean;
}

export interface ConfigRequest {
}

export interface ConfigResponse {
  /** The current configuration of the edge device. */
  model: DetectionModel | undefined;
  uploadRaw: boolean;
}

export interface StatisticsReportRequest {
  /** The current statistics report. */
  statisticsReport: StatisticsReport | undefined;
}

export interface StatisticsReportResponse {
  /** Acknowledgement of the statistics report. */
  success: boolean;
}

export interface HeartbeatRequest {
}

export interface HeartbeatResponse {
  /** Acknowledgement of the heartbeat message. */
  success: boolean;
}

/** Detection model properties */
export interface DetectionModel {
  name: string;
  version: string;
  objectName: string;
}

/** A statistics report. */
export interface StatisticsReport {
  /** Timestamp of the report in milliseconds since epoch. */
  timestamp: number;
  /** Total number of objects detected. */
  totalObjectsDetected: number;
  /** A thumbnail image of the most recent detection. */
  thumbnailImage: Uint8Array;
}

function createBaseStartDetectionRequest(): StartDetectionRequest {
  return {};
}

export const StartDetectionRequest = {
  encode(_: StartDetectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartDetectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartDetectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): StartDetectionRequest {
    return {};
  },

  toJSON(_: StartDetectionRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StartDetectionRequest>, I>>(base?: I): StartDetectionRequest {
    return StartDetectionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StartDetectionRequest>, I>>(_: I): StartDetectionRequest {
    const message = createBaseStartDetectionRequest();
    return message;
  },
};

function createBaseStartDetectionResponse(): StartDetectionResponse {
  return { success: false };
}

export const StartDetectionResponse = {
  encode(message: StartDetectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartDetectionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartDetectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StartDetectionResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: StartDetectionResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  create<I extends Exact<DeepPartial<StartDetectionResponse>, I>>(base?: I): StartDetectionResponse {
    return StartDetectionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StartDetectionResponse>, I>>(object: I): StartDetectionResponse {
    const message = createBaseStartDetectionResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseStopDetectionRequest(): StopDetectionRequest {
  return {};
}

export const StopDetectionRequest = {
  encode(_: StopDetectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopDetectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopDetectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): StopDetectionRequest {
    return {};
  },

  toJSON(_: StopDetectionRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StopDetectionRequest>, I>>(base?: I): StopDetectionRequest {
    return StopDetectionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StopDetectionRequest>, I>>(_: I): StopDetectionRequest {
    const message = createBaseStopDetectionRequest();
    return message;
  },
};

function createBaseStopDetectionResponse(): StopDetectionResponse {
  return { success: false };
}

export const StopDetectionResponse = {
  encode(message: StopDetectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopDetectionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopDetectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StopDetectionResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: StopDetectionResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  create<I extends Exact<DeepPartial<StopDetectionResponse>, I>>(base?: I): StopDetectionResponse {
    return StopDetectionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StopDetectionResponse>, I>>(object: I): StopDetectionResponse {
    const message = createBaseStopDetectionResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseConfigRequest(): ConfigRequest {
  return {};
}

export const ConfigRequest = {
  encode(_: ConfigRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ConfigRequest {
    return {};
  },

  toJSON(_: ConfigRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ConfigRequest>, I>>(base?: I): ConfigRequest {
    return ConfigRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ConfigRequest>, I>>(_: I): ConfigRequest {
    const message = createBaseConfigRequest();
    return message;
  },
};

function createBaseConfigResponse(): ConfigResponse {
  return { model: undefined, uploadRaw: false };
}

export const ConfigResponse = {
  encode(message: ConfigResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.model !== undefined) {
      DetectionModel.encode(message.model, writer.uint32(10).fork()).ldelim();
    }
    if (message.uploadRaw === true) {
      writer.uint32(16).bool(message.uploadRaw);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.model = DetectionModel.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.uploadRaw = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfigResponse {
    return {
      model: isSet(object.model) ? DetectionModel.fromJSON(object.model) : undefined,
      uploadRaw: isSet(object.uploadRaw) ? Boolean(object.uploadRaw) : false,
    };
  },

  toJSON(message: ConfigResponse): unknown {
    const obj: any = {};
    message.model !== undefined && (obj.model = message.model ? DetectionModel.toJSON(message.model) : undefined);
    message.uploadRaw !== undefined && (obj.uploadRaw = message.uploadRaw);
    return obj;
  },

  create<I extends Exact<DeepPartial<ConfigResponse>, I>>(base?: I): ConfigResponse {
    return ConfigResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ConfigResponse>, I>>(object: I): ConfigResponse {
    const message = createBaseConfigResponse();
    message.model = (object.model !== undefined && object.model !== null)
      ? DetectionModel.fromPartial(object.model)
      : undefined;
    message.uploadRaw = object.uploadRaw ?? false;
    return message;
  },
};

function createBaseStatisticsReportRequest(): StatisticsReportRequest {
  return { statisticsReport: undefined };
}

export const StatisticsReportRequest = {
  encode(message: StatisticsReportRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.statisticsReport !== undefined) {
      StatisticsReport.encode(message.statisticsReport, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatisticsReportRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatisticsReportRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.statisticsReport = StatisticsReport.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StatisticsReportRequest {
    return {
      statisticsReport: isSet(object.statisticsReport) ? StatisticsReport.fromJSON(object.statisticsReport) : undefined,
    };
  },

  toJSON(message: StatisticsReportRequest): unknown {
    const obj: any = {};
    message.statisticsReport !== undefined &&
      (obj.statisticsReport = message.statisticsReport ? StatisticsReport.toJSON(message.statisticsReport) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StatisticsReportRequest>, I>>(base?: I): StatisticsReportRequest {
    return StatisticsReportRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatisticsReportRequest>, I>>(object: I): StatisticsReportRequest {
    const message = createBaseStatisticsReportRequest();
    message.statisticsReport = (object.statisticsReport !== undefined && object.statisticsReport !== null)
      ? StatisticsReport.fromPartial(object.statisticsReport)
      : undefined;
    return message;
  },
};

function createBaseStatisticsReportResponse(): StatisticsReportResponse {
  return { success: false };
}

export const StatisticsReportResponse = {
  encode(message: StatisticsReportResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatisticsReportResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatisticsReportResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StatisticsReportResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: StatisticsReportResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  create<I extends Exact<DeepPartial<StatisticsReportResponse>, I>>(base?: I): StatisticsReportResponse {
    return StatisticsReportResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatisticsReportResponse>, I>>(object: I): StatisticsReportResponse {
    const message = createBaseStatisticsReportResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseHeartbeatRequest(): HeartbeatRequest {
  return {};
}

export const HeartbeatRequest = {
  encode(_: HeartbeatRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeartbeatRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeartbeatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): HeartbeatRequest {
    return {};
  },

  toJSON(_: HeartbeatRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HeartbeatRequest>, I>>(base?: I): HeartbeatRequest {
    return HeartbeatRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HeartbeatRequest>, I>>(_: I): HeartbeatRequest {
    const message = createBaseHeartbeatRequest();
    return message;
  },
};

function createBaseHeartbeatResponse(): HeartbeatResponse {
  return { success: false };
}

export const HeartbeatResponse = {
  encode(message: HeartbeatResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeartbeatResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeartbeatResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HeartbeatResponse {
    return { success: isSet(object.success) ? Boolean(object.success) : false };
  },

  toJSON(message: HeartbeatResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  create<I extends Exact<DeepPartial<HeartbeatResponse>, I>>(base?: I): HeartbeatResponse {
    return HeartbeatResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HeartbeatResponse>, I>>(object: I): HeartbeatResponse {
    const message = createBaseHeartbeatResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseDetectionModel(): DetectionModel {
  return { name: "", version: "", objectName: "" };
}

export const DetectionModel = {
  encode(message: DetectionModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.objectName !== "") {
      writer.uint32(26).string(message.objectName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetectionModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetectionModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.objectName = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetectionModel {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      version: isSet(object.version) ? String(object.version) : "",
      objectName: isSet(object.objectName) ? String(object.objectName) : "",
    };
  },

  toJSON(message: DetectionModel): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.version !== undefined && (obj.version = message.version);
    message.objectName !== undefined && (obj.objectName = message.objectName);
    return obj;
  },

  create<I extends Exact<DeepPartial<DetectionModel>, I>>(base?: I): DetectionModel {
    return DetectionModel.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DetectionModel>, I>>(object: I): DetectionModel {
    const message = createBaseDetectionModel();
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.objectName = object.objectName ?? "";
    return message;
  },
};

function createBaseStatisticsReport(): StatisticsReport {
  return { timestamp: 0, totalObjectsDetected: 0, thumbnailImage: new Uint8Array() };
}

export const StatisticsReport = {
  encode(message: StatisticsReport, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).int64(message.timestamp);
    }
    if (message.totalObjectsDetected !== 0) {
      writer.uint32(16).int32(message.totalObjectsDetected);
    }
    if (message.thumbnailImage.length !== 0) {
      writer.uint32(26).bytes(message.thumbnailImage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatisticsReport {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatisticsReport();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.timestamp = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.totalObjectsDetected = reader.int32();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.thumbnailImage = reader.bytes();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StatisticsReport {
    return {
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      totalObjectsDetected: isSet(object.totalObjectsDetected) ? Number(object.totalObjectsDetected) : 0,
      thumbnailImage: isSet(object.thumbnailImage) ? bytesFromBase64(object.thumbnailImage) : new Uint8Array(),
    };
  },

  toJSON(message: StatisticsReport): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    message.totalObjectsDetected !== undefined && (obj.totalObjectsDetected = Math.round(message.totalObjectsDetected));
    message.thumbnailImage !== undefined &&
      (obj.thumbnailImage = base64FromBytes(
        message.thumbnailImage !== undefined ? message.thumbnailImage : new Uint8Array(),
      ));
    return obj;
  },

  create<I extends Exact<DeepPartial<StatisticsReport>, I>>(base?: I): StatisticsReport {
    return StatisticsReport.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StatisticsReport>, I>>(object: I): StatisticsReport {
    const message = createBaseStatisticsReport();
    message.timestamp = object.timestamp ?? 0;
    message.totalObjectsDetected = object.totalObjectsDetected ?? 0;
    message.thumbnailImage = object.thumbnailImage ?? new Uint8Array();
    return message;
  },
};

export interface EdgeAgentService {
  /** Starts the object detection process on the edge device. */
  StartDetection(request: StartDetectionRequest): Promise<StartDetectionResponse>;
  /** Stops the object detection process on the edge device. */
  StopDetection(request: StopDetectionRequest): Promise<StopDetectionResponse>;
  /** Requests the saved configuration of the edge device from web app. */
  GetConfig(request: ConfigRequest): Promise<ConfigResponse>;
  /** Sends periodical statistics reports to the web application. */
  StatisticsReport(request: Observable<StatisticsReportRequest>): Promise<StatisticsReportResponse>;
  /** Sends a heartbeat message to the web application. */
  Heartbeat(request: HeartbeatRequest): Promise<HeartbeatResponse>;
}

export class EdgeAgentServiceClientImpl implements EdgeAgentService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "edge_agent.EdgeAgentService";
    this.rpc = rpc;
    this.StartDetection = this.StartDetection.bind(this);
    this.StopDetection = this.StopDetection.bind(this);
    this.GetConfig = this.GetConfig.bind(this);
    this.StatisticsReport = this.StatisticsReport.bind(this);
    this.Heartbeat = this.Heartbeat.bind(this);
  }
  StartDetection(request: StartDetectionRequest): Promise<StartDetectionResponse> {
    const data = StartDetectionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StartDetection", data);
    return promise.then((data) => StartDetectionResponse.decode(_m0.Reader.create(data)));
  }

  StopDetection(request: StopDetectionRequest): Promise<StopDetectionResponse> {
    const data = StopDetectionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StopDetection", data);
    return promise.then((data) => StopDetectionResponse.decode(_m0.Reader.create(data)));
  }

  GetConfig(request: ConfigRequest): Promise<ConfigResponse> {
    const data = ConfigRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetConfig", data);
    return promise.then((data) => ConfigResponse.decode(_m0.Reader.create(data)));
  }

  StatisticsReport(request: Observable<StatisticsReportRequest>): Promise<StatisticsReportResponse> {
    const data = request.pipe(map((request) => StatisticsReportRequest.encode(request).finish()));
    const promise = this.rpc.clientStreamingRequest(this.service, "StatisticsReport", data);
    return promise.then((data) => StatisticsReportResponse.decode(_m0.Reader.create(data)));
  }

  Heartbeat(request: HeartbeatRequest): Promise<HeartbeatResponse> {
    const data = HeartbeatRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Heartbeat", data);
    return promise.then((data) => HeartbeatResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
