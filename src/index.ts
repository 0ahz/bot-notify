import { WecomConfig, WecomNotify } from './services/wecom';
import { LarkConfig, LarkNotify } from './services/lark';
import { DingConfig, DingNotify } from './services/ding';
import { TelegramConfig, TelegramNotify } from './services/telegram';
export interface NotifyConfig {
  wecom?: WecomConfig;
  lark?: LarkConfig;
  ding?: DingConfig;
  telegram?: TelegramConfig;
}

export interface NotifyInstance {
  wecom?: WecomNotify;
  lark?: LarkNotify;
  ding?: DingNotify;
  telegram?: TelegramNotify;
}

export function createNotify(config: NotifyConfig) {
  const instances: NotifyInstance = {};
  if (config.wecom) {
    instances.wecom = new WecomNotify(config.wecom);
  }
  if (config.lark) {
    instances.lark = new LarkNotify(config.lark);
  }
  if (config.ding) {
    instances.ding = new DingNotify(config.ding);
  }
  if (config.telegram) {
    instances.telegram = new TelegramNotify(config.telegram);
  }
  return instances;
}

export { WecomNotify, LarkNotify, DingNotify, TelegramNotify };
