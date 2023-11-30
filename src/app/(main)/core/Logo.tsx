"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex justify-start">
      <Image
        src="/images/logo.png"
        alt="logo"
        className="h-12 w-[95px]"
        width={300}
        height={300}
      />
    </Link>
  );
}
