import React from "react";
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
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

const ViewUser = ({ data, row }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (data[row].address != null) {
    data[row].addressFlat = data[row].address.flat;
    data[row].addressFloor = data[row].address.floor;
    data[row].addressStreet = data[row].address.street;
    data[row].addressDistrict = data[row].address.district;
    data[row].addressRegion = data[row].address.region;
  }

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
              <ListItem>Full Name: {data[row].fullName}</ListItem>
              <ListItem>Email: {data[row].email}</ListItem>
              <ListItem>Access Type: {data[row].accessType}</ListItem>
              <ListItem>
                Country of Origin: {data[row].countryOfOrigin}
              </ListItem>
              <ListItem>Campus: {data[row].campus}</ListItem>
              <ListItem>Life Stage: {data[row].lifestage}</ListItem>
              <ListItem>LIFE Group: {data[row].lifeGroup}</ListItem>
              <ListItem>Ministry Team: {data[row].ministryTeam}</ListItem>
              <ListItem>
                Address:
                <UnorderedList>
                  <ListItem>Flat: {data[row].addressFlat}</ListItem>
                  <ListItem>Floor: {data[row].addressFloor}</ListItem>
                  <ListItem>Street: {data[row].addressStreet}</ListItem>
                  <ListItem>District: {data[row].addressDistrict}</ListItem>
                  <ListItem>Region: {data[row].addressRegion}</ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>Phone Number: {data[row].phoneNumber}</ListItem>
              <ListItem>Birthday: {data[row].birthday}</ListItem>
              <ListItem>Member: {data[row].isMember}</ListItem>
              <ListItem>Baptised: {data[row].isBaptised}</ListItem>
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
