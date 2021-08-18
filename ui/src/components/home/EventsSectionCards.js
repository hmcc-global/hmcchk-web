import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  Text,
  ButtonGroup,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

import { RiCalendarEventFill } from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { getRenderDate } from "../helpers/eventsHelpers";
import { DateTime } from "luxon";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { generateGoogleCalendarLink } from "../helpers/eventsHelpers";
import { useState } from "react";

const EventsSectionCard = (props) => {
  const { width, height, event } = props;
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
      <Box borderRadius={10} w={width} h={height} onClick={onOpen}>
        <VStack justifyContent="space-between">
          <AspectRatio mb="5" width="full" ratio={16 / 9}>
            <Image borderRadius={10} objectFit="cover" src={event.imageUrl} />
          </AspectRatio>
          <HStack direction="space-between" spacing={[2, 6]}>
            <Button
              as={Link}
              target="_blank"
              href={event.signUpLink ? event.signUpLink : null}
              isDisabled={event.signUpLink.length <= 0}
              w={["8em", "10em"]}
              fontSize={["0.8em", "1.3em"]}
            >
              SIGN UP
            </Button>
            <Button
              onClick={onOpen}
              w={["8em", "10em"]}
              fontSize={["0.8em", "1.3em"]}
            >
              LEARN MORE
            </Button>
          </HStack>
        </VStack>
      </Box>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <AspectRatio mb="5" width="100%" ratio={16 / 9}>
            <Image
              borderTopLeftRadius="20"
              borderTopRightRadius="20"
              src={event.imageUrl}
              objectFit="cover"
            />
          </AspectRatio>
          <ModalCloseButton />
          {event.title && (
            <ModalHeader
              ml={[0, 16]}
              mr={[0, 16]}
              fontWeight="900"
              fontSize={["2xl", "3xl"]}
            >
              {event.title}
            </ModalHeader>
          )}
          <ModalBody ml={[0, 16]} mr={[0, 16]}>
            <Box>
              {event.startDate && event.endDate && event.recurrence && (
                <Text fontSize={["sm", "md"]} fontWeight="bold">
                  <Icon mr={2} as={RiCalendarEventFill} />
                  Date:{" "}
                  {event.renderDate
                    ? event.renderDate.toLocaleString(
                        DateTime.DATE_MED_WITH_WEEKDAY
                      )
                    : getRenderDate(
                        event.startDate,
                        event.endDate,
                        event.recurrence
                      ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                </Text>
              )}
              {event.time && (
                <Text fontSize={["sm", "md"]} fontWeight="bold">
                  <Icon mr={2} as={BsClockFill} />
                  Time: {event.time}
                </Text>
              )}
              {event.location && (
                <Text fontSize={["sm", "md"]} fontWeight="bold">
                  <Icon mr={2} as={ImLocation2} />
                  Location: {event.location}
                </Text>
              )}
            </Box>
            <Box fontSize="sm" mt="5">
              {parse(event.description, options)}
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
              <Button
                flex={[false, 1]}
                as={Link}
                target="_blank"
                href={event.mapLink ? event.mapLink : null}
                isDisabled={event.mapLink.length <= 0}
              >
                Directions
              </Button>
              <Button
                flex={[false, 1]}
                mt={[2, 0]}
                as={Link}
                target="_blank"
                href={event.signUpLink ? event.signUpLink : null}
                isDisabled={event.signUpLink.length <= 0}
              >
                Sign up
              </Button>
              <Button
                flex={[false, 1]}
                mt={[2, 0]}
                as={Link}
                target="_blank"
                href={generateGoogleCalendarLink(event)}
                isDisabled={generateGoogleCalendarLink(event) ? false : true}
              >
                Add to Calendar
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventsSectionCard;
