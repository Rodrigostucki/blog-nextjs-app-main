import { readFile } from 'fs/promises';
import path from 'path';
import { slugify } from '@/lib/slugify';

type Artigo = {
  id: string;
  titulo: string;
  autor: string;
  data: string;
  conteudo: string;
};

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'artigos.json');
  const data = await readFile(filePath, 'utf-8');
  const artigos: Artigo[] = JSON.parse(data);

  return artigos.map((artigo) => ({ slug: slugify(artigo.titulo) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'artigos.json');
  const data = await readFile(filePath, 'utf-8');
  const artigos: Artigo[] = JSON.parse(data);

  const artigo = artigos.find((a) => slugify(a.titulo) === slug);

  return {
    title: artigo?.titulo || 'Artigo',
    description: artigo?.conteudo.slice(0, 100) || 'Conteúdo do artigo',
  };
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'artigos.json');
  const data = await readFile(filePath, 'utf-8');
  const artigos: Artigo[] = JSON.parse(data);

  const artigo = artigos.find((a) => slugify(a.titulo) === slug);

  if (!artigo) return <div>Artigo não encontrado.</div>;

  return (
    <article>
      <h1>{artigo.titulo}</h1>
      <p>Por {artigo.autor} em {new Date(artigo.data).toLocaleDateString()}</p>
      <div>{artigo.conteudo}</div>
    </article>
  );
}