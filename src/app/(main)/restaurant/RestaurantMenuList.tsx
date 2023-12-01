import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import ItemCard from "./ItemCard";

type Props = {
  promiseDocs: Promise<QuerySnapshot<DocumentData, DocumentData>>;
  itemHeight?: number | string;
  itemClassName: string;
};

export default async function RestaurantMenuList({
  promiseDocs,
  itemClassName,
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
          className={itemClassName}
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
