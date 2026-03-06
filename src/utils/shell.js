import { execSync } from "child_process";

export function shRun(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

export function shGet(cmd) {
  return execSync(cmd, { stdio: ["pipe", "pipe", "pipe"] }).toString().trim();
}