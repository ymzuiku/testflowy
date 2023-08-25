import { randomNum } from "./randomNum";

export const seedTexts = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const l = seedTexts.length - 1;

export function randomText(len: number) {
  let a = "";
  for (let i = 0; i < len; i++) {
    a += seedTexts[randomNum(l)];
  }
  return a;
}
