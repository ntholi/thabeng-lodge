"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Link } from "@nextui-org/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/config/firebase";
import { Button, ButtonProps } from "@nextui-org/react";

export default function BookingButton(props: ButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [phone, setPhone] = useState("Loading...");

  useEffect(() => {
    getDoc(doc(db, "pages", "about-us")).then((snapshot) => {
      const data = snapshot.data();
      if (data) {
        setPhone(data.phoneNumber);
      }
    });
  }, []);

  return (
    <>
      <Button color="primary" radius="none" onClick={onOpen} {...props}>
        {props.children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Booking</ModalHeader>
              <ModalBody>
                <p>
                  For booking or any enquiries please call use at
                  <Link href="tel:1234567890" color="primary">
                    {phone}
                  </Link>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Okay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
