import { doc, getDoc } from "firebase/firestore";
import Form from "./Form";
import { db } from "@/lib/firebase";
import MenuList from "./MenuList";
import { Divider, Space, Title } from "@mantine/core";

export default async function SupportUs() {
  const page = (await getDoc(doc(db, "pages", "restaurant-page"))).data();
  return (
    <>
      <Form page={page as RestaurantPage} />
      <Divider my="xl" />
      <Title p="sm" order={4}>
        Menu Items
      </Title>
      <MenuList />
    </>
  );
}
