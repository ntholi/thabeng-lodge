"use client";

import {
  Box,
  Button,
  Divider,
  Flex,
  ScrollArea,
  Skeleton,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { FormEvent, useEffect, useState } from "react";
import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Event } from "@/app/(admin)/admin/events/modals";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.layer.css";
import { useForm } from "@mantine/form";

type Props = {
  item: Event;
  isLoading?: boolean;
};
export default function Form({ item, isLoading }: Props) {
  const form = useForm<Event>({
    initialValues: {
      id: item.id || "",
      title: item.title || "",
      description: item.description || "",
    },
  });
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    form.setValues(item);
    setDate(item.date?.toDate() || new Date());
  }, [item]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await setDoc(doc(db, "events", item.id), {
      ...form.values,
      date: date || new Date(),
      dateCreated: serverTimestamp(),
    });
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Flex justify="space-between" align={"center"} h={60} p="md">
        {isLoading ? (
          <Skeleton width={200} h={35} />
        ) : (
          <Title size={20} fw={500}>
            {form.values.title || "New Event"}
          </Title>
        )}
        <Button type="submit" color="dark" disabled={isLoading}>
          Save
        </Button>
      </Flex>
      <Divider />
      {isLoading ? (
        <Stack p="sm" gap={35}>
          <Skeleton mt="sm" h={50} w="100%" />
          <Skeleton h={200} w="100%" />
        </Stack>
      ) : (
        <ScrollArea h={"79vh"} p="sm" pb={0}>
          <Stack>
            <TextInput label="Title" {...form.getInputProps("title")} />
            <DateTimePicker
              label="Date"
              placeholder="Select date"
              value={date}
              onChange={setDate}
            />
            <Textarea
              label="Description"
              rows={10}
              {...form.getInputProps("description")}
            />
          </Stack>
        </ScrollArea>
      )}
    </Box>
  );
}
