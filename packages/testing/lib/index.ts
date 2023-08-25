/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMount } from "solid-js";

type Testing = (testing: typeof import("@testing-library/dom") & typeof import("@testing-library/user-event")) => any;

let lib: any;

// 在开发环境下进行 e2e 测试
export const onTesting = async (fn: Testing) => {
  if ((import.meta as any).env.DEV) {
    onMount(async () => {
      if (!lib) {
        const testing = await import("@testing-library/dom");
        const userEvent = await import("@testing-library/user-event");
        lib = { ...testing, ...userEvent };
      }
      try {
        await fn(lib);
      } catch (err: any) {
        const error = Error(err.toString().split("\n")[0], { cause: err });
        console.error(error);
        if (onTesting.options.onError) {
          onTesting.options.onError(error);
        }
      }
    });
  }
};

onTesting.options = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError: (err: Error) => {},
};
