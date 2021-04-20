import crypto from 'crypto'

import { BaseConfig, NotifyBase, INotifyBase, INotifyResult } from './base'

export interface DingConfig extends BaseConfig {
  token: string
  secret?: string
}

export interface DingMessageAt {
  atMobiles?: Array<string>
  isAtAll?: boolean
}

export interface DingTextMessage {
  content: string
}

export interface DingLinkMessage {
  text: string
  title: string
  picUrl: string
  messageUrl: string
}

export interface DingMarkdownMessage {
  title: string
  text: string
}

export interface DingActionCardMessage {
  title: string
  text: string
  btnOrientation?: '0' | '1'
  //
  singleTitle: string
  singleURL: string
}

export interface DingActionsCardMessage {
  title: string
  text: string
  btnOrientation?: '0' | '1'
  //
  hideAvatar: '0' | '1'
  btns: Array<{ title: string; actionURL: string }>
}

export interface DingFeedCardLinksMessage {
  [index: number]: {
    title: string
    messageURL: string
    picURL: string
  }
}

export interface DingMessage {
  msgtype: 'text' | 'link' | 'markdown' | 'actionCard' | 'feedCard'
  at?: DingMessageAt
  text?: DingTextMessage
  link?: DingLinkMessage
  markdown?: DingMarkdownMessage
  actionCard?: DingActionCardMessage | DingActionsCardMessage
  feedCard?: {
    links: DingFeedCardLinksMessage
  }
}

export class DingNotify extends NotifyBase implements INotifyBase {
  private token: string = ''
  private secret: string = ''

  constructor(config: DingConfig) {
    super(config)
    let { token, secret } = config
    this.token = token
    if (secret) {
      this.secret = secret
    }
  }

  /**
   * @param  {DingMessage} message
   * @returns Promise
   */
  async send(message: DingMessage): Promise<INotifyResult> {
    let apiUrl = `https://oapi.dingtalk.com/robot/send?access_token=${this.token}`
    if (this.secret) {
      let timestamp = new Date().getTime().toString()
      let sign = encodeURIComponent(
        this.genMessageSign(`${timestamp}\n${this.secret}`, this.secret)
      )
      apiUrl += `&timestamp=${timestamp}&sign=${sign}`
    }
    const result = await this.requestPost(apiUrl, message)
    return {
      success: result.errcode === 0,
      data: result,
    }
  }

  /**
   * @param  {string|DingTextMessage} text
   * @returns Promise
   */
  async sendText(text: string | DingTextMessage): Promise<INotifyResult> {
    let msg: DingMessage = {
      msgtype: 'text',
      text: { content: '' },
    }
    if (typeof text === 'string') {
      msg.text = { content: text }
    } else {
      msg.text = text
    }
    return await this.send(msg)
  }

  /**
   * @param  {DingLinkMessage} link
   * @returns Promise
   */
  async sendLink(link: DingLinkMessage): Promise<INotifyResult> {
    let msg: DingMessage = {
      msgtype: 'link',
      link: link,
    }
    return await this.send(msg)
  }

  /**
   * @param  {DingMarkdownMessage} markdown
   * @returns Promise
   */
  async sendMarkdown(markdown: DingMarkdownMessage): Promise<INotifyResult> {
    let msg: DingMessage = {
      msgtype: 'markdown',
      markdown: markdown,
    }
    return await this.send(msg)
  }

  /**
   * @param  {DingActionCardMessage|DingActionsCardMessage} actionCard
   * @returns Promise
   */
  async sendActionCard(
    actionCard: DingActionCardMessage | DingActionsCardMessage
  ): Promise<INotifyResult> {
    let msg: DingMessage = {
      msgtype: 'actionCard',
      actionCard: actionCard,
    }
    return await this.send(msg)
  }

  /**
   * @param  {DingFeedCardLinksMessage} feedCardLinks
   * @returns Promise
   */
  async sendFeedCard(
    feedCardLinks: DingFeedCardLinksMessage
  ): Promise<INotifyResult> {
    let msg: DingMessage = {
      msgtype: 'feedCard',
      feedCard: {
        links: feedCardLinks,
      },
    }
    return await this.send(msg)
  }

  /**
   * @param  {string} message
   * @param  {string} secret
   * @returns string
   */
  private genMessageSign(message: string, secret: string): string {
    return crypto.createHmac('SHA256', secret).update(message).digest('base64')
  }
}
