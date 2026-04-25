import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingOverlay from '../components/LoadingOverlay';
import configData from '../data/config.json';
import { getAllActiveMembers } from '../utils/dataLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: configData.siteTitle,
  description: configData.siteDescription,
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning is needed to prevent warning from next-themes/custom theme script on html element
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
        <LoadingOverlay />
        <Navbar />
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
