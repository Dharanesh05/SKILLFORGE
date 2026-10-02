import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LearningProvider } from '@/context/LearningContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SKILLFORGE — Master Engineering & Tech Skills',
  description: 'Learn modern web development, cloud computing, AI, and cybersecurity through hands-on courses and interactive challenges.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F8FAF9] text-[#17251D] flex flex-col min-h-screen selection:bg-[#15803D] selection:text-white antialiased`}>
        <LearningProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LearningProvider>
      </body>
    </html>
  );
}
