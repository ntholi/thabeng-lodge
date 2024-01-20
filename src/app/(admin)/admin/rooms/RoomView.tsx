import { Card, Text, Group, Button, Image, Badge } from "@mantine/core";
import Link from "next/link";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import { formatMoney } from "@/lib/utils";

type Props = {
  item: Room;
};

export default function RoomView({ item }: Props) {
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
        await deleteDoc(doc(db, "rooms", item.id));
      },
    });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={item.image} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.name}</Text>
        <Badge color="green" variant="light">
          {formatMoney(item.price)}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {item.description}
      </Text>

      <Group grow mt="xl">
        <Button
          variant="outline"
          color="dark"
          size="xs"
          component={Link}
          href={`/admin/rooms/${item.id}`}
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
    </Card>
  );
}
