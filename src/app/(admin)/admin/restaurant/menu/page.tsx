import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import MenuList from "./MenuList";
import { Title } from "@mantine/core";

export default async function SupportUs() {
  const page = (await getDoc(doc(db, "pages", "restaurant-page"))).data();
  return (
    <>
      <Title p="sm" order={4}>
        Menu Items
      </Title>
      <MenuList />
    </>
  );
}
