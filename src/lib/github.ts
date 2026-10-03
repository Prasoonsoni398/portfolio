export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

export async function fetchGitHubUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter((repo: GitHubRepo) => !repo.fork)
      .slice(0, 6);
  } catch (error) {
    console.warn("GitHub API could not be reached, using cached/fallback representations.", error);
    return [];
  }
}
