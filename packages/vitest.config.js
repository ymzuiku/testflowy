const { defineConfig } = require("vitest/config");
const solidPlugin = require("vite-plugin-solid");

module.exports = defineConfig({
  plugins: [
    solidPlugin({
      dev: true,
    }),
  ],
  build: {
    target: "esnext",
    polyfillModulePreload: false,
  },
  define: {
    "import.meta.vitest": "undefined",
  },
  test: {
    globals: true,
    environment: "happy-dom",
    // environment: "jsdom",
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    deps: {
      inline: [/solid-js/, /solid-testing-library/],
    },
  },
  resolve: {
    conditions: ["development"],
  },
});
