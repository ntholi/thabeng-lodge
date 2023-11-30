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
      <Divider className="mt-1" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-12 gap-10 pt-10">
          <RestaurantMenuList promiseDocs={menuItems} itemHeight={"15rem"} />
        </div>
      </Suspense>
    </section>
  );
}
