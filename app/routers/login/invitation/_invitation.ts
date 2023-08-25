import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { zodCode, zodEmail, zodUid } from "../../zod";
import { checkInvitationEmailCode, errEmailNotRegister } from "./_sendInvitationEmail";

const zodInvitation = z.object({
  email: zodEmail,
  code: zodCode,
  owner: zodUid,
  // agent: z.enum(["owner", "admin", "agent"]),
});

export type Invitation = z.infer<typeof zodInvitation>;

// 设置owner
export const invitation = zodVaild(zodInvitation, async (p: Invitation) => {
  await checkInvitationEmailCode({
    email: p.email,
    code: p.code,
    owner: p.owner,
  });

  delete (p as Record<string, unknown>)["code"];
  try {
    await orm.updateOne({
      table: tables.account,
      filter: {
        eq: {
          email: p.email,
        },
      },
      data: {
        owner: p.owner,
        agent: "agent",
      },
    });
  } catch (err) {
    throw errEmailNotRegister;
  }
  return success;
});
