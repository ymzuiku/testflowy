import { apis } from "../../../_apis";

export const polling = (oid: string, isStop: () => boolean) => {
  let count = 0;
  let pollingSpace = 1000;
  return new Promise((res) => {
    if (!oid) {
      console.error("polling not has oid");
      return;
    }
    const runner = () => {
      setTimeout(async () => {
        if (isStop()) {
          res(true);
          return;
        }
        count++;
        const data = await apis.app_pay.payCheck({ oid: oid });
        if (data.ok) {
          res(true);
          return;
        } else {
          pollingSpace += 200;
          if (pollingSpace > 2500) {
            pollingSpace = 2500;
          }
          // 最多重试 N 次
          if (count < 100) {
            runner();
          }
        }
      }, pollingSpace);
    };
    runner();
  });
};
