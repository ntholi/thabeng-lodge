import { Divider } from "@nextui-org/divider";
import React, { Suspense } from "react";
import RestaurantMenuList from "../restaurant/RestaurantMenuList";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function RestaurantSection() {
  const q = query(
    collection(db, "restaurant-menu"),
    orderBy("dateUpdated"),
    limit(6),
  );
  const menuItems = getDocs(q);
  return (
    <section>
      <header className="flex justify-between">
        <h2 className="text-3xl font-bold text-amber-800">Restaurant</h2>
        <Link className="font-semibold hover:text-gray-500" href="/restaurant">
          View All
        </Link>
      </header>
      <Divider className="mt-1" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-12 gap-3 pt-5 md:gap-10 md:pt-10">
          <RestaurantMenuList promiseDocs={menuItems} itemHeight={"15rem"} />
        </div>
      </Suspense>
    </section>
  );
}
