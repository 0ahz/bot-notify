import fetch, { RequestInit } from 'node-fetch';
import createHttpsProxyAgent, { HttpsProxyAgent } from 'https-proxy-agent';

export interface BaseConfig {
  proxy?: string;
}

export class NotifyBase {
  proxyAgent?: HttpsProxyAgent;
  constructor(config: BaseConfig) {
    if (config.proxy) {
      this.proxyAgent = createHttpsProxyAgent(config.proxy);
    }
  }

  /**
   * @param  {string} url
   * @param  {RequestInit} options
   * @returns Promise
   */
  async request(url: string, options: RequestInit): Promise<any> {
    const defaultOptions: RequestInit = {
      headers: { 'Content-Type': 'application/json' },
    };
    if (this.proxyAgent) {
      defaultOptions.agent = this.proxyAgent;
    }
    const mergedOptions: RequestInit = {
      ...defaultOptions,
      ...options,
    };
    if (options.body) {
      mergedOptions.body = JSON.stringify(options.body);
    }
    const response = await fetch(url, mergedOptions);
    const contentType = response.headers.get('content-type');
    let ret = null;
    switch (contentType) {
      case 'application/json':
        ret = await response.json();
        break;
      default:
        ret = await response.text();
    }
    return ret;
  }

  /**
   * @param  {string} url
   * @param  {any} data
   * @returns Promise
   */
  async requestPost(url: string, data: any): Promise<any> {
    return await this.request(url, { method: 'post', body: data });
  }

  /**
   * @param  {string} url
   * @returns Promise
   */
  async requestGet(url: string): Promise<any> {
    return await this.request(url, { method: 'get' });
  }
}
