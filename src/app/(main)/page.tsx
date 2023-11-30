import { db } from "@/lib/firebase";
import { MdHotel, MdFastfood, MdCelebration } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import RestaurantSection from "./home/RestaurantSection";
import EventsSection from "./home/EventsSection";

async function getPage() {
  const data = (await getDoc(doc(db, "pages", "home-page"))).data();
  return data as unknown as HomePage;
}

export default async function Home() {
  const page = await getPage();
  return (
    <>
      <header
        style={{
          backgroundImage: `url(${page.banner})`,
        }}
        className={`hero flex h-screen flex-col items-center justify-center bg-black/40  bg-cover bg-center text-white bg-blend-overlay`}
      >
        <div>
          <h1 className="border-3 border-white px-10 py-5 text-7xl uppercase">
            Thabeng
          </h1>
          <p className="mt-5 text-center uppercase tracking-wide">
            {page.tagline}
          </p>
        </div>
        <nav className="mt-28 flex gap-16">
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="rounded-md border bg-black/60 p-7 text-amber-100">
              <MdFastfood size="2rem" />
            </div>
            Restaurant
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="rounded-md border  bg-black/60 p-7 text-amber-100">
              <MdCelebration size="2rem" />
            </div>
            Events
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="rounded-md border  bg-black/60 p-7 text-amber-100">
              <MdHotel size="2rem" />
            </div>
            Bookings
          </Link>
        </nav>
      </header>
      <main className="container mx-auto mt-10 grid min-h-screen grid-cols-12 gap-10 px-2 md:px-4">
        <div className="col-span-8">
          <RestaurantSection />
        </div>
        <aside className="col-span-4">
          <EventsSection />
        </aside>
      </main>
    </>
  );
}
