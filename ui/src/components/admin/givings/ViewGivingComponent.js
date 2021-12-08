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

const ViewGiving = ({ payload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(payload.givingInfo[0]);
  if (payload.givingInfo[0] != undefined) {
    payload.givingInfo.tithely = payload.givingInfo[0].tithely.toString();
    payload.givingInfo.aliases = payload.givingInfo[0].aliases.toString();
  }

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        View
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Giving Profile Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem>Full Name: {payload.fullName}</ListItem>
              if (this.payload.givingInfo[0])
              {
                <>
                  <ListItem>Tithely IDs: {payload.givingInfo.tithely}</ListItem>
                  <ListItem>
                    Known Aliases: {payload.givingInfo.aliases}
                  </ListItem>
                </>
              }
              <ListItem>Campus: {payload.campus}</ListItem>
              <ListItem>Life Stage: {payload.lifestage}</ListItem>
              <ListItem>LIFE Group: {payload.lifeGroup}</ListItem>
              <ListItem>Ministry Team: {payload.ministryTeam}</ListItem>
              <ListItem>Member: {payload.isMember}</ListItem>
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

export default ViewGiving;
