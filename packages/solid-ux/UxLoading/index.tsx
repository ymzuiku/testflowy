import { Component, JSX, Match, Switch } from "solid-js";

export const LoadingSvg: Component<JSX.HTMLAttributes<HTMLDivElement>> = (p) => {
  return <div innerHTML={svg} {...p}></div>;
};

const svg = `<svg width="100%" height="100%" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g></svg>`;

interface UxLoadingProps {
  loading?: boolean;
}

export const UxLoading: Component<JSX.HTMLAttributes<HTMLElement> & UxLoadingProps> = (p) => {
  return (
    <Switch>
      <Match when={p.loading}>
        <LoadingSvg
          class={p.class}
          style={{
            width: "1.5em",
            height: "1.5em",
            color: "var(--ux-gray-50)",
            margin: "0 auto",
            ...(p.style as JSX.CSSProperties),
          }}
        />
      </Match>
      <Match when={true}>{p.children}</Match>
    </Switch>
  );
};
