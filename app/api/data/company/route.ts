import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data/company.json');

export async function GET() {
  const raw = fs.readFileSync(FILE, 'utf-8');
  return Response.json(JSON.parse(raw));
}
