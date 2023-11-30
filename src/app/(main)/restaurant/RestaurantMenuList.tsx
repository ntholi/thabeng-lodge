import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import ItemCard from "./ItemCard";

type Props = {
  promiseDocs: Promise<QuerySnapshot<DocumentData, DocumentData>>;
};
export default async function RestaurantMenuList({ promiseDocs }: Props) {
  const data = (await promiseDocs).docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as MenuItem,
  );
  return (
    <>
      {data.map((item) => (
        <article key={item.id} className="col-span-4 h-80">
          <ItemCard item={item} />
        </article>
      ))}
    </>
  );
}
