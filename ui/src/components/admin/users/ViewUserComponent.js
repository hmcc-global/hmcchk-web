import React, { useEffect, useState } from "react";
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
  List,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const ViewUser = ({ props }) => {
  const [user, setUsers] = useState([]);

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
  console.log(data);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        View
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Profile Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem>Full Name: {data.fullName}</ListItem>
              <ListItem>Email: {data.email}</ListItem>
              <ListItem>Access Type: {data.accessType}</ListItem>
              <ListItem>Country of Origin: {data.countryOfOrigin}</ListItem>
              <ListItem>Campus: {data.campus}</ListItem>
              <ListItem>Life Stage: {data.lifestage}</ListItem>
              <ListItem>LIFE Group: {data.lifeGroup}</ListItem>
              <ListItem>Address: {data.address}</ListItem>
              <ListItem>Phone Number: {data.phoneNumber}</ListItem>
              <ListItem>Birthday: {data.birthday}</ListItem>
              <ListItem>Member: {data.isMember}</ListItem>
              <ListItem>Baptised: {data.isBaptised}</ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewUser;
