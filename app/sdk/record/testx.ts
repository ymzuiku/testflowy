import * as _testing from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

export const testx = {
  ..._testing,
  ...userEvent,
};
testx.setup({
  applyAccept: false,
});

// (window as any).__testx = testx;
