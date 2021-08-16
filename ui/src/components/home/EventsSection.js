import {
  chakra,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { getRenderDate } from "../helpers/eventsHelpers";
import EventsSectionCard from "./EventsSectionCards";
import FeaturedEvent from "./FeaturedEvent";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [images, setImages] = useState([]);

  const populateData = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/announcements/get-announcements"
      );
      const filtered = data.filter((item) => {
        if (item.endDate) {
          const endDate = new DateTime.fromISO(item.endDate);
          const renderDate = getRenderDate(
            item.startDate,
            item.endDate,
            item.recurrence
          );
          item.renderDate = renderDate;
          return endDate > DateTime.now();
        } else return false;
      });
      filtered.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
      let upcoming = filtered.slice(0, 5);
      setEvents([...upcoming]);
      let imagesLink = [];
      upcoming.forEach((u) => {
        imagesLink.push(u.imageUrl);
      });
      setImages(imagesLink);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    populateData();
  }, []);

  console.log(images);
  return (
    <Flex w="full" h="100vh" direction="column">
      <Container
        maxW={["container.md", "container.lg"]}
        justifyContent="center"
        display="flex"
        h="50%"
      >
        <VStack>
          <FeaturedEvent />
        </VStack>
      </Container>
      <Box
        w="full"
        height="50vh"
        display="flex"
        justifyContent="flex-start"
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
      >
        <HStack spacing={4} padding={5} justifyContent="flex-start">
          {images.length > 0 &&
            images.map((img, i) => (
              <EventsSectionCard
                width="500px"
                height="auto"
                url={img}
                key={"event" + i}
              />
            ))}
        </HStack>
      </Box>
    </Flex>
  );
};

export default EventsSection;
