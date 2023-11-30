"use client";
import {
  Box,
  Button,
  Flex,
  Paper,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { FormEvent, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ImagePicker from "../../core/ImagePicker";

type Props = {
  page: HomePage | null | undefined;
};
export default function Form({ page }: Props) {
  const [saving, setSaving] = useState(false);
  const form = useForm<HomePage>({
    initialValues: {
      banner: page?.banner || "",
      tagline: page?.tagline || "",
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSaving(true);
      await setDoc(doc(db, "pages", "about-us"), form.values);
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
          <Title size={20}>About Us</Title>
          <Button type="submit" loading={saving} color="dark">
            Save
          </Button>
        </Flex>
      </Paper>
      <ScrollArea h={"79vh"} p="sm" pb={0}>
        <Stack>
          <TextInput label="Tagline" {...form.getInputProps("tagline")} />
          <Paper
            w={{
              base: "100%",
              md: "50%",
            }}
          >
            <ImagePicker
              imageRef={"pages/about-us"}
              label="Banner Image"
              {...form.getInputProps("banner")}
            />
          </Paper>
        </Stack>
      </ScrollArea>
    </Box>
  );
}
