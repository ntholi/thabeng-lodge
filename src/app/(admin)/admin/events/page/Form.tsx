"use client";
import {
  Box,
  Button,
  Flex,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { FormEvent, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import ImagePicker from "../../../core/ImagePicker";
import { EventsPage } from "../../events/modals";

type Props = {
  page: EventsPage | null | undefined;
};

export default function Form({ page }: Props) {
  const [saving, setSaving] = useState(false);

  const form = useForm<EventsPage>({
    initialValues: {
      banner: page?.banner || "",
      description: page?.description || "",
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSaving(true);
      await setDoc(doc(db, "pages", "events-page"), form.values);
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper shadow="xs" p="sm" m="sm" mt={0} mb="md">
        <Flex justify="space-between">
          <Title size={20}>Events Page</Title>
          <Button type="submit" loading={saving} color="dark">
            Save
          </Button>
        </Flex>
      </Paper>
      <Stack p="sm">
        <TextInput label="Description" {...form.getInputProps("description")} />
        <ImagePicker
          imageRef={"pages/events/banner"}
          label="Banner Image"
          {...form.getInputProps("banner")}
        />
      </Stack>
    </Box>
  );
}
