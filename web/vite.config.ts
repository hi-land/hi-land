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

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
import styleX from "vite-plugin-stylex";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),

    createHtmlPlugin({
      entry: "src/app.tsx",
    }),
    styleX(),

    TanStackRouterVite(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
