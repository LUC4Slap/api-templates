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
        const idPagamento = webhook.payload?.data?.id || webhook.payload?.id;

        // 🔥 Aqui você faz o processamento real, ex: consultar status do pagamento
        await this.simularProcessamento(tipoEvento, idPagamento);

        // Marca como processado
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

    // Aqui você consultaria a API do Mercado Pago, atualizaria o pedido no Postgres, etc.
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
