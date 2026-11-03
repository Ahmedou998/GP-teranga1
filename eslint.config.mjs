import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
 baseDirectory: dirname(fileURLToPath(import.meta.url)),
});
export default [
 {
   ignores: [
     ".next/**",
     "**/.next/**",
     "node_modules/**",
     "**/node_modules/**",
     "coverage/**",
     "teranga-gp/**",
     "next-env.d.ts",
     "*.tsbuildinfo",
   ],
 },
 ...compat.extends(
   "next/core-web-vitals",
   "next/typescript"
 ),
 {
   rules: {
     "react/no-unescaped-entities": "off",
   },
 },
];
