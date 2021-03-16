import { INotifyBase } from '../interface/base';
import { BaseConfig, NotifyBase } from './base';

export interface DiscordConfig extends BaseConfig {
  id: string;
  token: string;
}

export interface DiscordMessage {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  [k: string]: unknown;
}

export class DiscordNotify extends NotifyBase implements INotifyBase {
  private apiUrl: string;

  constructor(config: DiscordConfig) {
    super(config);
    this.apiUrl = `https://discord.com/api/webhooks/${config.id}/${config.token}`;
  }

  async send(message: DiscordMessage): Promise<any> {
    return await this.requestPost(this.apiUrl, message);
  }

  async sendText(text: string | DiscordMessage): Promise<any> {
    let msg: DiscordMessage = { content: '' };
    if (typeof text === 'string') {
      msg.content = text;
    } else {
      msg = text;
    }
    return await this.send(msg);
  }
}
