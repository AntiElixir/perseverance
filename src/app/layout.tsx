import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { AppProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'FocusFlow | 标签化智能专注计时',
  description: '面向大学生的标签化智能专注计时应用',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}