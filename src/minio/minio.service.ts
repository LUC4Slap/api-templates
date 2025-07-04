import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      endpoint: 'http://localhost:9000', // Se o Nest rodar dentro do Docker, use o nome do serviço do docker-compose
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'umbrel',
        secretAccessKey: 'minio123',
      },
      forcePathStyle: true, // Importante para MinIO
    });
  }

  async uploadFile(
    bucket: string,
    key: string,
    body: Buffer | Readable,
    contentType: string,
  ) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  async getFile(bucket: string, key: string) {
    const response = await this.s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
    return response.Body;
  }
}
