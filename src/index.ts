import { WecomConfig, WecomNotify } from './services/wecom';
import { LarkConfig, LarkNotify } from './services/lark';
import { DingConfig, DingNotify } from './services/ding';
export interface NotifyConfig {
  wecom?: WecomConfig;
  lark?: LarkConfig;
  ding?: DingConfig;
}

export interface NotifyInstance {
  wecom?: WecomNotify;
  lark?: LarkNotify;
  ding?: DingNotify;
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
  return instances;
}

export { WecomNotify, LarkNotify, DingNotify };
