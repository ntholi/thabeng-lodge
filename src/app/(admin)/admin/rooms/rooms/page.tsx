import RoomList from "./RoomList";
import { Title } from "@mantine/core";

export const dynamic = "force-dynamic";

export default function RoomsPage() {
  return (
    <>
      <Title p="sm" order={4}>
        Room Items
      </Title>
      <RoomList />
    </>
  );
}
