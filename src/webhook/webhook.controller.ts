/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  constructor(private webhookService: WebhookService) {}

  @Post()
  @HttpCode(200)
  async handleWebhook(@Body() payload: any, @Headers() headers: any) {
    try {
      this.logger.log('Webhook recebido do Mercado Pago');
      this.logger.debug('Payload:', JSON.stringify(payload));
      await this.webhookService.salvarWebhook(payload, headers);

      const tipoEvento = payload?.event;
      const idPagamento = payload?.data?.order_id;

      this.logger.log(
        `Tipo de evento: ${tipoEvento}, Pagamento ID: ${idPagamento}`,
      );

      return { mensagem: 'Webhook Mercado Pago recebido' };
    } catch (error) {
      return {
        erro: `Erro ao processar o webhook: ${error?.message || error}`,
      };
    }
  }
}
