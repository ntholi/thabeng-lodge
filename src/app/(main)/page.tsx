import { db } from "@/lib/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import RestaurantSection from "./home/RestaurantSection";
import EventsSection from "./home/EventsSection";
import HomeButtons from "./home/HomeButtons";

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
          <HomeButtons />
        </nav>
      </header>
      <div>
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
