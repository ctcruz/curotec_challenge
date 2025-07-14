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
      override: {
        mutator: "mutator/custom-client.ts",
        query: {
          useQuery: true,
          useInfinite: true,
          options: {
            retry: 3,
          },
          signal: true,
        },
      },
    },
    input: {
      target: "http://127.0.0.1:3000/api-json",
    },
  },
});
