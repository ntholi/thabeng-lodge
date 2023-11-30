import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import { Event } from "../events/modals";
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
    <div>
      {data.map((item) => (
        <article
          key={item.id}
          className="mb-5 flex items-center gap-5 border-b border-zinc-500 pb-3"
        >
          <div className="rounded-full bg-white p-3 text-black">
            <MdOutlineEvent className="text-xl" />
          </div>
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm">{toDate(item.date)}</p>
            <p className="text-sm">{shorten(item.description)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function shorten(str: string) {
  return str.length > 35 ? str.substring(0, 35) + "..." : str;
}

function toDate(date: Date) {
  console.log("date", date);
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
