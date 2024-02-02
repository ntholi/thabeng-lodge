import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import AppNav from "./core/AppNav";
import Footer from "./core/Footer";
import SessionProvider from "../(admin)/appshell/SessionProvider";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thabeng Hotel",
  description: "Thabeng Hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <AppNav />
        <SessionProvider>{children}</SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
