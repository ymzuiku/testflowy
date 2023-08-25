import { logout } from "../../appStorage";
import { MenuLayout } from "../MenuLayout";

export default function Team() {
  return (
    <MenuLayout>
      <button onclick={logout}>report</button>
    </MenuLayout>
  );
}
