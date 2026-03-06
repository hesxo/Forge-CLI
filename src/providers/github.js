export function githubProvider(repoUrl) {
    return {
      name: "github",
      repoUrl,
      getPrUrl(source, target) {
        const q = target ? `?quick_pull=1&base=${encodeURIComponent(target)}` : "";
        return `${repoUrl}/compare/${encodeURIComponent(target || "main")}...${encodeURIComponent(source)}${q}`;
      }
    };
  }