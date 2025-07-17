import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SettingsProvider } from '@/providers/settings-provider';
import { TooltipsProvider } from '@/providers/tooltips-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/css/styles.css';
import '@/components/keenicons/assets/styles.css';
import { Metadata } from 'next';
import { ModulesProvider } from '@/providers/modules-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ReduxProvider } from '@/providers/redux-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'Revsites',
    default: 'Welcome to Revsites!', // a default is required when creating a template
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased flex h-full text-base text-foreground bg-background',
          inter.className,
        )}
      >
        <ReduxProvider>
          <SettingsProvider>
            <ThemeProvider>
              <TooltipsProvider>
                <ModulesProvider>
                  <Suspense>{children}</Suspense>
                  <Toaster />
                </ModulesProvider>
              </TooltipsProvider>
            </ThemeProvider>
          </SettingsProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
