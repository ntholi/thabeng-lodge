import { Divider } from "@nextui-org/divider";
import React, { Suspense } from "react";
import RestaurantMenuList from "../restaurant/RestaurantMenuList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function RestaurantSection() {
  const menuItems = getDocs(collection(db, "restaurant-menu"));
  return (
    <section>
      <h2 className="text-3xl font-bold">Restaurant</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-12 gap-10 pt-10">
          <RestaurantMenuList promiseDocs={menuItems} />
        </div>
      </Suspense>
    </section>
  );
}
