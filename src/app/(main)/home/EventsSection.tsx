import { Divider } from "@nextui-org/divider";
import React, { Suspense } from "react";
import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import EventList from "./EventList";
import { MdAccessTime } from "react-icons/md";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function EventsSection() {
  const q = query(
    collection(db, "events"),
    limit(2),
    orderBy("date"),
    where("date", ">", Timestamp.fromDate(new Date())),
  );
  const menuItems = getDocs(q);
  return (
    <section className="h-4/5 rounded-md bg-zinc-900 p-5 text-white">
      <header className="flex justify-between">
        <h2 className="text-3xl font-bold">Events</h2>
        <MdAccessTime className="text-3xl" />
      </header>
      <Divider className="mt-1" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex h-full flex-col justify-between pt-10">
          <EventList promiseDocs={menuItems} />
          <Link href={"/events"} className="border p-3 text-white">
            View All
          </Link>
        </div>
      </Suspense>
    </section>
  );
}
