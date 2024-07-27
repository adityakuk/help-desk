import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "src/apis/graphql/*.graphql",
  generates: {
    "src/generated/": { preset: "client", plugins: [] },
  },
};

export default config;
