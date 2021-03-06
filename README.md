# bot-notify

## 机器人消息通知

### 企业微信群机器人

- 文档：<https://open.work.weixin.qq.com/api/doc/90000/90136/91770>

- 参数

  ```json
  {
    token: string;
  }
  ```

- 示例

  ```js
  import { WecomNotify } from 'bot-notify';

  const wecomNotify = new WecomNotify({ token: 'xxx' });

  await wecomNotify.sendText('Hello World');

  // sendXXX
  ```

### 飞书自定义机器人

- 文档 <https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkj>
- 参数

  ```json
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

  // sendXXX
  ```

### 钉钉自定义机器人接入

- 文档：<https://developers.dingtalk.com/document/app/custom-robot-access>
- 参数

  ```json
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
  
  // sendXXX
  ```
