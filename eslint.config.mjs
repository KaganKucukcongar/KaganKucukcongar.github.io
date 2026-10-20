import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";

export default defineConfig([
  { ...js.configs.recommended, files: ["**/*.ts", "**/*.tsx"] },
  ...ts.configs.recommended,
  {
    files: ["src/**/*.tsx"],
    plugins: { "react-hooks": hooks },
    rules: { ...hooks.configs.recommended.rules },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
