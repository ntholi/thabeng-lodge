import { db } from "@/lib/config/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { Event } from "../../(admin)/admin/events/modals";

export default async function EventsPage() {
  const q = query(
    collection(db, "events"),
    orderBy("date"),
    where("date", ">", Timestamp.fromDate(new Date())),
  );
  const events = (await getDocs(q)).docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as unknown as Event;
  });
  return (
    <main className="min-h-screen bg-amber-50">
      <header className="flex h-[40vh] items-center justify-center bg-zinc-900 text-white">
        <h1 className="text-center text-5xl font-bold uppercase">Events</h1>
      </header>
      <section className="container mx-auto mt-3 space-y-5 px-4 md:px-56">
        {events.map((event) => (
          <article
            key={event.id}
            className="grid-cols-12 bg-white px-4 py-8 sm:grid md:pe-20"
          >
            <div className="col-span-3 hidden text-center sm:block">
              <p className="text-lg uppercase text-zinc-600">
                {month(event.date)}
              </p>
              <p className="text-2xl">{dayOfMonth(event.date)}</p>
            </div>
            <div className="col-span-9">
              <p className="font-bold text-zinc-600">{fullDate(event.date)}</p>
              <h2 className="text-3xl">{event.title}</h2>
              <p className="mt-3">{event.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function dayOfMonth(date: Timestamp | null | undefined) {
  return date?.toDate().toLocaleDateString("en-LS", {
    day: "numeric",
  });
}

function month(date: Timestamp | null | undefined) {
  return date?.toDate().toLocaleDateString("en-LS", {
    month: "short",
  });
}

function fullDate(date: Timestamp | null | undefined) {
  return date?.toDate().toLocaleDateString("en-LS", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
