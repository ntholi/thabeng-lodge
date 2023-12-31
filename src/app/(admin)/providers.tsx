'use client';
import { MantineProvider, createTheme } from '@mantine/core';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    breakpoints: {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1538px',
    },
  });

  return (
    <MantineProvider defaultColorScheme='auto' theme={theme}>
      <ModalsProvider>
        <Notifications />
        {children}
        <ProgressBar
          height='3px'
          color='#2196F3'
          options={{ showSpinner: false }}
          shallowRouting
        />
      </ModalsProvider>
    </MantineProvider>
  );
}
