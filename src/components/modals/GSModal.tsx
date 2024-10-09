import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

interface IProps {
  buttonText: string;
  children: ReactNode;
  title: string;
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  buttonSize?: "sm" | "md" | "lg" | undefined;
  disable?: boolean,
}

export default function GSModal({
  buttonText,
  children,
  title,
  buttonVariant = "solid",
  buttonClassName,
  buttonSize="md",
  disable,
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size={buttonSize} isDisabled={disable} className={buttonClassName} variant={buttonVariant} onPress={onOpen}>
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
