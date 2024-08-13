import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../providers';
import Header from '@/app/ui/header/Header';
import Footer from '@/app/ui/Footer';

export const metadata: Metadata = {
  title: 'SoccerStat',
  description: 'Soccer stat informations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className="min-h-full">
      <body className="bg-[#f5f7fa] min-h-full">
        <Providers>
          <Header />
          <main className="bg-[#f5f7fa] flex justify-center min-h-lvh">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
