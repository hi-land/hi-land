/*
 * Copyright 2024 Recoco
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tslint from "typescript-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ["node_modules", "build", ".docusaurus", "static"],
  },

  // Language Support

  eslint.configs.recommended,
  ...tslint.configs.recommendedTypeChecked,
  ...tslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["*.@(js|mjs|cjs)"],
    ...tslint.configs.disableTypeChecked,
  },

  {
    files: ["src/**/*.@(ts|tsx)"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["*.config.@(ts|js)"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Code Quality

  unicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/prefer-module": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },

  ...compat.extends("plugin:sonarjs/recommended"),

  // Practices

  ...compat.extends("plugin:@docusaurus/all"),
  reactRecommended,
  jsxRuntime,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("plugin:jsx-a11y/recommended"),

  {
    plugins: {
      reactRefresh,
    },

    rules: {
      "reactRefresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Code Style

  prettier,
  ...compat.extends("plugin:tailwindcss/recommended"),

  {
    plugins: {
      onlyWarn,
      simpleImportSort,
    },

    rules: {
      "tailwindcss/no-custom-classname": "off",
      "simpleImportSort/imports": "warn",
      "simpleImportSort/exports": "warn",
    },
  },
];
