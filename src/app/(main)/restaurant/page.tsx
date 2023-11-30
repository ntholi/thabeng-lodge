import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { Suspense } from "react";
import ItemCard from "./ItemCard";
import ItemList from "./ItemList";

const getPage = async () => {
  const data = (await getDoc(doc(db, "pages", "restaurant-page"))).data();
  return data as unknown as RestaurantPage;
};

const getItems = async () => {
  const data = getDocs(collection(db, "restaurant-menu"));
  return data;
};

export default async function RestaurantPage() {
  const page = await getPage();
  const itemsPromise = getItems();
  return (
    <>
      <header
        style={{
          backgroundImage: `url(${page.banner})`,
        }}
        className={`flex h-[40vh] flex-col items-center justify-center bg-black/50  bg-cover bg-center text-white bg-blend-overlay`}
      >
        <h1 className="text-center text-5xl font-bold uppercase">Restaurant</h1>
        <p className="mt-3 text-center text-lg">{page.description}</p>
      </header>
      <main className="container mx-auto mt-10 px-4 md:px-16">
        <h2 className="text-2xl font-bold">Our Menu</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ItemList promiseDocs={itemsPromise} />
        </Suspense>
      </main>
    </>
  );
}
