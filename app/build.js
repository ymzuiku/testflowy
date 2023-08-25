const { createHmac } = require("node:crypto");

function sha256(str) {
  if (!sha256.slat) {
    sha256.slat = process.env["slat"] || "";
  }
  return createHmac("sha256", sha256.slat).update(str).digest("hex");
}

sha256.slat = "";

const fs = require("fs-extra");
const isProd = process.env.NODE_ENV === "production";
const buildCrypto = async (file) => {
  // var JavaScriptObfuscator = require("javascript-obfuscator");
  const code = require("fs").readFileSync(file).toString();

  const obfuscatorRes = require("javascript-obfuscator").obfuscate(code, {
    compact: true,
    target: "node",
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: "mangled-shuffled",
    log: false,
    // transformObjectKeys: true,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    // exclude: depend.map((v) => `require("${v}")`).concat(depend),
    // splitStrings: true,
    // splitStringsChunkLength: 7,
    ignoreImports: true,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: "variable",
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  });
  const obf = obfuscatorRes.getObfuscatedCode();
  require("fs").writeFileSync(file, obf);
};

function build() {
  require("esbuild")
    .build({
      external: ["react"],
      entryPoints: ["./sdk/index.tsx"],
      bundle: true,
      // splitting: true,
      format: "iife",
      platform: "browser",
      outfile: "public/sdk/index.js",
      minify: isProd,
      loader: {
        ".svg": "dataurl",
      },
      logLevel: "info",
      watch: !isProd,
      jsx: "preserve",
      jsxImportSource: "",
      // jsxDev: false,
      plugins: [require("esbuild-plugin-solid").solidPlugin({ dev: false, generate: "dom" })],
    })
    .catch(() => process.exit(1))
    .finally(() => {
      const js = fs.readFileSync("./public/sdk/index.js");
      const hash = sha256(js).substring(0, 9);
      fs.renameSync("./public/sdk/index.js", `./public/sdk/index_${hash}.js`);
      {
        let code = fs.readFileSync("./public/sdk.js").toString();
        code = code.replace(/sdk\/index(.*?)\.js/, `sdk/index_${hash}.js`);
        fs.writeFileSync("./public/sdk.js", code);
      }
      {
        let code = fs.readFileSync("./public/sdk_dev.js").toString();
        code = code.replace(/sdk\/index(.*?)\.js/, `sdk/index_${hash}.js`);
        fs.writeFileSync("./public/sdk_dev.js", code);
      }
      if (isProd) {
        fs.readdirSync("./public/sdk").forEach((file) => {
          if (/\.js/.test(file)) {
            buildCrypto("./public/sdk/" + file);
          }
        });
        console.log("crypto sdk");
      }
    });
}

if (fs.existsSync("./public/sdk")) {
  fs.emptyDir("./public/sdk", { force: true }).then(build);
} else {
  build();
}
