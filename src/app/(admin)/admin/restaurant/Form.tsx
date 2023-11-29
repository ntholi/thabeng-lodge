"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  Paper,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ImagePicker from "../../core/ImagePicker";
import { useRouter } from "next/navigation";

type Props = {
  page: RestaurantPage | null | undefined;
};

export default function Form({ page }: Props) {
  const [saving, setSaving] = useState(false);

  const form = useForm<RestaurantPage>({
    initialValues: {
      banner: page?.banner || "",
      description: page?.description || "",
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSaving(true);
      await setDoc(doc(db, "pages", "restaurant-page"), form.values);
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
          <Title size={20}>Restaurant Page</Title>
          <Button type="submit" loading={saving} color="dark">
            Save
          </Button>
        </Flex>
      </Paper>
      <Grid p="sm" pb={0}>
        <Grid.Col span={6}>
          <TextInput
            label="Description"
            {...form.getInputProps("description")}
          />
          <ImagePicker
            height={150}
            imageRef={"pages/restaurant/banner"}
            label="Banner Image"
            {...form.getInputProps("banner")}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
