const GITHUB_REPO = process.env.GITHUB_REPO ?? 'Simocolas/Cityroofing.ca';
const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}/contents`;

function githubHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN env variable is not set');
  return {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

async function getFileSha(filePath: string): Promise<string | null> {
  const res = await fetch(`${API_BASE}/${filePath}`, {
    headers: githubHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { sha: string };
  return data.sha;
}

export async function githubWriteFile(
  filePath: string,
  content: string,
  commitMessage: string,
): Promise<void> {
  const sha = await getFileSha(filePath);
  const body: Record<string, string> = {
    message: commitMessage,
    content: Buffer.from(content, 'utf-8').toString('base64'),
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API_BASE}/${filePath}`, {
    method: 'PUT',
    headers: githubHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${text}`);
  }
}

export async function githubDeleteFile(
  filePath: string,
  commitMessage: string,
): Promise<void> {
  const sha = await getFileSha(filePath);
  if (!sha) throw new Error(`File not found on GitHub: ${filePath}`);

  const res = await fetch(`${API_BASE}/${filePath}`, {
    method: 'DELETE',
    headers: githubHeaders(),
    body: JSON.stringify({ message: commitMessage, sha }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub delete failed (${res.status}): ${text}`);
  }
}
