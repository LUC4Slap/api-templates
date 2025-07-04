import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from 'src/minio/minio.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService, MinioService],
})
export class TemplateModule {}
