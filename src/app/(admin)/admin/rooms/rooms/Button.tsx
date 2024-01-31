import { Card, Loader, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
  isLoading?: boolean;
};

export default function NewPressButton({ onClick, isLoading }: Props) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader size="3rem" color="gray" />
      ) : (
        <IconPlus color="gray" size="3rem" />
      )}
      <Text c="dimmed" size="sm">
        New
      </Text>
    </Card>
  );
}
