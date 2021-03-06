import { INotifyBase } from '../interface/base';
import { NotifyBase } from './base';

export interface WecomConfig {
  token: string;
}

export interface WecomTextMessage {
  content: string;
  mentioned_list?: Array<string>;
  mentioned_mobile_list?: Array<string>;
}

export interface WecomMarkdownMessage {
  content: string;
}

export interface WecomImageMessage {
  base64: string;
  md5: string;
}

export interface WecomNewsItemMessage {
  title: string;
  description: string;
  url: string;
  picurl: string;
}

export interface WecomNewsMessage {
  articles: Array<WecomNewsItemMessage>;
}

export interface WecomFileMessage {
  media_id: string;
}

export interface WecomMessage {
  msgtype: 'text' | 'markdown' | 'image' | 'news' | 'file';
  text?: WecomTextMessage;
  markdown?: WecomMarkdownMessage;
  image?: WecomImageMessage;
  news?: WecomNewsMessage;
  file?: WecomFileMessage;
}

export class WecomNotify extends NotifyBase implements INotifyBase {
  private apiUrl: string = '';

  /**
   * @param  {WecomConfig} config
   */
  constructor(config: WecomConfig) {
    super();
    this.apiUrl = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${config.token}`;
  }

  /**
   * @param  {WecomMessage} message
   * @returns Promise
   */
  async send(message: WecomMessage): Promise<any> {
    const result = await this.requestPost(this.apiUrl, message);
    return {
      success: result.errcode === 0,
      data: result,
    };
  }

  /**
   * @param  {string|WecomTextMessage} text
   * @returns Promise
   */
  async sendText(text: string | WecomTextMessage): Promise<any> {
    let msg: WecomMessage = {
      msgtype: 'text',
    };
    if (typeof text === 'string') {
      msg.text = {
        content: text,
      };
    } else {
      msg.text = text;
    }
    return await this.send(msg);
  }

  /**
   * @param  {string|WecomMarkdownMessage} markdown
   * @returns Promise
   */
  async sendMarkdown(markdown: string | WecomMarkdownMessage): Promise<any> {
    let msg: WecomMessage = {
      msgtype: 'markdown',
    };
    if (typeof markdown === 'string') {
      msg.markdown = {
        content: markdown,
      };
    } else {
      msg.markdown = markdown;
    }
    return await this.send(msg);
  }
}
