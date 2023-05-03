// package: edge_agent
// file: edge_agent.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class StartDetectionRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StartDetectionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StartDetectionRequest): StartDetectionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StartDetectionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StartDetectionRequest;
    static deserializeBinaryFromReader(message: StartDetectionRequest, reader: jspb.BinaryReader): StartDetectionRequest;
}

export namespace StartDetectionRequest {
    export type AsObject = {
    }
}

export class StartDetectionResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): StartDetectionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StartDetectionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StartDetectionResponse): StartDetectionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StartDetectionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StartDetectionResponse;
    static deserializeBinaryFromReader(message: StartDetectionResponse, reader: jspb.BinaryReader): StartDetectionResponse;
}

export namespace StartDetectionResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class StopDetectionRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StopDetectionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StopDetectionRequest): StopDetectionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StopDetectionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StopDetectionRequest;
    static deserializeBinaryFromReader(message: StopDetectionRequest, reader: jspb.BinaryReader): StopDetectionRequest;
}

export namespace StopDetectionRequest {
    export type AsObject = {
    }
}

export class StopDetectionResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): StopDetectionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StopDetectionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StopDetectionResponse): StopDetectionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StopDetectionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StopDetectionResponse;
    static deserializeBinaryFromReader(message: StopDetectionResponse, reader: jspb.BinaryReader): StopDetectionResponse;
}

export namespace StopDetectionResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class ConfigRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConfigRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ConfigRequest): ConfigRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConfigRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConfigRequest;
    static deserializeBinaryFromReader(message: ConfigRequest, reader: jspb.BinaryReader): ConfigRequest;
}

export namespace ConfigRequest {
    export type AsObject = {
    }
}

export class ConfigResponse extends jspb.Message { 

    hasModel(): boolean;
    clearModel(): void;
    getModel(): DetectionModel | undefined;
    setModel(value?: DetectionModel): ConfigResponse;
    getUploadraw(): boolean;
    setUploadraw(value: boolean): ConfigResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConfigResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ConfigResponse): ConfigResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConfigResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConfigResponse;
    static deserializeBinaryFromReader(message: ConfigResponse, reader: jspb.BinaryReader): ConfigResponse;
}

export namespace ConfigResponse {
    export type AsObject = {
        model?: DetectionModel.AsObject,
        uploadRaw: boolean,
    }
}

export class StatisticsReportRequest extends jspb.Message { 

    hasStatisticsReport(): boolean;
    clearStatisticsReport(): void;
    getStatisticsReport(): StatisticsReport | undefined;
    setStatisticsReport(value?: StatisticsReport): StatisticsReportRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatisticsReportRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StatisticsReportRequest): StatisticsReportRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatisticsReportRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatisticsReportRequest;
    static deserializeBinaryFromReader(message: StatisticsReportRequest, reader: jspb.BinaryReader): StatisticsReportRequest;
}

export namespace StatisticsReportRequest {
    export type AsObject = {
        statisticsReport?: StatisticsReport.AsObject,
    }
}

export class StatisticsReportResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): StatisticsReportResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatisticsReportResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StatisticsReportResponse): StatisticsReportResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatisticsReportResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatisticsReportResponse;
    static deserializeBinaryFromReader(message: StatisticsReportResponse, reader: jspb.BinaryReader): StatisticsReportResponse;
}

export namespace StatisticsReportResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class HeartbeatRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HeartbeatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HeartbeatRequest): HeartbeatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HeartbeatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HeartbeatRequest;
    static deserializeBinaryFromReader(message: HeartbeatRequest, reader: jspb.BinaryReader): HeartbeatRequest;
}

export namespace HeartbeatRequest {
    export type AsObject = {
    }
}

export class HeartbeatResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): HeartbeatResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HeartbeatResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HeartbeatResponse): HeartbeatResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HeartbeatResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HeartbeatResponse;
    static deserializeBinaryFromReader(message: HeartbeatResponse, reader: jspb.BinaryReader): HeartbeatResponse;
}

export namespace HeartbeatResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class DetectionModel extends jspb.Message { 
    getName(): string;
    setName(value: string): DetectionModel;
    getVersion(): string;
    setVersion(value: string): DetectionModel;
    getObjectname(): string;
    setObjectname(value: string): DetectionModel;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetectionModel.AsObject;
    static toObject(includeInstance: boolean, msg: DetectionModel): DetectionModel.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetectionModel, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetectionModel;
    static deserializeBinaryFromReader(message: DetectionModel, reader: jspb.BinaryReader): DetectionModel;
}

export namespace DetectionModel {
    export type AsObject = {
        name: string,
        version: string,
        objectName: string,
    }
}

export class StatisticsReport extends jspb.Message { 
    getTimestamp(): number;
    setTimestamp(value: number): StatisticsReport;
    getTotalObjectsDetected(): number;
    setTotalObjectsDetected(value: number): StatisticsReport;
    getThumbnailImage(): Uint8Array | string;
    getThumbnailImage_asU8(): Uint8Array;
    getThumbnailImage_asB64(): string;
    setThumbnailImage(value: Uint8Array | string): StatisticsReport;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatisticsReport.AsObject;
    static toObject(includeInstance: boolean, msg: StatisticsReport): StatisticsReport.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatisticsReport, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatisticsReport;
    static deserializeBinaryFromReader(message: StatisticsReport, reader: jspb.BinaryReader): StatisticsReport;
}

export namespace StatisticsReport {
    export type AsObject = {
        timestamp: number,
        totalObjectsDetected: number,
        thumbnailImage: Uint8Array | string,
    }
}
