import { shGet, shRun } from "../utils/shell.js";

export function isGitRepo() {
  try {
    return shGet("git rev-parse --is-inside-work-tree") === "true";
  } catch {
    return false;
  }
}

export function getCurrentBranch() {
  return shGet("git branch --show-current");
}

export function getRemoteUrl() {
  return shGet("git config --get remote.origin.url");
}

export function getStagedDiff() {
  return shGet("git diff --cached");
}

export function getRecentCommits(limit = 20) {
  return shGet(`git log --oneline -n ${limit}`);
}

export function getLastTag() {
  try {
    return shGet("git describe --tags --abbrev=0");
  } catch {
    return "";
  }
}

export function getCommitsSinceTag(tag) {
  if (!tag) return getRecentCommits(20);
  return shGet(`git log ${tag}..HEAD --oneline`);
}

export function stageAll() {
  shRun("git add .");
}

export function commit(message) {
  shRun(`git commit -m "${message.replace(/"/g, '\\"')}"`);
}

export function createTag(tag) {
  shRun(`git tag -a ${tag} -m "${tag}"`);
}

export function pushBranch() {
  shRun("git push");
}

export function pushWithTags() {
  shRun("git push && git push --tags");
}