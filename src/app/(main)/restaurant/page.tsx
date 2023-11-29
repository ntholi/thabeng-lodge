import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

async function getPage() {
  const data = (await getDoc(doc(db, "pages", "restaurant-page"))).data();
  return data as unknown as RestaurantPage;
}

export default async function RestaurantPage() {
  const page = await getPage();
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
      <main className="container mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold">Our Menu</h2>
      </main>
    </>
  );
}
