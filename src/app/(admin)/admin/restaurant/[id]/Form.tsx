"use client";
import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { FormEvent, useState } from "react";
import { useForm } from "@mantine/form";
import RichText from "../../../core/RichText";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

type Props = {
  item: MenuItem;
};
export default function Form({ item }: Props) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const form = useForm<MenuItem>({
    initialValues: {
      id: item?.id || "",
      name: item?.name || "",
      description: item?.description || "",
      price: item?.price || 0,
      image: item?.image || "",
      dateUpdated: serverTimestamp(),
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSaving(true);
      await setDoc(doc(db, "restaurant-menu", item.id), form.values);
      router.push("/admin/restaurant");
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
          <Group>
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
          </Group>
        </Flex>
      </Paper>
      <ScrollArea h={"79vh"} p="sm" pb={0}>
        <Stack>
          <TextInput label="Name" {...form.getInputProps("name")} />
        </Stack>
      </ScrollArea>
    </Box>
  );
}
