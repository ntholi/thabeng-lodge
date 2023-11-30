import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import ItemCard from "./ItemCard";

type Props = {
  promiseDocs: Promise<QuerySnapshot<DocumentData, DocumentData>>;
};
export default async function ItemList({ promiseDocs }: Props) {
  const data = (await promiseDocs).docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as MenuItem,
  );
  return (
    <div className="grid grid-cols-12 gap-10 pt-10">
      {data.map((item) => (
        <article key={item.id} className="col-span-4 h-80">
          <ItemCard item={item} />
        </article>
      ))}
    </div>
  );
}
