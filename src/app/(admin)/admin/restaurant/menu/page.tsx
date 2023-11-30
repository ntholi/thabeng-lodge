import { doc, getDoc } from "firebase/firestore";
import Form from "../page/Form";
import { db } from "@/lib/firebase";
import MenuList from "./MenuList";
import { Divider, Space, Title } from "@mantine/core";

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
