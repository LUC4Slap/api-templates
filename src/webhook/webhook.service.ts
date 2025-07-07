import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  constructor(@InjectModel('Webhook') private webhookModel: Model<any>) {}

  async salvarWebhook(payload: any, headers: any) {
    const webhook = new this.webhookModel({
      payload,
      headers,
    });
    await webhook.save();
  }

  // ✅ Roda a cada 10 segundos (pode ajustar o intervalo)
  @Interval(10000)
  async processarWebhooksPendentes() {
    this.logger.log('Verificando Webhooks pendentes...');

    const webhooks = await this.webhookModel
      .find({ processed: false })
      .limit(10);

    for (const webhook of webhooks) {
      try {
        this.logger.log(`Processando Webhook ID: ${webhook._id}`);

        const tipoEvento = webhook.payload?.action || webhook.payload?.event;
        const idPagamento =
          webhook.payload?.data?.order_id || webhook.payload?.id;

        await this.simularProcessamento(tipoEvento, idPagamento);

        webhook.processed = true;
        await webhook.save();

        this.logger.log(`Webhook ${webhook._id} processado com sucesso`);
      } catch (error) {
        this.logger.error(`Erro ao processar Webhook ${webhook._id}`, error);
      }
    }
  }

  private async simularProcessamento(tipoEvento: string, idPagamento: string) {
    this.logger.log(
      `Simulando processamento do evento: ${tipoEvento} para pagamento ${idPagamento}`,
    );

    // TODO: LOGICA PARA PESQUISAR NA API DO MERCADO PAGO PARA VALIDAR SE O PAGAMENTO FOI APROVADO
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
