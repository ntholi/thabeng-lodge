import { doc, getDoc } from 'firebase/firestore';
import Form from './Form';
import { db } from '@/lib/firebase';

export default async function SupportUs() {
  const page = (await getDoc(doc(db, 'pages', 'home-page'))).data() as HomePage;
  return <Form page={page} />;
}
