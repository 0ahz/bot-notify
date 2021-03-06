import fetch, { RequestInit } from 'node-fetch';

export class NotifyBase {
  constructor() {}

  /**
   * @param  {string} url
   * @param  {RequestInit} options
   * @returns Promise
   */
  async request(url: string, options: RequestInit): Promise<any> {
    const defaultOptions: RequestInit = {
      headers: { 'Content-Type': 'application/json' },
    };
    const mergedOptions: RequestInit = {
      ...defaultOptions,
      ...options,
    };
    if (options.body) {
      mergedOptions.body = JSON.stringify(options.body);
    }
    const response = await fetch(url, mergedOptions);
    return await response.json();
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
