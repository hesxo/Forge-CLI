export function normalizeRemoteUrl(remoteUrl) {
    return remoteUrl
      .replace(/^ssh:\/\/git@/, "https://")
      .replace(/^git@/, "https://")
      .replace(":", "/")
      .replace(/\.git$/, "");
  }
  
  export function detectGitProvider(remoteUrl) {
    const url = normalizeRemoteUrl(remoteUrl);
  
    if (url.includes("github.com")) return { type: "github", url };
    if (url.includes("bitbucket.org")) return { type: "bitbucket", url };
    if (url.includes("gitlab.com")) return { type: "gitlab", url };
  
    return { type: "unknown", url };
  }