import RoomList from "./RoomList";
import { Title } from "@mantine/core";

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
