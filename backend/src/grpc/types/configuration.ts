export interface ConfigResponse {
    model: Model
}

export interface Model {
    name: string,
    version: string,
    objectName: string
}