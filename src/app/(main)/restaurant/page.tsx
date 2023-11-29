import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';

async function getPage() {
  const data = (await getDoc(doc(db, 'pages', 'restaurant-page'))).data();
  return data as unknown as RestaurantPage;
}

export default async function RestaurantPage() {
  const page = await getPage();
  return (
    <main
      style={{
        backgroundImage: `url(${page.banner})`,
      }}
      className={`h-[40vh] flex flex-col justify-center items-center bg-blend-overlay  bg-black/60 bg-center bg-cover text-white`}
    >
      <header>
        <h2 className='text-3xl'>{page.description}</h2>
      </header>
    </main>
  );
}
