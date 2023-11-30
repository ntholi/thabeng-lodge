import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import AppNav from "./core/AppNav";
import Footer from "./core/Footer";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thabeng Lodge",
  description: "Thabeng Lodge",
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
        {children}
      </body>
    </html>
  );
}
