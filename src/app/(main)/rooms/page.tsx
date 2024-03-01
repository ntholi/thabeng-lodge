import { Room } from "@/app/(admin)/admin/rooms/model";
import { db } from "@/lib/config/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import CommonHeader from "../core/CommonHeader";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { formatMoney } from "@/lib/utils";
import { FaCircleCheck } from "react-icons/fa6";
import clsx from "clsx";
import { Divider } from "@nextui-org/divider";
import ImageView from "./ImageView";

export const dynamic = "force-dynamic";

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
      <section className="container mx-auto mt-3 space-y-5 px-4 md:px-32">
        {rooms.map((event, i) => (
          <div key={event.id}>
            <RoomView room={event} reversed={i % 2 != 0} />
            <Divider />
          </div>
        ))}
      </section>
    </main>
  );
}

function RoomView({ room, reversed }: { room: Room; reversed: boolean }) {
  delete room.createdAt;
  return (
    <article className="grid-cols-12 gap-5 bg-white py-8 sm:px-4 md:grid md:pe-20">
      <div
        className={clsx("col-span-12 sm:col-span-7", reversed && "order-last")}
      >
        <ImageView room={room} />
      </div>
      <div className="col-span-12 mt-3 sm:col-span-5 sm:mt-0">
        <h2 className="text-2xl text-gray-800 sm:text-3xl">{room.name}</h2>
        <p className="font-semibold text-green-600">
          {formatMoney(room.price)}
        </p>
        <p className="text-gray-600">{room.description}</p>
        <h3 className="mt-5 border-b border-gray-300 text-xl">Features</h3>
        <ul className="mt-2 flex flex-col text-sm">
          {room.features.map((feature) => (
            <li key={feature.name} className="flex items-center gap-2">
              <FaCircleCheck className="text-gray-600" />
              <p className="">{feature.count}</p>
              <p className="text-gray-600">{feature.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
