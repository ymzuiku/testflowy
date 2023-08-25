import { JSX } from "solid-js";
import { Portal, render } from "solid-js/web";

// eslint-disable-next-line
export const renderPromise = (Component: (p: { done: (ok: boolean) => void }) => JSX.Element) => {
  // eslint-disable-next-line
  return (props: any) => {
    return new Promise<boolean>((res) => {
      render(
        () => (
          <Portal>
            <Component {...props} done={res} />
          </Portal>
        ),
        document.body,
      );
    });
  };
};
