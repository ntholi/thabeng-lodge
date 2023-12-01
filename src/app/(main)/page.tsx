import { db } from "@/lib/firebase";
import { MdHotel, MdFastfood, MdCelebration } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import RestaurantSection from "./home/RestaurantSection";
import EventsSection from "./home/EventsSection";
import Footer from "./core/Footer";

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
        className={`hero flex h-screen flex-col items-center justify-center bg-black/40 bg-cover bg-center px-4 text-white bg-blend-overlay`}
      >
        <div>
          <h1 className="border-3 border-white py-5 text-center text-5xl uppercase sm:px-10 sm:text-7xl">
            Thabeng
          </h1>
          <p className="mt-5 text-center uppercase tracking-wide">
            {page.tagline}
          </p>
        </div>
        <nav className="mt-28 flex w-full justify-between sm:justify-center sm:gap-16">
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="rounded-md border bg-black/60 p-7 text-amber-100">
              <MdFastfood className="text-xl sm:text-3xl" />
            </div>
            Restaurant
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="rounded-md border  bg-black/60 p-7 text-amber-100">
              <MdCelebration className="text-xl sm:text-3xl" />
            </div>
            Events
          </Link>
          <Link href="#" className="flex flex-col items-center gap-2">
            <div className="rounded-md border  bg-black/60 p-7 text-amber-100">
              <MdHotel className="text-xl sm:text-3xl" />
            </div>
            Bookings
          </Link>
        </nav>
      </header>
      <div className="bg-amber-50">
        <main className="container mx-auto min-h-screen grid-cols-12 px-2 py-10 md:grid md:gap-10 md:px-4 md:pt-16">
          <div className="col-span-8">
            <RestaurantSection />
          </div>
          <aside className="col-span-4">
            <EventsSection />
          </aside>
        </main>
      </div>
    </>
  );
}
