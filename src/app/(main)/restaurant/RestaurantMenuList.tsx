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
          className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3"
          style={{
            height: itemHeight,
          }}
        >
          <div className="h-full max-md:pb-4">
            <ItemCard item={item} />
          </div>
        </article>
      ))}
    </>
  );
}
