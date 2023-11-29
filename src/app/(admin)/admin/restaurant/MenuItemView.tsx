import {
  Card,
  Title,
  Text,
  Divider,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
  item: MenuItem;
};

export default function MenuItemView({ item }: Props) {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete {`'${item.name}'`}?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await deleteDoc(doc(db, "press", item.id));
      },
    });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack justify="space-between" h="100%">
        <div>
          <Title order={4}> {item.name}</Title>
          <Divider color="gray" mt="xs" mb="lg" />
          <Text>{item.description}</Text>
        </div>
        <Group grow mt="xl">
          <Button
            variant="outline"
            color="dark"
            size="xs"
            component={Link}
            href={`/admin/press/${item.id}`}
            leftSection={
              <IconPencil color="gray" size="0.9rem" aria-label="edit" />
            }
          >
            Edit
          </Button>
          <Button
            variant="outline"
            color="red"
            size="xs"
            leftSection={<IconTrashXFilled size="0.9rem" />}
            onClick={openDeleteModal}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
