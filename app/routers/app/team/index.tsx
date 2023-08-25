import { isAgent } from "../../appStorage";
import { TeamAgent } from "./TeamAgent";
import { TeamOwner } from "./TeamOwner";

const Team = () => {
  if (isAgent()) {
    return <TeamAgent />;
  }
  return <TeamOwner />;
};

export default Team;
