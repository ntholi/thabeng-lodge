import React from "react";

type Props = {
  image: string;
  title: string;
  description: string;
};
export default function CommonHeader({ image, title, description }: Props) {
  return (
    <header
      style={{
        backgroundImage: `url(${image})`,
      }}
      className={`flex h-[40vh] flex-col items-center justify-center bg-black/50  bg-cover bg-center text-white bg-blend-overlay`}
    >
      <h1 className="text-center text-5xl font-bold uppercase">{title}</h1>
      <p className="mt-3 text-center text-lg">{description}</p>
    </header>
  );
}
