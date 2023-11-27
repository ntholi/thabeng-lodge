// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import AppShell from './appshell/AppShell';

export const metadata = {
  title: 'THPPY Admin',
  description: 'THPPY Admin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AppShell>{children}</AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
