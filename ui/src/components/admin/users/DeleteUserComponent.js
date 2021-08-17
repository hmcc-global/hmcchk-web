import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
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
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";

const DeleteUser = ({ props }) => {
  const toast = useToast();
  const [user, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);
  const { handleSubmit, register } = useForm();

  const getData = async () => {
    try {
      const id = props;
      const { data } = await axios.get("/api/users/get", { userId: id });
      setUsers(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshHandler = () => {
    getData();
  };

  const data = user;

  const onDeleteSubmit = async (data, e) => {
    // Format the data
    setEditData(data);

    if (data.isDeleted == "true") {
      data.isDeleted = true;
    }

    const status = await axios.put("/api/users/update", {
      params: data,
    });

    console.log(status);
    console.log(status.status);

    if (status.status === 200) {
      toast({
        title: "Success!",
        description: "User deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" colorScheme="red" onClick={onOpen}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onDeleteSubmit)}>
          <ModalContent>
            <ModalHeader>Delete User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this user?
              <VisuallyHiddenInput defaultValue={data.id} {...register("id")} />
              <VisuallyHiddenInput value="true" {...register("isDeleted")} />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" type="submit">
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default DeleteUser;
