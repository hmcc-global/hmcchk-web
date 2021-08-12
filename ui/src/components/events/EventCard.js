import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Link,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getRenderDate } from "../helpers/eventsHelpers";
import { DateTime } from "luxon";
import parse, { domToReact, attributesToProps } from "html-react-parser";

const EventCard = (props) => {
  const { eventData } = props;

  const [isOpen, setIsOpen] = useState(false);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const onOpen = (e) => {
    if(!e.target.href) {
      setIsOpen(true);
    }
  };

  const onClose = (e) => {
    setIsOpen(false);
  };

  const options = {
    replace: (domNode) => {
      if (domNode.name === "p") {
        return <Text mb="1">{domToReact(domNode.children, options)}</Text>;
      } else if (domNode.name === "ul") {
        return (
          <UnorderedList mb="1">
            {domToReact(domNode.children, options)}
          </UnorderedList>
        );
      } else if (domNode.name === "ol") {
        return (
          <OrderedList mb="2">
            {domToReact(domNode.children, options)}
          </OrderedList>
        );
      } else if (domNode.name === "li") {
        return <ListItem>{domToReact(domNode.children, options)}</ListItem>;
      } else if (domNode.name === "a") {
        return (
          <Link color="teal.500" {...attributesToProps(domNode.attribs)}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
    },
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="20"
        overflow="hidden"
        bg="white"
        shadow="lg"
        p="5"
        onClick={onOpen}
      >
        <AspectRatio mb="5" width="100%" ratio={16 / 9}>
          <Image borderRadius="20" src={eventData.imageUrl} objectFit="cover" />
        </AspectRatio>
        <Box minHeight="250">
          <Heading as="h4" mb="5" size="lg">
            {eventData.title}
          </Heading>
          {eventData.startDate && eventData.endDate && eventData.recurrence && (
            <Text fontSize="18" fontWeight="bold">
              Date:{" "}
              {eventData.renderDate
                ? eventData.renderDate.toLocaleString(
                    DateTime.DATE_MED_WITH_WEEKDAY
                  )
                : getRenderDate(
                    eventData.startDate,
                    eventData.endDate,
                    eventData.recurrence
                  ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </Text>
          )}
          {eventData.location && (
            <Text fontSize="18" fontWeight="bold">
              Location:{" "}
              {eventData.mapLink ? (
                <Link href={eventData.mapLink}>{eventData.location}</Link>
              ) : (
                eventData.location
              )}
            </Text>
          )}
          {eventData.time && (
            <Text fontSize="18" fontWeight="bold">
              Time: {eventData.time}
            </Text>
          )}
          <Text fontSize="14" mt="5" noOfLines="4">
            {parse(eventData.description, options)}
          </Text>
        </Box>
        <Stack mt="5" direction="row" justifyContent="center" spacing={2}>
          <Button size="sm" w="50%" as={Link}>
            Add to Calendar
          </Button>
          {eventData.signUpLink && (
            <Button size="sm" w="50%" as={Link} href={eventData.signUpLink}>
              Sign Up
            </Button>
          )}
        </Stack>
      </Box>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {eventData.title && <ModalHeader>{eventData.title}</ModalHeader>}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventCard;
