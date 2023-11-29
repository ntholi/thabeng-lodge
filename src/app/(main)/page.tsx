import { db } from '@/lib/firebase';
import { MdHotel, MdFastfood, MdCelebration } from 'react-icons/md';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default async function Home() {
  const page = (await getDoc(doc(db, 'pages', 'home-page'))).data() as HomePage;
  return (
    <>
      <main
        style={{
          backgroundImage: `url(${page.banner})`,
        }}
        className={`hero h-screen flex flex-col justify-center items-center bg-blend-overlay  bg-black/40 bg-center bg-cover text-white`}
      >
        <header>
          <h1 className='border-white border-3 px-10 py-5 text-6xl uppercase'>
            Thabeng
          </h1>
          <p className='mt-5 uppercase tracking-wide text-center'>
            {page.tagline}
          </p>
        </header>
        <nav className='mt-28 flex gap-10'>
          <Link href='#' className='flex flex-col gap-2 items-center'>
            <div className='border p-7 rounded-md bg-black/60 text-white'>
              <MdFastfood size='2rem' />
            </div>
            Restaurant
          </Link>
          <Link href='#' className='flex flex-col gap-2 items-center'>
            <div className='border p-7  rounded-md bg-black/60 text-white'>
              <MdCelebration size='2rem' />
            </div>
            Events
          </Link>
          <Link href='#' className='flex flex-col gap-2 items-center'>
            <div className='border p-7  rounded-md bg-black/60 text-white'>
              <MdHotel size='2rem' />
            </div>
            Bookings
          </Link>
        </nav>
      </main>
    </>
  );
}
