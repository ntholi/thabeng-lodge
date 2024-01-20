"use client";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import { useEffect, useState } from "react";
import Form from "./Form";

type Props = { params: { id: string } };

export default function PressPage({ params: { id } }: Props) {
  const [item, setItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    async function getItem() {
      const item = (
        await getDoc(doc(db, "restaurant-menu", id))
      ).data() as MenuItem;
      setItem({ ...item, id });
      console.log({ item });
    }
    if (id) {
      getItem();
    }
  }, [id]);

  return <div>{item && <Form item={item} />}</div>;
}
