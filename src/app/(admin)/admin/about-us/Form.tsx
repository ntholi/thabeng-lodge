"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  Paper,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { FormEvent, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";

type Props = {
  page: AboutUs | null | undefined;
};
export default function Form({ page }: Props) {
  const [saving, setSaving] = useState(false);
  const form = useForm<AboutUs>({
    initialValues: {
      phoneNumber: page?.phoneNumber || "",
      email: page?.email || "",
      address: page?.address || "",
      facebook: page?.facebook || "",
      instagram: page?.instagram || "",
      twitter: page?.twitter || "",
      aboutUs: page?.aboutUs || "",
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
      <Box p="sm" pb={0}>
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <TextInput
                label="Phone Number"
                {...form.getInputProps("phoneNumber")}
              />
              <TextInput label="Email" {...form.getInputProps("email")} />
              <TextInput
                label="Physical Address"
                {...form.getInputProps("address")}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <TextInput
                label="Facebook"
                type="url"
                {...form.getInputProps("facebook")}
              />
              <TextInput
                label="Instagram"
                type="url"
                {...form.getInputProps("instagram")}
              />
              <TextInput
                label="Twitter"
                type="url"
                {...form.getInputProps("twitter")}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="About Us"
              rows={10}
              {...form.getInputProps("aboutUs")}
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
