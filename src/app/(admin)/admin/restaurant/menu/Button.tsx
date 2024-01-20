import {
  Card,
  Title,
  Text,
  Divider,
  Group,
  Button,
  ActionIcon,
  Loader,
} from "@mantine/core";
import Link from "next/link";
import { IconPencil, IconPlus, IconTrashXFilled } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import React from "react";
import { type } from "os";

type Props = {
  onClick: () => void;
  isLoading?: boolean;
};

export default function NewPressButton({ onClick, isLoading }: Props) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader size="3rem" color="gray" />
      ) : (
        <IconPlus color="gray" size="3rem" />
      )}
      <Text c="dimmed" size="sm">
        New
      </Text>
    </Card>
  );
}
