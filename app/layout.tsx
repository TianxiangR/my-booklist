
import './globals.css';
import '@radix-ui/themes/styles.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import React from 'react';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';


const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'My Bookstore',
  description: 'A simple book list app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
