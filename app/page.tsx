
import './globals.css';
import { readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'data', 'artigos.json');
  const data = await readFile(filePath, 'utf-8');
  const artigos = JSON.parse(data);

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {artigos.map((artigo: any) => (
          <li key={artigo.id}>
            <Link href={`/artigos/${slugify(artigo.titulo)}`}>
              {artigo.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}