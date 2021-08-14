import {
  Icon,
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
  ButtonGroup,
} from "@chakra-ui/react";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { useState } from "react";
import { getRenderDate } from "../helpers/eventsHelpers";
import { DateTime } from "luxon";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { generateGoogleCalendarLink } from "../helpers/eventsHelpers";

const EventCard = (props) => {
  const { eventData } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (e) => {
    if (!e.target.href) {
      setIsOpen(true);
    }
  };

  const onClose = (e) => {
    setIsOpen(false);
  };

  const options = {
    replace: (domNode) => {
      if (domNode.name === "p") {
        return <Text mb="2">{domToReact(domNode.children, options)}</Text>;
      } else if (domNode.name === "ul") {
        return (
          <UnorderedList marginInlineStart="1.25em" mb="2">
            {domToReact(domNode.children, options)}
          </UnorderedList>
        );
      } else if (domNode.name === "ol") {
        return (
          <OrderedList marginInlineStart="1.25em" mb="2">
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
        p={[4, 10]}
        onClick={onOpen}
      >
        <AspectRatio mb="5" width="100%" ratio={16 / 9}>
          <Image borderRadius="20" src={eventData.imageUrl} objectFit="cover" />
        </AspectRatio>
        <Box height={["200", "280"]} overflow="hidden" position="relative">
          <Heading as="h4" mb="5" size="lg" fontWeight="900" isTruncated>
            {eventData.title}
          </Heading>
          {eventData.startDate && eventData.endDate && eventData.recurrence && (
            <Text fontSize={["sm", "lg"]} fontWeight="bold">
              <Icon mr={2} as={RiCalendarEventFill} />
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
          {eventData.time && (
            <Text fontSize={["sm", "lg"]} fontWeight="bold">
              <Icon mr={2} as={BsClockFill} />
              Time: {eventData.time}
            </Text>
          )}
          {eventData.location && (
            <Text fontSize={["sm", "lg"]} fontWeight="bold">
              <Icon mr={2} as={ImLocation2} />
              Location: {eventData.location}
            </Text>
          )}
          <Text fontSize={["xs", "md"]} mt="5">
            {parse(eventData.description, options)}
          </Text>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            w="100%"
            h="25%"
            background="linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); "
          ></Box>
        </Box>
        <Stack mt="5" direction="row" justifyContent="center" spacing={2}>
          {eventData.signUpLink.length > 0 && (
            <Button
              flex={1}
              as={Link}
              size="sm"
              target="_blank"
              href={eventData.signUpLink ? eventData.signUpLink : false}
              isDisabled={eventData.signUpLink.length <= 0}
              fontSize={["xs", "sm"]}
            >
              Sign up
            </Button>
          )}
          {generateGoogleCalendarLink(eventData) && (
            <Button
              flex={1}
              as={Link}
              size="sm"
              target="_blank"
              href={generateGoogleCalendarLink(eventData)}
              fontSize={["xs", "sm"]}
            >
              Add to Calendar
            </Button>
          )}
        </Stack>
      </Box>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <AspectRatio mb="5" width="100%" ratio={16 / 9}>
            <Image
              borderTopLeftRadius="20"
              borderTopRightRadius="20"
              src={eventData.imageUrl}
              objectFit="cover"
            />
          </AspectRatio>
          <ModalCloseButton />
          {eventData.title && (
            <ModalHeader
              ml={[0, 16]}
              mr={[0, 16]}
              fontWeight="900"
              fontSize={["2xl", "3xl"]}
            >
              {eventData.title}
            </ModalHeader>
          )}
          <ModalBody ml={[0, 16]} mr={[0, 16]}>
            <Box>
              {eventData.startDate &&
                eventData.endDate &&
                eventData.recurrence && (
                  <Text fontSize={["sm", "md"]} fontWeight="bold">
                    <Icon mr={2} as={RiCalendarEventFill} />
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
              {eventData.time && (
                <Text fontSize={["sm", "md"]} fontWeight="bold">
                  <Icon mr={2} as={BsClockFill} />
                  Time: {eventData.time}
                </Text>
              )}
              {eventData.location && (
                <Text fontSize={["sm", "md"]} fontWeight="bold">
                  <Icon mr={2} as={ImLocation2} />
                  Location: {eventData.location}
                </Text>
              )}
            </Box>
            <Box fontSize="sm" mt="5">
              {parse(eventData.description, options)}
            </Box>
          </ModalBody>
          <ModalFooter ml={[0, 16]} mr={[0, 16]}>
            <ButtonGroup
              size="md"
              flexDirection={["column", "row"]}
              spacing={[0, 2]}
              w="100%"
              variant="outline"
              colorScheme="gray"
            >
              {eventData.mapLink.length > 0 && (
                <Button
                  flex={[false, 1]}
                  as={Link}
                  target="_blank"
                  href={eventData.mapLink ? eventData.mapLink : false}
                >
                  Directions
                </Button>
              )}
              {eventData.signUpLink.length > 0 && (
                <Button
                  flex={[false, 1]}
                  mt={[2, 0]}
                  as={Link}
                  target="_blank"
                  href={eventData.signUpLink ? eventData.signUpLink : false}
                >
                  Sign up
                </Button>
              )}

              {generateGoogleCalendarLink(eventData) && (
                <Button
                  flex={[false, 1]}
                  mt={[2, 0]}
                  as={Link}
                  target="_blank"
                  href={generateGoogleCalendarLink(eventData)}
                >
                  Add to Calendar
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventCard;
