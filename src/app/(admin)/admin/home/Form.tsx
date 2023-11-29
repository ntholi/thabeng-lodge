'use client';
import {
  Box,
  Button,
  Flex,
  Paper,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import '@mantine/tiptap/styles.css';
import { FormEvent, useState } from 'react';
import { useForm } from '@mantine/form';
import RichText from '../../core/RichText';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { revalidateTag } from 'next/cache';
import ImagePicker from '../../core/ImagePicker';

type Props = {
  page: HomePage;
};
export default function Form({ page }: Props) {
  const [saving, setSaving] = useState(false);
  const form = useForm<HomePage>({
    initialValues: {
      banner: page.banner || '',
      tagline: page.tagline || '',
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSaving(true);
      console.log(form.values);
      await setDoc(doc(db, 'pages', 'home-page'), form.values);
      revalidateTag('home-page');
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Paper shadow='xs' p='sm' m='sm' mt={0} mb='md'>
        <Flex justify='space-between'>
          <Title size={20}>Home Page</Title>
          <Button type='submit' loading={saving} color='dark'>
            Save
          </Button>
        </Flex>
      </Paper>
      <ScrollArea h={'79vh'} p='sm' pb={0}>
        <Stack>
          <ImagePicker
            imageRef={'pages/home-page'}
            label='Banner'
            {...form.getInputProps('banner')}
          />
          <TextInput label='Tagline' {...form.getInputProps('tagline')} />
        </Stack>
      </ScrollArea>
    </Box>
  );
}
