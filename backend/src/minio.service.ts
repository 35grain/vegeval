import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  public minioClient: Minio.Client;
  async onModuleInit() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: 9000,
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY
    });
  }
}
