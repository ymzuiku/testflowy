import { createDraft } from "./_createDraft";
import { deleteDraft } from "./_deleteDraft";
import { getDraftDetail } from "./_getDraftDetail";
import { getDraftDetails } from "./_getDraftDetails";
import { getDrafts } from "./_getDrafts";
import { updateDarft } from "./_updateDraft";
import { updatePassDarft } from "./_updatePassDraft";

getDraftDetail.POST = true;
createDraft.POST = true;
updateDarft.PATCH = true;
deleteDraft.DELETE = true;
getDraftDetails.POST = true;
getDrafts.POST = true;
updatePassDarft.PATCH = true;

export { getDraftDetail, createDraft, updateDarft, deleteDraft, getDraftDetails, getDrafts, updatePassDarft };
