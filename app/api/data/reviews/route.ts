import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data/reviews.json');

export async function GET() {
  const raw = fs.readFileSync(FILE, 'utf-8');
  return Response.json(JSON.parse(raw));
}
