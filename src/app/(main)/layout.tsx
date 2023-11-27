import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppNav from './core/AppNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Thabeng Lodge',
  description: 'Thabeng Lodge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppNav />
        {children}
      </body>
    </html>
  );
}
