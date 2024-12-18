import type { Metadata } from 'next';
import './globals.css';
import { CssBaseline } from '@mui/material';
import { ClientProvider } from '@/components';

export const metadata: Metadata = {
  title: 'ToDo List',
  description: 'ToDo приложение',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <CssBaseline />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
