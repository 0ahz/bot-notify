# bot-notify

## 机器人消息通知

目前支持：

- [x] 企业微信群机器人
- [x] 飞书自定义机器人、
- [x] 钉钉自定义机器人接入
- [x] Telegram Bot

### 安装

```bash
npm install bot-notify
```

### 通用配置

```ts
{
  proxy?:string // http://127.0.0.1:1087
}
```

### 企业微信群机器人

- 文档：<https://open.work.weixin.qq.com/api/doc/90000/90136/91770>

- 参数

  ```ts
  {
    token: string;
  }
  ```

- 示例

  ```js
  import { WecomNotify } from 'bot-notify';

  const wecomNotify = new WecomNotify({ token: 'xxx' });

  await wecomNotify.sendText('Hello World');

  // 其他类型消息 sendXXX
  ```

### 飞书自定义机器人

- 文档 <https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkj>

- 参数

  ```ts
  {
    token: string,
    secret?: string,
  }
  ```

- 示例

  ```js
  import { LarkNotify } from 'bot-notify';

  const larkNotify = new LarkNotify({ token: 'xxx', secret: 'xxx' });

  await larkNotify.sendText('Hello World');

  // 其他类型消息 sendXXX
  ```

### 钉钉自定义机器人接入

- 文档：<https://developers.dingtalk.com/document/app/custom-robot-access>

- 参数

  ```ts
  {
    token: string,
    secret?: string,
  }
  ```

- 示例

  ```js
  import { DingNotify } from 'bot-notify';

  const dingNotify = new DingNotify({ token: 'xxx', secret: 'xxx' });

  await dingNotify.sendText('Hello World');

  // 其他类型消息 sendXXX
  ```

### Telegram Bot

- 文档：<https://core.telegram.org/bots/api#sendmessage>

- 参数

  ```ts
  {
    token: string,
    chat_id?: string
  }
  ```

- 示例

  ```js
  import { TelegramNotify } from 'bot-notify';

  const tgNotify = new TelegramNotify({ token: 'xxx' });

  await tgNotify.sendText('Hello World');
  ```

- 如何创建 `Telegram Bot`

  TODO

- 如果获取 `group` 或 `channel` 的 `chat_id`

  TODO
