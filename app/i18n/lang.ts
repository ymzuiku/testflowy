import { appLang } from "./appLang";
import { docLang } from "./docLang";
import { homeLang } from "./homeLang";
import { loginLang } from "./loginLang";
import { payLang } from "./payLang";
import { sdkLang } from "./sdkLang";

export default {
  ...homeLang,
  ...loginLang,
  ...sdkLang,
  ...appLang,
  ...payLang,
  ...docLang,
  WebTitle: {
    zh: "某系统",
    en: "One OS",
  },
};
