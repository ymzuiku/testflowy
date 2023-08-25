import { checkLicene } from "./_checkLicense";
import { deleteLicenseUse } from "./_deleteLicenseUse";
import { getAgentLicense } from "./_getAgentLicense";
import { getLicense } from "./_getLicense";
import { setLicenseUse } from "./_setLicenseUse";

getLicense.POST = true;
setLicenseUse.POST = true;
deleteLicenseUse.PATCH = true;
checkLicene.POST = true;
getAgentLicense.POST = true;

export { getLicense, setLicenseUse, deleteLicenseUse, checkLicene, getAgentLicense };
