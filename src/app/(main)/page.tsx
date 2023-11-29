import { db } from '@/lib/firebase';
import { Button } from '@nextui-org/button';
import { doc, getDoc } from 'firebase/firestore';

export default async function Home() {
  const page = (await getDoc(doc(db, 'pages', 'home-page'))).data() as HomePage;
  return (
    <>
      <header className='mt-20'>here: {page.tagline}</header>
      <main>
        <Button>Click Me</Button>
      </main>
    </>
  );
}
