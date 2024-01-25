"use client";
import { db } from "@/lib/config/firebase";
import { SimpleGrid } from "@mantine/core";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RoomView from "./RoomView";
import NewPressButton from "./Button";
import { Room } from "../model";

export default function RoomList() {
  const [items, setItems] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "rooms"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setItems([]);
        snapshot.forEach((doc) => {
          const item = doc.data() as Room;
          item.id = doc.id;
          setItems((data) => [...data, item]);
        });
      },
    );
  }, []);
  const handleCreate = async () => {
    try {
      setLoading(true);
      const item = await addDoc(collection(db, "rooms"), {
        name: "New Room",
        description: "",
        features: [],
        image: "",
        price: 0,
        createdAt: serverTimestamp(),
      } as Omit<Room, "id">);
      router.push(`/admin/rooms/${item.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleGrid p="sm" cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      <NewPressButton onClick={handleCreate} isLoading={loading} />
      {items.map((item) => (
        <RoomView key={item.id} item={item} />
      ))}
    </SimpleGrid>
  );
}
