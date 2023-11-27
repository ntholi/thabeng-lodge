'use client';
import {
  ActionIcon,
  Divider,
  Flex,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { db } from '@/lib/firebase';
import { useEffect, useState, useTransition } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import Form from './Form';
import { IconPlus, IconTrashXFilled } from '@tabler/icons-react';
import { Event } from '@/lib/modals';

export default function ProgramsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event | null>(null);
  const [active, setActive] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    return onSnapshot(query(collection(db, 'events')), (snapshot) => {
      setItems([]);
      snapshot.forEach((doc) => {
        const item = doc.data() as Event;
        item.id = doc.id;
        setItems((data) => [...data, item]);
      });
    });
  }, []);

  async function selectItem(id: string | undefined) {
    if (!id) return;
    const res = await getDoc(doc(db, 'events', id));
    const item = res.data() as Event;
    item.id = res.id;
    setEvents(item);
    setActive(id);
  }

  return (
    <>
      <Paper withBorder>
        <Flex>
          <Stack gap={0}>
            <Flex h={60} p='md' justify='space-between'>
              <ActionIcon
                color='dark'
                aria-label='create new'
                onClick={() => {
                  startTransition(async () => {
                    const res = await addDoc(collection(db, 'events'), {
                      title: 'New Event',
                      description: '',
                      dateCreated: serverTimestamp(),
                    });
                    await selectItem(res.id);
                  });
                }}
              >
                <IconPlus
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                color='red'
                aria-label='delete'
                disabled={!active || isPending || !events}
                onClick={() => {
                  startTransition(async () => {
                    await deleteDoc(doc(db, 'events', active));
                    setEvents(null);
                  });
                }}
              >
                <IconTrashXFilled
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Flex>
            <Divider />
            <ScrollArea h='90vh' w={350} type='always'>
              {items.map((item) => (
                <NavLink
                  key={item.id}
                  active={item.id === active}
                  label={item.title}
                  description={stripHTML(item.description)}
                  onClick={() => {
                    startTransition(async () => {
                      await selectItem(item.id);
                    });
                  }}
                />
              ))}
            </ScrollArea>
          </Stack>
          <Divider orientation='vertical' h='90vh' />
          <Paper w={'100%'}>
            {events && <Form item={events} isLoading={isPending} />}
          </Paper>
        </Flex>
      </Paper>
    </>
  );
}

function stripHTML(description: string) {
  if (!description) return '';
  const res = description.replace(/<[^>]*>?/gm, '');
  return res.length > 52 ? res.slice(0, 52) + '...' : res;
}
