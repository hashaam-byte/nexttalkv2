import type { Metadata } from "next";
import { GeistMono } from 'geist/font/mono';
import { headers } from 'next/headers';
import Providers from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextTalkWeb - Real-Time Media Messaging App',
  description: 'A full-stack, real-time, media-rich messaging app inspired by WhatsApp, Snapchat, and TikTok.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const deviceType = headersList.get('x-device-type');

  return (
    <html lang="en" data-device={deviceType} className={`${GeistMono.className}`}>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
