'use client';

import { useDisclosure } from '@mantine/hooks';
import {
  AppShell as MantineShell,
  Burger,
  Group,
  Skeleton,
  ScrollArea,
  NavLink,
} from '@mantine/core';
import Logo from './Logo';
import Navbar from './Navbar';
import { IconUser } from '@tabler/icons-react';

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <MantineShell.Header>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Logo />
        </Group>
      </MantineShell.Header>
      <MantineShell.Navbar p='md'>
        <MantineShell.Section grow my='md' component={ScrollArea}>
          <Navbar />
        </MantineShell.Section>
        <MantineShell.Section>
          <NavLink
            label='Logout'
            description='Thabo Lebese'
            leftSection={<IconUser size='1rem' stroke={1.5} />}
          />
        </MantineShell.Section>
      </MantineShell.Navbar>
      <MantineShell.Main>{children}</MantineShell.Main>
    </MantineShell>
  );
}
