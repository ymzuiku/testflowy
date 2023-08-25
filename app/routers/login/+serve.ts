import { login } from "./_login";
import { checkToken } from "./_token";

login.POST = true;
checkToken.POST = true;

export { login, checkToken };
