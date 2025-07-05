import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TemplateModule } from './template/template.module';
import { MinioService } from './minio/minio.service';
import { WebhookModule } from './webhook/webhook.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    TemplateModule,
    ScheduleModule.forRoot(),
    WebhookModule,
  ],
  controllers: [],
  providers: [MinioService],
})
export class AppModule {}
