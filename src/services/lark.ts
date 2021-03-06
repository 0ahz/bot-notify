import crypto from 'crypto';

import { INotifyBase } from '../interface/base';
import { NotifyBase } from './base';

export interface LarkConfig {
  token: string;
  secret?: string;
}

export interface LarkTextMessage {
  text: string;
}

export interface LarkImageMessage {
  image_key: string;
}

export interface LarkShareChatMessage {
  share_chat_id: string;
}

export interface LarkPostMessage {
  post: {
    [lang: string]: {
      title: string;
      content: Array<any>;
    };
  };
}

export interface LarkCardMessage {
  config?: {
    wide_screen_mode: boolean;
    enable_forward: boolean;
  };
  elements: Array<any>;
  header?: {
    title: any;
    template?:
      | 'red'
      | 'blue'
      | 'wathet'
      | 'turquoise'
      | 'green'
      | 'yellow'
      | 'orange'
      | 'carmine'
      | 'violet'
      | 'purple'
      | 'indigo'
      | 'grey';
  };
}

export interface LarkMessage {
  timestamp?: string;
  sign?: string;
  msg_type: 'text' | 'post' | 'image' | 'share_chat' | 'interactive';
  content?:
    | LarkTextMessage
    | LarkPostMessage
    | LarkShareChatMessage
    | LarkImageMessage;
  card?: LarkCardMessage;
}

export class LarkNotify extends NotifyBase implements INotifyBase {
  private apiUrl: string = '';
  private secret: string = '';

  constructor(config: LarkConfig) {
    super();
    let { token, secret } = config;
    this.apiUrl = `https://open.feishu.cn/open-apis/bot/v2/hook/${token}`;
    if (secret) {
      this.secret = secret;
    }
  }

  /**
   * @param  {LarkMessage} message
   * @returns Promise
   */
  async send(message: LarkMessage): Promise<any> {
    if (this.secret) {
      let timestamp = (new Date().getTime() / 1000).toFixed();
      let sign = this.genMessageSign(`${timestamp}\n${this.secret}`);
      message.timestamp = timestamp;
      message.sign = sign;
    }
    const result = await this.requestPost(this.apiUrl, message);
    return {
      success: result.errcode === '0',
      data: result,
    };
  }

  /**
   * @param  {string|LarkTextMessage} text
   * @returns Promise
   */
  async sendText(text: string | LarkTextMessage): Promise<any> {
    let msg: LarkMessage = {
      msg_type: 'text',
      content: { text: '' },
    };
    if (typeof text === 'string') {
      msg.content = { text };
    } else {
      msg.content = text;
    }
    return await this.send(msg);
  }

  /**
   * @param  {string|LarkImageMessage} image_key
   * @returns Promise
   */
  async sendImage(image_key: string | LarkImageMessage): Promise<any> {
    let msg: LarkMessage = {
      msg_type: 'image',
      content: {
        image_key: '',
      },
    };
    if (typeof image_key === 'string') {
      msg.content = { image_key };
    } else {
      msg.content = image_key;
    }
    return await this.send(msg);
  }

  /**
   * @param  {string|LarkShareChatMessage} share_chat_id
   * @returns Promise
   */
  async sendShareChat(
    share_chat_id: string | LarkShareChatMessage
  ): Promise<any> {
    let msg: LarkMessage = {
      msg_type: 'share_chat',
      content: {
        share_chat_id: '',
      },
    };
    if (typeof share_chat_id === 'string') {
      msg.content = { share_chat_id };
    } else {
      msg.content = share_chat_id;
    }
    return await this.send(msg);
  }

  /**
   * @param  {LarkPostMessage} post
   * @returns Promise
   */
  async sendPost(post: LarkPostMessage): Promise<any> {
    let msg: LarkMessage = {
      msg_type: 'post',
      content: post,
    };
    return await this.send(msg);
  }

  /**
   * @param  {LarkCardMessage} card
   * @returns Promise
   */
  async sendCard(card: LarkCardMessage): Promise<any> {
    let msg: LarkMessage = {
      msg_type: 'interactive',
      card: card,
    };
    return await this.send(msg);
  }

  /**
   * @param  {string} message
   * @returns string
   */
  private genMessageSign(message: string): string {
    return crypto.createHmac('SHA256', message).update('').digest('base64');
  }
}
