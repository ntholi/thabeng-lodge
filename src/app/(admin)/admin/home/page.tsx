import { doc, getDoc } from "firebase/firestore";
import Form from "./Form";
import { db } from "@/lib/config/firebase";

export const dynamic = "force-dynamic";

export default async function SupportUs() {
  const page = (await getDoc(doc(db, "pages", "home-page"))).data() as HomePage;
  return <Form page={page} />;
}
