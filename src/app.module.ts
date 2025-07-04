import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TemplateModule } from './template/template.module';
import { MinioService } from './minio/minio.service';

@Module({
  imports: [AuthModule, TemplateModule],
  controllers: [],
  providers: [MinioService],
})
export class AppModule {}
