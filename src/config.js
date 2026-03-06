import fs from "fs";
import os from "os";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const HOME = os.homedir();
const CONFIG_DIR = path.join(HOME, ".forge-cli");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

function loadConfigFile() {
  if (!fs.existsSync(CONFIG_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    return {};
  }
}

function saveConfigFile(data) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
}

const stored = loadConfigFile();

export let OPENAI_API_KEY = process.env.OPENAI_API_KEY || stored.OPENAI_API_KEY || "";
export let RELEASE_LOG_WEBHOOK = process.env.RELEASE_LOG_WEBHOOK || stored.RELEASE_LOG_WEBHOOK || "";
export let DEFAULT_TARGET_BRANCH = process.env.DEFAULT_TARGET_BRANCH || stored.DEFAULT_TARGET_BRANCH || "main";

export function updateConfig(key, value) {
  const current = loadConfigFile();
  const next = { ...current, [key]: value };
  saveConfigFile(next);

  if (key === "OPENAI_API_KEY") OPENAI_API_KEY = value;
  if (key === "RELEASE_LOG_WEBHOOK") RELEASE_LOG_WEBHOOK = value;
  if (key === "DEFAULT_TARGET_BRANCH") DEFAULT_TARGET_BRANCH = value;
}

export function getConfig() {
  return loadConfigFile();
}