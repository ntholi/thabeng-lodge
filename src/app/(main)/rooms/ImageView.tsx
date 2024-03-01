"use client";
import { Room } from "@/app/(admin)/admin/rooms/model";
import React from "react";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

type Props = {
  room: Room;
};

export default function ImageView({ room }: Props) {
  const { image, image2, image3, image4 } = room;
  const [currentImage, setCurrentImage] = React.useState(image);
  return (
    <div>
      <div className="w-full">
        <Image
          as={NextImage}
          isZoomed
          className="h-full w-full object-cover sm:h-96"
          width={1100}
          height={1100}
          src={currentImage ?? "/images/no-image.webp"}
          alt={currentImage}
        />
      </div>
      <div className="mt-5 flex space-x-2">
        <ImagePreview image={image} setCurrentImage={setCurrentImage} />
        <ImagePreview image={image2} setCurrentImage={setCurrentImage} />
        <ImagePreview image={image3} setCurrentImage={setCurrentImage} />
        <ImagePreview image={image4} setCurrentImage={setCurrentImage} />
      </div>
    </div>
  );
}

function ImagePreview({
  image,
  setCurrentImage,
}: {
  image?: string;
  setCurrentImage: (image: string) => void;
}) {
  if (!image) return null;
  return (
    <div
      className="relative flex h-12 w-16 cursor-pointer"
      onClick={() => setCurrentImage(image)}
    >
      <div className="absolute inset-0 z-50 rounded-md bg-white/30 transition-all duration-300 hover:bg-white/0" />
      <Image
        as={NextImage}
        src={image ?? ""}
        className="h-full w-full rounded-md object-cover"
        width={100}
        radius="sm"
        height={100}
        alt="room"
      />
    </div>
  );
}
