import { doc, getDoc } from "firebase/firestore";
import Form from "./Form";
import { db } from "@/lib/firebase";

export default async function AboutUs() {
  const page = (await getDoc(doc(db, "pages", "about-us"))).data() as AboutUs;
  return <Form page={page} />;
}
