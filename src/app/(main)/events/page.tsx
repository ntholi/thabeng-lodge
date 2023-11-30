import { db } from "@/lib/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";
import { Event } from "./modals";

export default async function EventsPage() {
  const q = query(collection(db, "events"), orderBy("date"));
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
      <section className="container mx-auto mt-3 space-y-5 px-4 md:px-16">
        {events.map((event) => (
          <article
            key={event.id}
            className="grid grid-cols-12 bg-white py-8 md:pe-20"
          >
            <div className="col-span-3 text-center">
              <p className="text-lg uppercase text-zinc-600">
                {weekDay(event.date)}
              </p>
              <p className="text-2xl">{event.date.toDate().getDay()}</p>
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

function weekDay(date: Timestamp) {
  return date.toDate().toLocaleDateString("en-LS", {
    weekday: "short",
  });
}

function fullDate(date: Timestamp) {
  return date.toDate().toLocaleDateString("en-LS", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
