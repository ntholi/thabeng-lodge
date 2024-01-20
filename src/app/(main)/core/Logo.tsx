"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo-white.png"
        alt="logo"
        className="h-20 w-auto"
        width={200}
        height={200}
      />
    </Link>
  );
}
