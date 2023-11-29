import { db } from '@/lib/firebase';
import { Button } from '@nextui-org/button';
import { doc, getDoc } from 'firebase/firestore';

export default async function Home() {
  const page = (await getDoc(doc(db, 'pages', 'home-page'))).data() as HomePage;
  return (
    <>
      <header
        style={{
          backgroundImage: `url(${page.banner})`,
        }}
        className={`h-screen flex flex-col justify-center items-center bg-blend-overlay  bg-black/60 bg-center bg-cover text-white`}
      >
        <h1 className='border border-white px-10 py-5 text-3xl uppercase'>
          Thabeng Lodge
        </h1>
        <p className='mt-5 text-sm uppercase tracking-wide'>{page.tagline}</p>
      </header>
      <main>
        <Button>Click Me</Button>
      </main>
    </>
  );
}
