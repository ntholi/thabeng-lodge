import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import ItemCard from "./ItemCard";

type Props = {
  promiseDocs: Promise<QuerySnapshot<DocumentData, DocumentData>>;
  itemHeight?: number | string;
};

export default async function RestaurantMenuList({
  promiseDocs,
  itemHeight = "20rem",
}: Props) {
  const data = (await promiseDocs).docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as MenuItem;
  });
  return (
    <>
      {data.map((item) => (
        <article
          key={item.id}
          className="col-span-6 md:col-span-4"
          style={{
            height: itemHeight,
          }}
        >
          <div className="h-52 md:h-full">
            <ItemCard item={item} />
          </div>
        </article>
      ))}
    </>
  );
}
