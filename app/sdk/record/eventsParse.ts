import { AES, enc, SHA256 } from "crypto-js";
import { i18n } from "../../i18n";
import { sdkStorage } from "./data";

export function eventsToString(events: typeof sdkStorage.val.events, meta: Record<string, unknown>) {
  const keys = Object.keys(sdkStorage.val.meta);
  const values: Record<string, boolean> = {};
  events.forEach((k) => {
    values[k.value || ""] = true;
  });
  keys.forEach((k) => {
    if (!values[k]) {
      delete sdkStorage.val.meta[k];
    }
  });

  // 保存之前, 删除所有临时信息
  events.forEach((v) => {
    delete v.taskId;
    delete v.isLast;
  });
  let code = JSON.stringify({ events, meta });
  const md5 = SHA256(code).toString();
  if (sdkStorage.val.localPwd) {
    code = AES.encrypt(code, sdkStorage.val.localPwd).toString();
  }

  return { md5, code };
}

export function eventsParse(code: string, isCrypto: boolean) {
  if (isCrypto) {
    if (!sdkStorage.val.localPwd) {
      return {
        events: [
          {
            error: i18n.该用例需要本地密钥解密请在设置中设定本地密钥,
            isCrypto,
            code,
          },
        ],
        meta: {},
      };
    }
    try {
      const _code = enc.Utf8.stringify(AES.decrypt(code, sdkStorage.val.localPwd));

      const data = JSON.parse(_code);
      if (!data.events) {
        return {
          events: [
            {
              error: i18n.使用本地密钥解密失败请确认本地密钥是否正确,
              isCrypto,
              code,
            },
          ],
          meta: {},
        };
      }
      return {
        events: data.events,
        meta: data.meta,
      };
    } catch (err) {
      return {
        events: [
          {
            error: i18n.使用本地密钥解密失败请确认本地密钥是否正确,
            isCrypto,
            code,
          },
        ],
        meta: {},
      };
    }
  }
  try {
    const data = JSON.parse(code);
    return {
      events: data.events,
      meta: data.meta,
    };
  } catch (err) {
    return {
      events: [],
      meta: {},
    };
  }
}
