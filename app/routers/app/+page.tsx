import { appMenu } from "../../sdk/record/data";
import BatteryCard from "./batteryCard";
import Licenes from "./license";
import { MenuLayout } from "./MenuLayout";
import Setting from "./setting";
import Team from "./team";
import Testing from "./testing";

export default function App() {
  return (
    <MenuLayout>
      {appMenu() === "testing" && <Testing />}
      {appMenu() === "team" && <Team />}
      {appMenu() === "license" && <Licenes />}
      {appMenu() === "setting" && <Setting />}
      {appMenu() === "battery" && <BatteryCard />}
    </MenuLayout>
  );
}
