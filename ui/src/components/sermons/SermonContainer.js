import { useEffect, useState, useRef, useCallback } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import { Box, Container, Heading } from "@chakra-ui/react";
import UpcomingSermon from "./UpcomingSermon";
import SermonCardList from "./SermonCardList";
import CurrentSermon from "./CurrentSermon";
import { DateTime } from "luxon";
import { getRenderDate } from "../helpers/eventsHelpers";

const SermonContainer = (props) => {
  const [sermons, setSermons] = useState([]);
  const [events, setEvents] = useState([]);
  const prevScrollY = useRef(0);
  const [display, setDisplay] = useState("");
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    getData();
    getEvent();
    const id = props.match.params;
    if (id != null) {
      // call function to open sermoncard
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const getData = async () => {
    try {
      const { data, status } = await axios.get("/api/sermons/get-sermons");
      if (status === 200) {
        
        setSermons([...data]);
      } else {
        throw Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getEvent = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/announcements/get-announcements"
      );
      if (status === 200) {
        const filtered = data.filter((item) => {
          if (item.endDate) {
            // Add one day to offset end date to end of day
            let endDate = new DateTime.fromISO(item.endDate).plus({ days: 1 });
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
        setEvents([...filtered]);
      } else {
        throw Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
console.log("test")
console.log(prevScrollY.current)
  return (
    <>
      <UpcomingSermon upcoming={events} />
      <Container maxW="container.lg">
        <Box
          marginTop="20px"
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/sermons-banner.png')`}
          bgPosition="center"
          bgSize="cover"
          flex={1}
          textAlign="center"
          justifyContent="center"
          px={[8, 10]}
          py={[8, 12]}
          m={2}
          display={{ base: "none", md: "flex" }}
        >
          <Heading size="2xl" color="white" fontWeight="900">
            Sermons
          </Heading>
        </Box>
        <Heading
          size="2xl"
          color="black"
          justifyContent="center"
          fontWeight="900"
          display={{ base: "flex", md: "none" }}
        >
          Sermons
        </Heading>
        <CurrentSermon currentSermon={sermons[0]} />
        <SermonCardList allSermons={sermons} />
      </Container>
    </>
  );
};

export default SermonContainer;
