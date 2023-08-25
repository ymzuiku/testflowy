import { JSX } from "solid-js/jsx-runtime";

const baseInput = {
  background: "transparent",
  padding: "1em",
  height: "3.5em",
  "font-size": "inherit",
  "border-radius": "0.25em",
  "box-sizing": "border-box",
  appearance: "none",
} as JSX.CSSProperties;

const baseButton = {
  border: "none",
  padding: "0 1em",
  height: "3.5em",
  "font-size": "inherit",
  "border-radius": "0.25em",
  "box-sizing": "border-box",
  cursor: "pointer",
  outline: "none",
} as JSX.CSSProperties;

export const css = {
  // pageBg: `w-full h-full bg-gray-50 text-gray-900 overflow-y-auto overflow-x-hidden`,
  pageBg: {
    width: "100%",
    height: "100%",
    background: "var(--ux-gray-50)",
    color: "var(--ux-gray-900)",
    "overflow-y": "auto",
    "overflow-x": "hidden",
  } as JSX.CSSProperties,
  // menuBg: `w-full h-full overflow-y-auto overflow-x-hidden`,
  menuBg: {
    width: "100%",
    height: "100%",
    "overflow-x": "hidden",
  } as JSX.CSSProperties,
  // input: `p-4 h-14 bg-gray-200 placeholder-gray-500 rounded focus-within:outline-none box-border focus-within:bg-gray-300 focus-within:ring-4 ring-gray-400 appearance-none`,
  input: {
    ...baseInput,
    background: "var(--ux-gray-200)",
  } as JSX.CSSProperties,
  inputFocus: {
    outline: "none",
    background: "var(--ux-gray-300)",
    "box-shadow": "0 0 0 4px var(--ux-gray-400)",
  } as JSX.CSSProperties,
  // inputOutline: `border-1 p-4 h-14 box-border border-solid border-gray-300 focus-within:border-pink-400 rounded  appearance-none`,
  inputOutline: {
    ...baseInput,
    border: "1px solid var(--ux-gray-300)",
  } as JSX.CSSProperties,
  inputOutlineFocus: {
    border: "1px solid var(--ux-primary-400)",
  } as JSX.CSSProperties,
  // button: `border-none py-4 h-14 px-5 bg-pink-600 text-white rounded focus-within:outline-none box-border active:opacity-60 sm:cursor-pointer`,
  button: {
    ...baseButton,
    background: "var(--ux-primary-400)",
    // border: "1px solid var(--ux-primary-400)",
    color: "var(--ux-white)",
  } as JSX.CSSProperties,
  buttonActive: {
    opacity: 0.6,
  } as JSX.CSSProperties,
  // buttonWhite: `border-none h-14 py-4 px-5 bg-white text-pink-500 rounded focus-within:outline-none box-border active:opacity-60 sm:cursor-pointer`,
  buttonWhite: {
    ...baseButton,
    background: "var(--ux-black)",
    color: "var(--ux-primary-500)",
  } as JSX.CSSProperties,
  // buttonWeak: `border-none py-4 h-14 px-5 bg-pink-700 text-white rounded focus-within:outline-none box-border active:opacity-60 sm:cursor-pointer`,
  buttonWeak: {
    ...baseButton,
    background: "var(--primary-700)",
    color: "var(--ux-primary-500)",
  } as JSX.CSSProperties,
  // buttonOutline: `sm:hover:opacity-70 h-14 active:opacity-50 py-4 px-5 bg-[rgba(0,0,0,0)] text-pink-600 rounded focus-within:outline-none box-border active:opacity-60 border-solid border-1 border-pink-500 sm:cursor-pointer`,
  buttonOutline: {
    ...baseButton,
    background: "transparent",
    color: "var(--ux-primary-500)",
    border: "1px solid var(--ux-primary-500)",
  } as JSX.CSSProperties,
  // buttonWhiteOutline: `sm:hover:opacity-80 h-14 py-4 px-5 bg-[rgba(0,0,0,0)] text-white rounded focus-within:outline-none box-border active:opacity-60 border-solid border-1 border-white sm:cursor-pointer`,
  buttonWhiteOutline: {
    ...baseButton,
    background: "transparent",
    color: "var(--ux-black)",
    border: "1px solid var(--ux-black)",
  } as JSX.CSSProperties,
  // buttonText: `border-none m-0 p-0 outline-none bg-[rgba(0,0,0,0)] text-pink-600 sm:cursor-pointer rounded focus-within:outline-none box-border active:opacity-60`,
  buttonText: {
    ...baseButton,
    background: "transparent",
    color: "var(--ux-primary-600)",
  } as JSX.CSSProperties,
};
