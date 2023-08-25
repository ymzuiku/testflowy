import { changePwd } from "./_changePwd";
import { sendChangePwdEmail } from "./_sendChangePwdEmail";

changePwd.POST = true;
sendChangePwdEmail.POST = true;

export { changePwd, sendChangePwdEmail };
