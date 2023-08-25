import { i18nLocal } from "i18n-less-translate";
import { Component, JSX } from "solid-js";
import { UxNativeSelect } from "../UxNativeSelect";

const optinos: { value: string; label: string }[] = [];
Object.keys(i18nLocal.languagesText).forEach((k) => {
  optinos.push({ value: k, label: i18nLocal.languagesText[k] });
});
export const UxI18nPick: Component<
  Omit<JSX.HTMLAttributes<HTMLSelectElement>, "children"> & { onChange?: (value: string) => void }
> = (p) => {
  return (
    <UxNativeSelect
      value={i18nLocal.getLanguage()}
      onchange={(e) => {
        if (p.onChange) {
          p.onChange(e.currentTarget.value);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18nLocal.setNowLanguage(e.currentTarget.value as any);
        requestAnimationFrame(() => {
          location.reload();
        });
      }}
      each={optinos}
      {...p}
    ></UxNativeSelect>
  );
};
