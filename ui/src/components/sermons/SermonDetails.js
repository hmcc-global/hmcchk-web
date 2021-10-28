import {HStack, 
        VStack,
        Box,
        Button,
        AspectRatio,
        Image,
        Link,
        Text,
        Container  
} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";
import RelatedSermonCard from "./RelatedSermonCard";
import { DateTime } from "luxon";
import { DATE_FULL } from "luxon/src/impl/formats";
import React, {useState} from "react";

const SermonDetails = (props) => {
  const sermonData = props.location.state.sermonData;
  const allSermons = props.location.state.allSermons;
  let relatedSermons = allSermons.filter(related => related.sermonSeries[0].name.includes(sermonData.sermonSeries[0].name) && related.id !== sermonData.id);
  let sermonDate = DateTime.fromISO(sermonData.datePreached).toLocaleString(DATE_FULL);
  
  return (
    <>
      <Container maxW="container.lg">
        <Box>
          <VStack alignItems="left" alignContent="left">
            <Link href="/sermons">
            <Button variant="link" leftIcon={<ChevronLeftIcon />}>
              See all past sermons
            </Button>
            </Link>
            <Container maxW="container.md" alignSelf="center">
            <HStack>
              <Box w="20%" ></Box>
            <VStack alignItems="left" alignContent="left">
            <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                <Image borderRadius="20" src={sermonData.sermonSeries[0].image} objectFit="cover" />
              </AspectRatio>
            <HStack>
              <Text>
                {`${sermonData.title} | ${sermonData.passage}`}
              </Text>
            </HStack>
            <HStack>
              <HStack>
                <Text>Series: </Text>
                <Text>{sermonData.sermonSeries[0].name}</Text>
              </HStack>
              <HStack>
                <Text>Date: </Text>
                <Text>{sermonDate}</Text>
              </HStack>
              <HStack>
                <Text>Speaker:</Text>
                <Text>{sermonData.speaker[0].name}</Text>
              </HStack>
            </HStack>
            <Text>
              Audio Sermon:
            </Text>
            <HStack>
              <p>spotify</p>
            </HStack>
            <HStack>
              <Button>
                Sermon Notes
              </Button>
              <Button>
                Share
              </Button>
            </HStack>
            <Text>
              More from this series: 
            </Text>
            {relatedSermons.length >0 &&
              relatedSermons.map((sermon, i) => (
                <RelatedSermonCard key = {sermon.id} sermonData = {sermon} allSermons={allSermons}/>
              ))}
            <Button>
              {`See all Sermon Videos >`}
            </Button>
            </VStack>
            </HStack>
            </Container>
          </VStack>
        </Box>
      </Container>
    </>
  )
}

export default SermonDetails;