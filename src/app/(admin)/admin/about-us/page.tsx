import { doc, getDoc } from "firebase/firestore";
import Form from "./Form";
import { db } from "@/lib/config/firebase";

export const dynamic = 'force-dynamic';

export default async function AboutUs() {
  const page = (await getDoc(doc(db, "pages", "about-us"))).data() as AboutUs;
  return <Form page={page} />;
}
