import {
  HStack,
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Image,
  Link,
  Text,
  Container,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import RelatedSermonCard from "./RelatedSermonCard";
import { customAxios as axios } from "../helpers/customAxios";
import { DateTime } from "luxon";
import { DATE_FULL } from "luxon/src/impl/formats";
import React, { useState, useEffect } from "react";

const SermonDetails = (props) => {
  const [sermon, setSermon] = useState();
  const [allSermons, setAllSermons] = useState([]);
  const [relatedSermons, setRelatedSermons] = useState([]);
  const [sermonVideoCode, setSermonVideoCode] = useState();
  const [sermonDate, setSermonDate] = useState();
  const [randomSermons, setRandomSermons] = useState([]);
  const currId = props.match.params.id;

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [currId]);

  const getData = async () => {
    try {
      const { data, status } = await axios.get("/api/sermons/get-sermons");
      if (status === 200) {
        let currentSermon = data.find(({ id }) => id == parseInt(currId));
        if (!currentSermon) {
          // TODO-richie
          // redirect to 404 page
          return;
        }
        setAllSermons([...data]);
        setSermon(currentSermon);
      } else {
        throw Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (allSermons && sermon) {
      getRelatedSermons();
      getSermonDate();
      getVideoCode();
      getRandomSermons();
    }
  }, [allSermons, sermon]);

  const getRelatedSermons = () => {
    let relatedSermon = allSermons
      .filter((related) => {
        return (
          related.sermonSeries &&
          related.sermonSeries[0].name.includes(
            sermon.sermonSeries && sermon.sermonSeries[0].name
          ) &&
          related.id !== sermon.id
        );
      })
      .slice(0, 5);
    setRelatedSermons(relatedSermon);
  };

  const getSermonDate = () => {
    let sermonDate = DateTime.fromISO(sermon.datePreached).toLocaleString(
      DATE_FULL
    );
    setSermonDate(sermonDate);
  };

  const getVideoCode = () => {
    let sermonVideoCode =
      sermon.sermonVideoUrl.split("/")[
        sermon.sermonVideoUrl.split("/").length - 1
      ];
    setSermonVideoCode(sermonVideoCode);
  };

  const getRandomSermons = () => {
    let sameYearSermons = allSermons.filter(
      (random) =>
        DateTime.fromISO(sermon.datePreached).hasSame(
          DateTime.fromISO(random.datePreached),
          "year"
        ) && random.sermonSeries[0].name !== sermon.sermonSeries[0].name
    );
    let randomSermons = [];
    while (randomSermons.length < 5) {
      randomSermons.push(
        sameYearSermons[Math.floor(Math.random() * sameYearSermons.length)]
      );
      randomSermons = [...new Set(randomSermons)];
    }
    randomSermons = randomSermons.sort(
      (a, b) =>
        DateTime.fromISO(b.datePreached) - DateTime.fromISO(a.datePreached)
    );
    setRandomSermons(randomSermons);
  };

  return (
    <>
      {sermon && allSermons && (
        <Container maxW="container.lg">
          <Box mb="20px" mt="20px">
            <VStack alignItems="left" alignContent="left">
              <Link href="/sermons">
                <Button
                  variant="link"
                  fontSize="lg"
                  color="black"
                  justifyContent="left"
                  leftIcon={<ChevronLeftIcon />}
                  display={{ base: "none", md: "flex" }}
                >
                  See all past sermons
                </Button>
              </Link>
              <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${sermonVideoCode}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </AspectRatio>

              <Text fontWeight="bold" fontSize={{ base: "xl", md: "3xl" }}>
                {sermon.title}
              </Text>
              <Stack spacing={8}>
                <Box>
                  <Stack
                    spacing={{ base: "normal", md: "auto" }}
                    direction={{ base: "column", md: "row" }}
                  >
                    <HStack>
                      <Text fontWeight="bold">Series: </Text>
                      <Text>{sermon.sermonSeries[0].name}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Date: </Text>
                      <Text>{sermonDate}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Speaker:</Text>
                      <Text>{sermon.speaker[0].name}</Text>
                    </HStack>
                  </Stack>
                  <HStack>
                    <Text fontWeight="bold">Passage:</Text>
                    <Text>{sermon.passage}</Text>
                  </HStack>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                    Audio Sermon:
                  </Text>
                  <HStack>
                    <audio
                      src={sermon.sermonAudioUrl}
                      width="100%"
                      height="232"
                      frameBorder="0"
                      controls
                      allowFullScreen=""
                      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    />
                  </HStack>
                </Box>
                <Stack spacing={4}>
                  {relatedSermons.length > 0 && (
                    <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                      More from this series:
                    </Text>
                  )}
                  {relatedSermons.length > 0 &&
                    relatedSermons.map((sermon, i) => (
                      <RelatedSermonCard
                        key={sermon.id}
                        sermonData={sermon}
                        allSermons={allSermons}
                      />
                    ))}
                </Stack>
                <Stack spacing={4}>
                  <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                    Other past sermons you might like:
                  </Text>
                  {randomSermons.length > 0 &&
                    randomSermons.map((sermon, i) => (
                      <RelatedSermonCard
                        key={sermon.id}
                        sermonData={sermon}
                        allSermons={allSermons}
                      />
                    ))}
                </Stack>
              </Stack>
            </VStack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default SermonDetails;
