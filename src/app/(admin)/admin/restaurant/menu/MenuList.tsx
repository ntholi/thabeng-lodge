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
import MenuItemView from "./MenuItemView";
import NewPressButton from "./Button";

export default function MenuList() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "restaurant-menu"), orderBy("dateUpdated", "desc")),
      (snapshot) => {
        setItems([]);
        snapshot.forEach((doc) => {
          const item = doc.data() as MenuItem;
          item.id = doc.id;
          setItems((data) => [...data, item]);
        });
      },
    );
  }, []);
  const handleCreate = async () => {
    try {
      setLoading(true);
      const item = await addDoc(collection(db, "restaurant-menu"), {
        title: "New Item",
        body: "<p>Press body</p>",
        dateCreated: serverTimestamp(),
      });
      router.push(`/admin/restaurant/${item.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleGrid p="sm" cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      <NewPressButton onClick={handleCreate} isLoading={loading} />
      {items.map((item) => (
        <MenuItemView key={item.id} item={item} />
      ))}
    </SimpleGrid>
  );
}
