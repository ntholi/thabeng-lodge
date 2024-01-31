import { Room } from "@/app/(admin)/admin/rooms/model";
import { db } from "@/lib/config/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import CommonHeader from "../core/CommonHeader";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

const getPage = async () => {
  const data = (await getDoc(doc(db, "pages", "rooms-page"))).data();
  return data as unknown as EventsPage;
};

export default async function RoomsPage() {
  const q = query(collection(db, "rooms"));
  const rooms = (await getDocs(q)).docs.map((doc) => {
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
        {rooms.map((event) => (
          <RoomView key={event.id} room={event} />
        ))}
      </section>
    </main>
  );
}

function RoomView({ room }: { room: Room }) {
  return (
    <article className="grid-cols-12 bg-white px-4 py-8 sm:grid md:pe-20">
      <div className="col-span-12 sm:col-span-6">
        <Image
          as={NextImage}
          className="h-96 w-full object-cover"
          width={1100}
          height={1100}
          src={room.image}
          alt={room.name}
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <h1 className="text-4xl font-bold text-gray-800">{room.name}</h1>
        <p className="text-gray-600">{room.description}</p>
      </div>
    </article>
  );
}
