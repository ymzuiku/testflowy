import legacy from "@vitejs/plugin-legacy";
import { spawn } from "child_process";
import globRouter from "glob-router";
import { networkInterfaces } from "os";
import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const port = 6011;
const isProd = process.env.NODE_ENV === "production";
function getIPAddress() {
  const interfaces = networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "127.0.0.1";
}

require("./build");

function spawnLog(str) {
  const [runner, ...rest] = str.split(" ");
  const ls = spawn(runner, rest);
  [ls.stdout, ls.stderr].forEach((fn) => {
    fn.on("data", (v) => {
      const t = String(v).trim();
      if (t !== "") {
        console.log(t);
      }
    });
  });
}

if (!isProd) {
  console.log(`testflowy-client: http://${getIPAddress()}:${port}`);
  globRouter(resolve(__dirname, "routers"), true);
  spawnLog("npm run dev:serve");
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port,
    host: "0.0.0.0",
    proxy: {
      "/v1": {
        target: "http://127.0.0.1:6010",
        changeOrigin: true,
      },
    },
  },
  base: "/",
  plugins: [
    solidPlugin({ dev: true }),
    isProd &&
      legacy({
        targets: ["defaults"],
        polyfills: [
          "es/array",
          "es/array-buffer",
          "es/object",
          "es/string",
          "es/number",
          "es/function",
          "es/map",
          "es/math",
          "es/set",
          "es/promise",
          "es/regexp",
          "es/weak-set",
          "es/weak-map",
          "es/date",
        ],
      }),
  ],
  build: {
    brotliSize: false,
    outDir: "dist",
    rollupOptions: {
      // input: {
      //   main: resolve(__dirname, "index.html"),
      //   sdk: resolve(__dirname, "sdk.html"),
      //   // example: resolve(__dirname, "example.html"),
      // },
      output: {
        chunkFileNames: isProd ? "g_[hash].js" : "[name]-[hash].js",
      },
    },
  },
  logLevel: "warn",
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
