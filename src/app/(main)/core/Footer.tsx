import { db } from "@/lib/firebase";
import { DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function FooterWrapper() {
  const snapshot = getDoc(doc(db, "pages", "about-us"));
  return (
    <footer className="flex h-screen items-end pb-32">
      <Suspense fallback={<div>Loading...</div>}>
        <Footer docSnapshot={snapshot} />
      </Suspense>
    </footer>
  );
}

type Props = {
  docSnapshot: Promise<DocumentSnapshot>;
};

async function Footer({ docSnapshot }: Props) {
  const page = (await docSnapshot).data() as AboutUs;
  return (
    <div className="container mx-auto px-4 pt-16 sm:max-w-xl md:max-w-full md:px-24 lg:w-screen lg:px-28">
      <div className="row-gap-6 mb-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <Image
              src={"/images/logo.png"}
              className="h-32 object-contain"
              alt="logo"
            />
          </Link>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800">{page.aboutUs}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">
            Contacts
          </p>
          <div className="flex">
            <p className="mr-1 text-gray-800">Phone:</p>
            <Link
              href={`tel:${page.phoneNumber}`}
              aria-label="Our phone"
              title="Our phone"
              className="text-deep-purple-accent-400 hover:text-deep-purple-800 transition-colors duration-300"
            >
              {page.phoneNumber}
            </Link>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <Link
              href={`mailto:${page.email}`}
              aria-label="Our email"
              title="Our email"
              className="text-deep-purple-accent-400 hover:text-deep-purple-800 transition-colors duration-300"
            >
              {page.email}
            </Link>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Address:</p>
            <Link
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="text-deep-purple-accent-400 hover:text-deep-purple-800 transition-colors duration-300"
            >
              {page.address}
            </Link>
          </div>
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-gray-900">
            Social
          </span>
          <div className="mt-1 flex items-center space-x-3">
            <Link
              target="_blank"
              href={page.twitter}
              className="hover:text-deep-purple-accent-400 text-gray-500 transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              </svg>
            </Link>
            <Link
              target="_blank"
              href={page.instagram}
              className="hover:text-deep-purple-accent-400 text-gray-500 transition-colors duration-300"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </Link>
            <Link
              target="_blank"
              href={page.facebook}
              className="hover:text-deep-purple-accent-400 text-gray-500 transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between border-t pb-10 pt-5 lg:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright {new Date().getFullYear()} Thabeng Lodge and Restaurant.
          All rights reserved.
        </p>
        <ul className="mb-3 flex flex-col space-y-2 sm:flex-row sm:space-x-5 sm:space-y-0 lg:mb-0">
          <li>
            <a
              href="/"
              className="hover:text-deep-purple-accent-400 text-sm text-gray-600 transition-colors duration-300"
            >
              F.A.Q
            </a>
          </li>
          <li>
            <a
              href="/"
              className="hover:text-deep-purple-accent-400 text-sm text-gray-600 transition-colors duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/"
              className="hover:text-deep-purple-accent-400 text-sm text-gray-600 transition-colors duration-300"
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
