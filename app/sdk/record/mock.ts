import { NanoStorage } from "nano-storage";
import { randomCode } from "utils/strs";
import { randomEmail } from "utils/strs/randomEmail";
import { randomNum } from "utils/strs/randomNum";
import { randomPhone } from "utils/strs/randomPhone";
import { randomText } from "utils/strs/randomText";
import { v4 } from "uuid";

export const mockValue = (value: string | null) => {
  if (!value) {
    return value;
  }
  const fn = mocks[value];
  if (fn) {
    const v = fn();
    return v;
  } else if (lastMocks.val[value]) {
    return lastMocks.val[value];
  }
  return value;
};

export const lastMocks = NanoStorage("testflowy_mocks", {} as Record<string, string>, "sessionStorage");

export const mocks: Record<string, () => string> = {
  $email$: () => {
    lastMocks.assign({
      "$last-email$": randomEmail(),
    });
    return lastMocks.val["$last-email$"];
  },
  $phone$: () => {
    lastMocks.assign({
      "$last-phone$": randomPhone(),
    });
    return lastMocks.val["$last-phone$"];
  },
  $password$: () => {
    lastMocks.assign({
      "$last-password$": "A0" + randomText(7),
    });
    return lastMocks.val["$last-password$"];
  },
  // $text: () => {
  //   lastMocks.assign({
  //     "$last-text": randomText(8),
  //   });
  //   return lastMocks.val["$last-text"];
  // },
  $text1$: () => {
    lastMocks.assign({
      "$last-text1$": randomText(1),
    });
    return lastMocks.val["$last-text1$"];
  },
  $text2$: () => {
    lastMocks.assign({
      "$last-text2$": randomText(2),
    });
    return lastMocks.val["$last-text2$"];
  },
  $text3$: () => {
    lastMocks.assign({
      "$last-text3$": randomText(3),
    });
    return lastMocks.val["$last-text3$"];
  },
  $text4$: () => {
    lastMocks.assign({
      "$last-text4$": randomText(4),
    });
    return lastMocks.val["$last-text4$"];
  },
  $text5$: () => {
    lastMocks.assign({
      "$last-text5$": randomText(5),
    });
    return lastMocks.val["$last-text5$"];
  },
  $text6$: () => {
    lastMocks.assign({
      "$last-text6$": randomText(6),
    });
    return lastMocks.val["$last-text6$"];
  },
  $text7$: () => {
    lastMocks.assign({
      "$last-text7$": randomText(7),
    });
    return lastMocks.val["$last-text7$"];
  },
  $text8$: () => {
    lastMocks.assign({
      "$last-text8$": randomText(8),
    });
    return lastMocks.val["$last-text8$"];
  },
  $text9$: () => {
    lastMocks.assign({
      "$last-text9$": randomText(9),
    });
    return lastMocks.val["$last-text9$"];
  },
  $id$: () => {
    lastMocks.assign({
      "$last-id$": v4(),
    });
    return lastMocks.val["$last-id$"];
  },
  $random10$: () => {
    lastMocks.assign({
      "$last-random10$": randomNum(10) + "",
    });
    return lastMocks.val["$last-raondom10$"];
  },
  $random100$: () => {
    lastMocks.assign({
      "$last-random100$": randomNum(100) + "",
    });
    return lastMocks.val["$last-random100$"];
  },
  $random1000$: () => {
    lastMocks.assign({
      "$last-random1000$": randomNum(1000) + "",
    });
    return lastMocks.val["$last-random1000$"];
  },
  $random10000$: () => {
    lastMocks.assign({
      "$last-random10000$": randomNum(10000) + "",
    });
    return lastMocks.val["$last-random10000$"];
  },
  $random100000$: () => {
    lastMocks.assign({
      "$last-random100000$": randomNum(100000) + "",
    });
    return lastMocks.val["$last-random100000$"];
  },
  $random1000000: () => {
    lastMocks.assign({
      "$last-random1000000$": randomNum(1000000) + "",
    });
    return lastMocks.val["$last-random1000000$"];
  },
  $code1$: () => {
    lastMocks.assign({
      "$last-code1$": randomCode(1) + "",
    });
    return lastMocks.val["$last-code1$"];
  },
  $code2$: () => {
    lastMocks.assign({
      "$last-code2$": randomCode(2) + "",
    });
    return lastMocks.val["$last-code2$"];
  },
  $code3$: () => {
    lastMocks.assign({
      "$last-code3$": randomCode(3) + "",
    });
    return lastMocks.val["$last-code3$"];
  },
  $code4$: () => {
    lastMocks.assign({
      "$last-code4$": randomCode(4) + "",
    });
    return lastMocks.val["$last-code4$"];
  },
  $code5$: () => {
    lastMocks.assign({
      "$last-code5$": randomCode(5) + "",
    });
    return lastMocks.val["$last-code5$"];
  },
  $code6$: () => {
    lastMocks.assign({
      "$last-code6$": randomCode(6) + "",
    });
    return lastMocks.val["$last-code6$"];
  },
  $code7$: () => {
    lastMocks.assign({
      "$last-code7$": randomCode(7) + "",
    });
    return lastMocks.val["$last-code7$"];
  },
  $code8$: () => {
    lastMocks.assign({
      "$last-code8$": randomCode(8) + "",
    });
    return lastMocks.val["$last-code8$"];
  },
  $code9$: () => {
    lastMocks.assign({
      "$last-code9$": randomCode(9) + "",
    });
    return lastMocks.val["$last-code9$"];
  },
};
