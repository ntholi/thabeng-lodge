import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import NextImage from "next/image";

type Props = {
  item: MenuItem;
};

export default function ItemCard({ item }: Props) {
  return (
    <Card isFooterBlurred className={"h-full w-full"}>
      <CardHeader className="absolute top-0 z-10 flex-col items-start bg-gradient-to-b from-black/25 to-black/0 pb-10">
        <h4 className="text-sm font-bold text-green-50">
          M{item.price.toFixed(2)}
        </h4>
        <h3 className="text-3xl font-medium text-white">{item.name}</h3>
      </CardHeader>
      <Image
        removeWrapper
        isZoomed
        as={NextImage}
        height={600}
        width={600}
        alt="Relaxing app background"
        className="z-0 h-full w-full object-cover"
        src={item.image}
      />
      <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 p-5 text-sm text-white dark:border-default-100">
        {item.description}
      </CardFooter>
    </Card>
  );
}
