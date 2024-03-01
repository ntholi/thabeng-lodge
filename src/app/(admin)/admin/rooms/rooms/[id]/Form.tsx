"use client";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  NumberInput,
  Paper,
  Stack,
  Table,
  TextInput,
  Textarea,
  Title,
  Text,
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { FormEvent, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconTrashFilled } from "@tabler/icons-react";
import ImagePicker from "@/app/(admin)/core/ImagePicker";
import { Room, RoomFeature } from "../../model";

type Props = {
  item: Room;
};
export default function Form({ item }: Props) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const form = useForm<Room>({
    initialValues: {
      id: item.id,
      name: item.name,
      features: item.features,
      description: item.description,
      price: item.price,
      image: item.image,
      image2: item.image2,
      image3: item.image3,
      image4: item.image4,
      createdAt: item.createdAt,
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSaving(true);
      await setDoc(doc(db, "rooms", item.id), form.values);
      router.push("/admin/rooms/rooms");
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper shadow="xs" p="sm" m="sm" mt={0} mb="md">
        <Flex justify="space-between">
          <Button
            type="submit"
            variant="outline"
            onClick={() => router.back()}
            leftSection={
              <IconArrowLeft color="gray" size="1.2rem" aria-label="back" />
            }
            loading={saving}
            color="dark"
          >
            Back
          </Button>
          <Button type="submit" loading={saving} color="dark">
            Save
          </Button>
        </Flex>
      </Paper>
      <Grid p="sm">
        <Grid.Col span={6}>
          <Stack>
            <TextInput label="Name" {...form.getInputProps("name")} />
            <Textarea
              label="Description"
              {...form.getInputProps("description")}
            />
            <NumberInput label="Price" {...form.getInputProps("price")} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <ImagePicker
            height={200}
            imageRef={`rooms/${item.id}`}
            label="Image"
            {...form.getInputProps("image")}
          />
          <Paper withBorder p={"xs"} mt={"md"}>
            <Box ml={"sm"}>
              <Text fw={500} size="sm">
                Other Images
              </Text>
              <Text size="xs" c="dimmed">
                Optional
              </Text>
            </Box>
            <Flex gap={"sm"} mt={"sm"}>
              <ImagePicker
                height={90}
                imageRef={`rooms/${item.id}_2`}
                {...form.getInputProps("image2")}
              />
              <ImagePicker
                height={90}
                imageRef={`rooms/${item.id}_3`}
                {...form.getInputProps("image3")}
              />
              <ImagePicker
                height={90}
                imageRef={`rooms/${item.id}_4`}
                {...form.getInputProps("image4")}
              />
            </Flex>
          </Paper>
        </Grid.Col>
      </Grid>
      <Features form={form} />
    </Box>
  );
}

function Features({ form }: { form: ReturnType<typeof useForm<Room>> }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);

  return (
    <Box p="sm">
      <Flex justify={"space-between"} align={"end"}>
        <Title mt={"md"} order={3} fw={"normal"}>
          Features
        </Title>
      </Flex>
      <Divider mt={5} />

      <Flex mt={"lg"} gap={"lg"} align={"end"}>
        <Group grow w={"60%"}>
          <TextInput
            placeholder="Name"
            value={name}
            description="Feature name"
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <NumberInput
            placeholder="Count"
            value={count}
            description="Feature count"
            onChange={(event) => setCount(Number(event))}
          />
        </Group>
        <Button
          color="dark"
          onClick={() => {
            form.setFieldValue("features", [
              ...form.values.features,
              { name, count },
            ]);
            setName("");
            setCount(1);
          }}
        >
          Add
        </Button>
      </Flex>

      <FeatureTable form={form} />
    </Box>
  );
}

function FeatureTable({ form }: { form: ReturnType<typeof useForm<Room>> }) {
  const features = form.values.features as RoomFeature[];
  const rows = features.map((it) => (
    <Table.Tr key={it.name}>
      <Table.Td>{it.name}</Table.Td>
      <Table.Td>{it.count}</Table.Td>
      <Table.Td align="right">
        <ActionIcon
          aria-label="delete"
          color="red"
          variant="outline"
          onClick={() => {
            form.setFieldValue(
              "features",
              form.values.features.filter(
                (feature) => feature.name !== it.name,
              ),
            );
          }}
        >
          <IconTrashFilled size={"1rem"} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper
      w={{
        base: "100%",
        md: "50vw",
      }}
      mt={"xl"}
      px={"md"}
      withBorder
    >
      <Table mt={"xl"} stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Count</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
