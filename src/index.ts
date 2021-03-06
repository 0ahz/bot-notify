import { WecomConfig, WecomNotify } from './service/wecom';
export interface NotifyConfig {
  wecom?: WecomConfig;
}

export interface NotifyInstance {
  wecom?: WecomNotify;
}

export function createNotify(config: NotifyConfig) {
  const instances: NotifyInstance = {};
  if (config.wecom) {
    instances.wecom = new WecomNotify(config.wecom);
  }
  return instances;
}
