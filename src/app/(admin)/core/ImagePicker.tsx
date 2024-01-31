import {
  Text,
  Image,
  Paper,
  ActionIcon,
  Flex,
  Box,
  Loader,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/lib/config/firebase";
import { IconPhoto, IconTrashFilled } from "@tabler/icons-react";

type Props = {
  value?: string | null;
  onChange?: (value: string | null) => void;
  label: string;
  imageRef: string;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
  onFocused?: () => void;
  onBlurred?: () => void;
  height?: number;
};

export default function ImagePicker(props: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null | undefined>();

  useEffect(() => {
    setImage(props.value ? props.value : null);
  }, [props.value]);

  function handleDelete() {
    setImage(null);
    if (props.onChange) props.onChange(null);
    const fileRef = ref(storage, props.imageRef);
    deleteObject(fileRef);
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setUploading(true);
    try {
      const fileRef = ref(storage, props.imageRef);
      if (inputRef.current?.files?.length) {
        const file = inputRef.current.files[0];
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        console.log({ url });
        setImage(url);
        if (props.onChange) props.onChange(url);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleUpload}
        hidden
      />
      <Text size="sm" fw={"bold"} mb={5}>
        {props.label}
      </Text>
      <Paper withBorder p="sm" h={props.height || 300} w="100%">
        {image ? (
          <ImageDisplay image={image} handleDelete={handleDelete} />
        ) : (
          <UploadButton
            uploading={uploading}
            inputRef={inputRef}
            disabled={props.disabled}
          />
        )}
      </Paper>
    </>
  );
}

function ImageDisplay({
  image,
  handleDelete,
}: {
  image: string;
  handleDelete: () => void;
}) {
  return (
    <Box w="100%" h="100%" pos="relative">
      <Image src={image} alt="" width="100%" height="100%" fit="contain" />
      <Flex
        pos="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        justify="center"
        align="center"
      >
        <ActionIcon color="red" onClick={handleDelete}>
          <IconTrashFilled size="1rem" />
        </ActionIcon>
      </Flex>
    </Box>
  );
}

function UploadButton({
  uploading,
  inputRef,
  disabled,
}: {
  uploading: boolean;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <Flex justify="center" align="center" h={"100%"} w={"100%"}>
      {uploading ? (
        <Loader />
      ) : (
        <ActionIcon
          variant="default"
          size="xl"
          disabled={disabled}
          onClick={() => inputRef?.current?.click()}
        >
          <IconPhoto />
        </ActionIcon>
      )}
    </Flex>
  );
}
