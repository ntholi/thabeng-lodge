import { Room } from "@/app/(admin)/admin/rooms/model";
import { db } from "@/lib/config/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import CommonHeader from "../core/CommonHeader";

const getPage = async () => {
  const data = (await getDoc(doc(db, "pages", "rooms-page"))).data();
  return data as unknown as EventsPage;
};

export default async function RoomsPage() {
  const q = query(collection(db, "rooms"));
  const events = (await getDocs(q)).docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as unknown as Room;
  });
  const page = await getPage();
  return (
    <main className="min-h-screen bg-gray-50">
      <CommonHeader
        description={page?.description}
        image={page?.banner}
        title="Rooms"
      />
      <section className="container mx-auto mt-3 space-y-5 px-4 md:px-56">
        {events.map((event) => (
          <article
            key={event.id}
            className="grid-cols-12 bg-white px-4 py-8 sm:grid md:pe-20"
          ></article>
        ))}
      </section>
    </main>
  );
}
