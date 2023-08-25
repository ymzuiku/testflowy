import { createMediaQuery } from "@solid-primitives/media";
const sm = createMediaQuery("(min-width:640px)");
export const createMediaQuerySm = () => {
  return sm;
};
