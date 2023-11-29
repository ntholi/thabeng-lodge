import { doc, getDoc } from "firebase/firestore";
import Form from "./Form";
import { db } from "@/lib/firebase";
import MenuList from "./MenuList";

export default async function SupportUs() {
  const page = (await getDoc(doc(db, "pages", "restaurant-page"))).data();
  return (
    <>
      <Form page={page as RestaurantPage} />
      <MenuList />
    </>
  );
}
