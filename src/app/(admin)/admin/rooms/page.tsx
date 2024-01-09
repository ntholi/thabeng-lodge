import RoomList from "./RoomList";
import { Title } from "@mantine/core";

export default async function SupportUs() {
  return (
    <>
      <Title p="sm" order={4}>
        Room Items
      </Title>
      <RoomList />
    </>
  );
}
