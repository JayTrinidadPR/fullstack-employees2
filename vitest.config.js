import { loadEnvFile } from "node:process";
import { defineConfig } from "vitest/config";

function getTestEnv() {
  try {
    return loadEnvFile();
  } catch (error) {
    if (error?.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

export default defineConfig(() => ({
  test: { env: getTestEnv() },
}));
