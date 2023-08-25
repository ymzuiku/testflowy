import { orm } from "pgx";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tables } from "../../../../serve/tables";
import { tddRegisterAndInvitation } from "../../../login/invitation/_registerAndInvitation.test";
import { leaveTeam } from "./+serve";

it("leave team", async () => {
  const [, agent] = await tddRegisterAndInvitation();
  const [res, err] = await zodTry(() => {
    return leaveTeam({
      auth: {
        plant: agent.plant as "pc",
        uid: agent.uid,
        token: agent.token,
      },
    });
  });
  expect(err).eq(void 0);
  expect(res!.ok).eq(1);
  const user = await orm.readOne({
    table: tables.account,
    id: agent.uid,
  });
  expect(user.id).eq(agent.uid);
  expect(user.owner).eq("");
  expect(user.agent).eq("");
});
