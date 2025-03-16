import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ro-fish',
  description: 'Site pentru balta ta',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <NavBar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}