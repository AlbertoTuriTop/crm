import 'bootstrap/dist/css/bootstrap.min.css';
import { Providers } from '@/components/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-light"><Providers>{children}</Providers></body>
    </html>
  );
}
