import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/modal";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GSModal({
  children,
  title,
  isOpen,
  onOpenChange,
}: IProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}