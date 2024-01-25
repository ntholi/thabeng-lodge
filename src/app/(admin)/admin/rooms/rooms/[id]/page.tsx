"use client";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import { useEffect, useState } from "react";
import Form from "./Form";
import { Room } from "../../model";

type Props = { params: { id: string } };

export default function PressPage({ params: { id } }: Props) {
  const [item, setItem] = useState<Room | null>(null);

  useEffect(() => {
    async function getItem() {
      const item = (await getDoc(doc(db, "rooms", id))).data() as Room;
      setItem({ ...item, id });
      console.log({ item });
    }
    if (id) {
      getItem();
    }
  }, [id]);

  return <div>{item && <Form item={item} />}</div>;
}
