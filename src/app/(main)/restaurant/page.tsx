import { db } from "@/lib/config/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import React, { Suspense } from "react";
import RestaurantMenuList from "./RestaurantMenuList";
import { Divider } from "@nextui-org/divider";
import CommonHeader from "../core/CommonHeader";

const getPage = async () => {
  const data = (await getDoc(doc(db, "pages", "restaurant-page"))).data();
  return data as unknown as RestaurantPage;
};

const getItems = async () => {
  const data = getDocs(query(collection(db, "restaurant-menu")));
  return data;
};

export default async function RestaurantPage() {
  const page = await getPage();
  const itemsPromise = getItems();
  return (
    <>
      <CommonHeader
        image={page.banner}
        title={"Restaurant"}
        description={page.description}
      />
      <main className="container mx-auto px-4 py-10 md:px-16">
        <h2 className="text-2xl font-bold">Our Menu</h2>
        <Divider className="mt-1" />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-12 pt-10 md:gap-10">
            <RestaurantMenuList
              promiseDocs={itemsPromise}
              itemClassName="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3"
            />
          </div>
        </Suspense>
      </main>
    </>
  );
}
