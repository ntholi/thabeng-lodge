import { DocumentData, QuerySnapshot, Timestamp } from "firebase/firestore";
import React from "react";
import { Event } from "../../(admin)/admin/events/modals";
import { MdOutlineEvent } from "react-icons/md";

type Props = {
  promiseDocs: Promise<QuerySnapshot<DocumentData, DocumentData>>;
};

export default async function EventList({ promiseDocs }: Props) {
  const data = (await promiseDocs).docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as Event;
  });

  return (
    <div className="space-y-3">
      {data.length > 0 ? (
        data.map((item) => (
          <article
            key={item.id}
            className="flex cursor-pointer items-center gap-5 rounded border-b border-zinc-600 p-2 pb-5  hover:bg-zinc-800"
          >
            <div className="rounded-full bg-white p-3 text-black">
              <MdOutlineEvent className="text-xl" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{toDate(item.date)}</p>
              <p className="text-sm">{shorten(item.description)}</p>
            </div>
          </article>
        ))
      ) : (
        <NoEvent />
      )}
    </div>
  );
}

function NoEvent() {
  return (
    <div className="flex items-center justify-center">
      <p>No Upcoming Events</p>
    </div>
  );
}

function shorten(str: string) {
  return str.length > 35 ? str.substring(0, 35) + "..." : str;
}

function toDate(date: Timestamp) {
  return date.toDate().toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
