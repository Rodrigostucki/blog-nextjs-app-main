
import './globals.css';

export const metadata = {
  title: "Blog com Next.js",
  description: "Aplicação de blog com rotas dinâmicas e SEO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}