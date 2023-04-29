export interface ConfigResponse {
    model: Model,
    uploadRaw: boolean
}

export interface Model {
    name: string,
    version: string,
    objectName: string,
}