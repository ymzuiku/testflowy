const fontSize = {
  h1: "var(--ux-text-md)",
  h2: "var(--ux-text-base)",
  h3: "var(--ux-text-sm)",
} as Record<string, string>;

const marginLeft = {
  h1: "0",
  h2: "0.5em",
  h3: "1em",
} as Record<string, string>;

export const Subtitle = (p: { kind: string; html?: string }) => {
  if (p.kind.indexOf("h") !== 0) {
    return void 0;
  }

  return (
    <div
      style={{
        margin: "1em 0 0 0",
        color: "var(--ux-gray-500)",
        cursor: "pointer",
        "font-size": fontSize[p.kind],
        "margin-left": marginLeft[p.kind],
      }}
      onclick={() => {
        const ele = document.getElementById(p.kind + p.html);

        if (ele) {
          ele.scrollIntoView({
            behavior: "smooth",
          });
        }
      }}
    >
      {p.html || "Noting..."}
    </div>
  );
};
