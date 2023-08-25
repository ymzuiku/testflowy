import { expect, it } from "vitest";
import { tddRegisterAndInvitation } from "../../login/invitation/_registerAndInvitation.test";
import { getTeamList } from "./+serve";

it("team load", async () => {
  const [account] = await tddRegisterAndInvitation();
  const res = await getTeamList({
    uid: account.uid,
    token: account.token,
    plant: account.plant as "pc",
    limit: 5,
    offset: 0,
  });

  res.data[0];

  expect(res.total).eq(2);
  expect(res.data[1].owner).eq(account.uid);
});
