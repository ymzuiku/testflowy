import { invitation } from "./_invitation";
import { registerAndInvitation } from "./_registerAndInvitation";
import { sendInvitationEmail } from "./_sendInvitationEmail";

registerAndInvitation.POST = true;
invitation.POST = true;
sendInvitationEmail.POST = true;

export { registerAndInvitation, invitation, sendInvitationEmail };
