import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import { Event } from "../events/modals";

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
        <article key={item.id}>
          <h3>{item.title}</h3>
        </article>
      ))}
    </div>
  );
}
