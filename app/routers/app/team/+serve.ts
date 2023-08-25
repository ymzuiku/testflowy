import { changeAgent } from "./_changeAgent";
import { deleteAgent } from "./_deleteAgent";
import { getTeamList } from "./_getTeamList";

getTeamList.POST = true;
changeAgent.PATCH = true;
deleteAgent.DELETE = true;
export { getTeamList, changeAgent, deleteAgent };
