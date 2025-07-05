import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TemplateModule } from './template/template.module';
import { MinioService } from './minio/minio.service';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [AuthModule, TemplateModule, WebhookModule],
  controllers: [],
  providers: [MinioService],
})
export class AppModule {}
