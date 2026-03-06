import { detectGitProvider } from "./shared.js";
import { githubProvider } from "./github.js";
import { bitbucketProvider } from "./bitbucket.js";
import { gitlabProvider } from "./gitlab.js";

export function getProvider(remoteUrl) {
  const detected = detectGitProvider(remoteUrl);

  if (detected.type === "github") return githubProvider(detected.url);
  if (detected.type === "bitbucket") return bitbucketProvider(detected.url);
  if (detected.type === "gitlab") return gitlabProvider(detected.url);

  return null;
}