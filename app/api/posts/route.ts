import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const NEWS_DIR = path.join(process.cwd(), 'content/news');

export async function GET() {
  if (!fs.existsSync(NEWS_DIR)) {
    return Response.json({ posts: [] });
  }

  const files = fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.mdx') && f !== 'template.mdx');

  const posts = files.map((filename) => {
    const filePath = path.join(NEWS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = filename.replace('.mdx', '');
    const stats = readingTime(content);
    return {
      slug,
      frontmatter: data,
      readingTime: stats.text,
      rawContent: raw,
    };
  });

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date as string).getTime() -
      new Date(a.frontmatter.date as string).getTime()
  );

  return Response.json({ posts });
}
