"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdHotel, MdFastfood, MdCelebration } from "react-icons/md";

export default function HomeButtons() {
  return (
    <>
      <motion.div
        initial={{ y: "30vh", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 50 },
        }}
      >
        <Link href="/restaurant" className="flex flex-col items-center gap-2">
          <div className="rounded-md border bg-black/60 p-7 text-white">
            <MdFastfood className="text-xl sm:text-3xl" />
          </div>
          Restaurant
        </Link>
      </motion.div>
      <motion.div
        initial={{ y: "30vh", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.2, type: "spring", stiffness: 50 },
        }}
      >
        <Link href="/events" className="flex flex-col items-center gap-2">
          <div className="rounded-md border  bg-black/60 p-7 text-white">
            <MdCelebration className="text-xl sm:text-3xl" />
          </div>
          Events
        </Link>
      </motion.div>
      <motion.div
        initial={{ y: "30vh", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.3, type: "spring", stiffness: 50 },
        }}
      >
        <Link href="#" className="flex flex-col items-center gap-2">
          <div className="rounded-md border  bg-black/60 p-7 text-white">
            <MdHotel className="text-xl sm:text-3xl" />
          </div>
          Bookings
        </Link>
      </motion.div>
    </>
  );
}
