import React from "react";
import { useForm } from "react-hook-form";
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
  Stack,
  Input,
  FormControl,
  FormLabel,
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";

const AddGiving = ({ payload, refreshCallback }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    // Format the data

    data.tithely = data.tithely.replace(" ", "").split(",");
    data.aliases = data.aliases.replace(" ", "").split(",");

    const status = await axios.post("/api/giving/create", {
      userId: payload.id,
      tithely: data.tithely,
      aliases: data.aliases,
    });

    if (status.status === 200) {
      toast({
        title: "Success!",
        description: "Giving information created.",
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
    return status;
  };

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        Add
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add Giving Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <Stack>
                  {/* <VisuallyHiddenInput
                    defaultValue={payload.id}
                    {...register("id")}
                  /> */}
                  <FormLabel>Tithely IDs</FormLabel>
                  <Input {...register("tithely")} />
                  <FormLabel>Known Aliases</FormLabel>
                  <Input {...register("aliases")} />
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" type="submit">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddGiving;
