import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
const path = require("path");
const fs = require("fs");

import pkg from "./package.json";

const extensions = [".ts"];
const noDeclarationFiles = { compilerOptions: { declaration: false } };

const babelRuntimeVersion = pkg.dependencies["@babel/runtime"].replace(
  /^[^0-9]*/,
  ""
);


function exportLib(input, output) {
  // CommonJS
  return [
    {
      input,
      output: {
        file: output + "dist/lib/index.js",
        format: "cjs",
        indent: false,
      },
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ useTsconfigDeclarationDir: true }),
        babel({
          extensions,
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              { version: babelRuntimeVersion },
            ],
          ],
          babelHelpers: "runtime",
        }),
      ],
    },
    // ES
    {
      input,
      output: {
        file: output + "dist/es/index.js",
        format: "es",
        indent: false,
      },
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ tsconfigOverride: noDeclarationFiles }),
        babel({
          extensions,
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              { version: babelRuntimeVersion, useESModules: true },
            ],
          ],
          babelHelpers: "runtime",
        }),
      ],
    },
    // ES for Browsers
    {
      input,
      output: {
        file: output + "dist/es/index.mjs",
        format: "es",
        indent: false,
      },
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ tsconfigOverride: noDeclarationFiles }),
        babel({
          extensions,
          exclude: "node_modules/**",
          skipPreflightCheck: true,
          babelHelpers: "bundled",
        }),
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        }),
      ],
    },
    // UMD Development
    {
      input,
      output: {
        file: output + "dist/dist/index.js",
        format: "umd",
        name: "Performance spy",
        indent: false,
      },
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ tsconfigOverride: noDeclarationFiles }),
        babel({
          extensions,
          exclude: "node_modules/**",
          babelHelpers: "bundled",
        }),
      ],
    },
    // UMD Production
    {
      input,
      output: {
        file: output + "dist/dist/index.min.js",
        format: "umd",
        name: "Performance spy",
        indent: false,
      },
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ tsconfigOverride: noDeclarationFiles }),
        babel({
          extensions,
          exclude: "node_modules/**",
          skipPreflightCheck: true,
          babelHelpers: "bundled",
        }),
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        }),
      ],
    },
  ];
}

const resolverPath = path.resolve("./src/resolver");
const resolvers = fs.readdirSync(resolverPath).map((p) => path.parse(p).name);

let resolversExports = [];
for (const resolver of resolvers) {
  const input = path.join(resolverPath, `${resolver}.ts`);
  const output = `resolver/${resolver}`;
  console.log(input, output);
  resolversExports.push(...exportLib(input, output+"/"));
}
export default [
    ...exportLib("src/index.ts", ""),
    ...resolversExports
];
