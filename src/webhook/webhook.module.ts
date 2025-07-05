import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookSchema } from './schema/webhook.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/webhookdb'), // Conexão específica para esse módulo
    MongooseModule.forFeature([{ name: 'Webhook', schema: WebhookSchema }]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
