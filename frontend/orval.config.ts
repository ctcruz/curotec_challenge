import { defineConfig } from "orval";

export default defineConfig({
  curotec: {
    output: {
      mode: "tags-split",
      clean: true,
      tslint: true,
      prettier: true,
      mock: true,
      workspace: "./src/api",
      target: "endpoints",
      schemas: "model",
      client: "react-query",
      tsconfig: "./tsconfig.json",
      packageJson: "./package.json",
    },
    input: {
      target: "http://127.0.0.1:3000/api-json",
    },
  },
});
