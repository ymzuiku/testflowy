import { randomCode } from "./randomCode";
import { randomText } from "./randomText";

export function randomEmail() {
  return `${randomText(6)}${randomCode(3)}@${randomText(6)}${randomCode(3)}.com`;
}
