"use client";
import { Image, Stack, Title, Text, Button, Anchor } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { useRouter } from "next/navigation";
import { useSession } from "../appshell/SessionProvider";

export default function AccessDeniedPage() {
  const router = useRouter();
  const { user, status } = useSession();

  if (status == "unauthenticated") {
    router.push("/signin");
  }

  return (
    <Stack align="center" justify="center" h={"100vh"}>
      <div>
        <Image
          src="/images/access-denied.png"
          h={300}
          w="auto"
          fit="contain"
          alt="Access Denied"
        />
      </div>
      <Title>Access Denied</Title>
      <Text>
        You are logged in as {user?.displayName},{" "}
        <Anchor component="button" onClick={() => signOut(auth)}>
          Sign Out
        </Anchor>
      </Text>
      <Button component={Link} href={"/"} color="dark">
        Home Page
      </Button>
    </Stack>
  );
}
