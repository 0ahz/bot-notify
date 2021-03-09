import { INotifyBase } from '../interface/base';
import { BaseConfig, NotifyBase } from './base';

export interface TelegramConfig extends BaseConfig {
  token: string;
  chat_id?: string;
}

export interface TelegramTextMessage {
  chat_id?: number | string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  text: string;
  [k: string]: unknown;
}

export class TelegramNotify extends NotifyBase implements INotifyBase {
  private apiUrl: string = '';
  private chat_id: string = '';

  constructor(config: TelegramConfig) {
    super(config);
    this.apiUrl = `https://api.telegram.org/bot${config.token}/sendMessage`;
    if (config.chat_id) {
      this.chat_id = config.chat_id;
    }
  }

  async send(message: TelegramTextMessage): Promise<any> {
    if (!message.chat_id && this.chat_id) {
      message.chat_id = this.chat_id;
    }
    return await this.requestPost(this.apiUrl, message);
  }

  async sendText(text: string | TelegramTextMessage): Promise<any> {
    let msg: TelegramTextMessage = { text: '' };
    if (typeof text === 'string') {
      msg.text = text;
    } else {
      msg = text;
    }
    return await this.send(msg);
  }
}
