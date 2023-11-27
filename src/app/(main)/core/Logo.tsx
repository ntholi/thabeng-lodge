'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className='flex items-center'>
      <p className='font-bold text-inherit'>Thabeng Lodge</p>
    </Link>
  );
}
