import { register } from "./_register";
import { sendRegisterEmail } from "./_sendRegisterEmail";

register.POST = true;
sendRegisterEmail.POST = true;

export { register, sendRegisterEmail };
