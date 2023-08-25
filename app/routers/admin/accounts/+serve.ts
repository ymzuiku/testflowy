import { checkAdmin } from "./_checkAdmin";
import { getAccounts } from "./_getAccounts";

checkAdmin.POST = true;
getAccounts.POST = true;

export { checkAdmin, getAccounts };
