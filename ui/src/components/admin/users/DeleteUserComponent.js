import React from "react";
import { customAxios as axios } from "../../helpers/customAxios";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";

const DeleteUser = ({ data: payload, row, refreshCallback }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const data = payload[row];

  const onDeleteSubmit = async () => {
    // Format the data
    data.isDeleted = true;

    const status = await axios.put("/api/users/update", {
      params: data,
    });

    if (status.status === 200) {
      toast({
        title: "Success!",
        description: "User deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Something went wrong.",
        description: "Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
    refreshCallback();
  };

  return (
    <>
      <Button size="sm" colorScheme="red" onClick={onOpen}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this user?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDeleteSubmit}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUser;
