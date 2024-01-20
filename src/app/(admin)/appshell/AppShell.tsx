"use client";

import { useDisclosure } from "@mantine/hooks";
import {
  AppShell as MantineShell,
  Burger,
  Group,
  Skeleton,
  ScrollArea,
  NavLink,
  Flex,
  ActionIcon,
  useMantineColorScheme,
  Avatar,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { IconLogout2, IconMoon, IconSun, IconUser } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useSession } from "./SessionProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const { user, status } = useSession();
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  if (status == "loading") {
    return (
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <LoadingOverlay visible />
      </Flex>
    );
  } else if (status == "unauthenticated") {
    router.push("/signin");
    return null;
  }

  if (user?.role !== "admin") {
    router.push("/no-access");
    return null;
  }

  return (
    <MantineShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <MantineShell.Header>
        <Flex align="center" justify={"space-between"} p="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo />
          <ActionIcon variant="default" size="lg">
            {colorScheme === "dark" ? (
              <IconSun onClick={() => setColorScheme("light")} />
            ) : (
              <IconMoon onClick={() => setColorScheme("dark")} />
            )}
          </ActionIcon>
        </Flex>
      </MantineShell.Header>
      <MantineShell.Navbar p="md">
        <MantineShell.Section grow my="md" component={ScrollArea}>
          <Navbar />
        </MantineShell.Section>
        <MantineShell.Section>
          <Divider mb="md" />
          <UserButton />
        </MantineShell.Section>
      </MantineShell.Navbar>
      <MantineShell.Main>{children}</MantineShell.Main>
    </MantineShell>
  );
}

function UserButton() {
  const { user } = useSession();

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: "Confirm logout",
      children: "Are you sure you want to logout?",
      confirmProps: { color: "dark" },
      labels: { confirm: "Logout", cancel: "Cancel" },
      onConfirm: () => signOut(auth),
    });

  return (
    <NavLink
      label="Logout"
      description={user?.displayName || user?.email}
      onClick={openModal}
      leftSection={<Avatar src={user?.photoURL} />}
      rightSection={<IconLogout2 size="1.1rem" />}
    />
  );
}
