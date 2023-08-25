import dayjs from "dayjs";

import { expect, it } from "vitest";
import { changeEndTime } from "./_licenseRenew";

it("changeEndTime", () => {
  const time = dayjs(Date.now()).add(10, "day");
  const lastTime = dayjs(time).toDate().getTime();
  const end = changeEndTime(time.toString(), 31);
  const changeTime = end.getTime();

  expect(changeTime - lastTime > 60 * 1000 * 60 * 24 * 30).eq(true);
});
