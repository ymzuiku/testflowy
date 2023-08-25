import { randomNum } from "./randomNum";
import { seedTexts } from "./randomText";

const seedNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ...seedTexts];
const l = seedNum.length - 1;

export function randomString(len: number) {
  let a = seedTexts[randomNum(seedTexts.length - 1)];
  for (let i = 1; i < len; i++) {
    a += seedNum[randomNum(l)];
  }
  return a;
}
