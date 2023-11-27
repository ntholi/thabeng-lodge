'use client';
import {
  Box,
  Button,
  Divider,
  Flex,
  ScrollArea,
  Skeleton,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import '@mantine/tiptap/styles.css';
import { FormEvent, use, useEffect, useState } from 'react';
import RichText from '../../core/RichText';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Event } from '@/lib/modals';
import { DateTimePicker } from '@mantine/dates';

type Props = {
  item: Event;
  isLoading?: boolean;
};
export default function Form({ item, isLoading }: Props) {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (item.id) {
      setId(item.id);
    }
    setTitle(item.title);
    setDescription(item.description);
  }, [item]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('submitting', { id }, { title }, { description });
    if (!id) return;
    await setDoc(doc(db, 'events', id), {
      title,
      description,
      date,
      dateCreated: serverTimestamp(),
    });
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Flex justify='space-between' align={'center'} h={60} p='md'>
        {isLoading ? (
          <Skeleton width={200} h={35} />
        ) : (
          <Title size={20} fw={500}>
            {title}
          </Title>
        )}
        <Button
          type='submit'
          loading={saving}
          color='dark'
          disabled={isLoading}
        >
          Save
        </Button>
      </Flex>
      <Divider />
      {isLoading ? (
        <Stack p='sm' gap={35}>
          <Skeleton mt='sm' h={50} w='100%' />
          <Skeleton h={200} w='100%' />
        </Stack>
      ) : (
        <ScrollArea h={'79vh'} p='sm' pb={0}>
          <Stack>
            <TextInput
              label='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DateTimePicker
              label='Date'
              value={date}
              onDateChange={(date) => setDate(date)}
            />
            <RichText
              height={500}
              label='description'
              value={description}
              onChange={(text) => setDescription(text)}
            />
          </Stack>
        </ScrollArea>
      )}
    </Box>
  );
}
