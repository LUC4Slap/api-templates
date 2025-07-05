import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  Logger,
} from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  @Post()
  @HttpCode(200)
  async handleWebhook(@Body() payload: any, @Headers() headers: any) {
    this.logger.log('Webhook recebido do Mercado Pago');
    this.logger.debug('Payload:', JSON.stringify(payload));

    const tipoEvento = payload?.action;
    const idPagamento = payload?.data?.id;

    this.logger.log(
      `Tipo de evento: ${tipoEvento}, Pagamento ID: ${idPagamento}`,
    );

    if (tipoEvento === 'payment.updated' || tipoEvento === 'payment.created') {
      // Aqui você pode consultar o status do pagamento via API do Mercado Pago
      await this.processarPagamento(idPagamento);
    }

    return { mensagem: 'Webhook Mercado Pago recebido' };
  }

  private async processarPagamento(idPagamento: string) {
    this.logger.log(`Consultando e processando pagamento: ${idPagamento}`);

    // Você normalmente faz uma requisição para a API do Mercado Pago aqui
    // para buscar o status real do pagamento e atualizar seu banco

    // Exemplo: await this.pagamentoService.atualizarStatusPedido(...);
  }
}
