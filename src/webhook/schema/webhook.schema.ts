import { Schema } from 'mongoose';

export const WebhookSchema = new Schema({
  receivedAt: { type: Date, default: Date.now },
  payload: { type: Object },
  headers: { type: Object },
  processed: { type: Boolean, default: false },
});
