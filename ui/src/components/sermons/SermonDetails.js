import {HStack, 
        VStack,
        Box,
        Button,
        Stack,
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
import React, {useEffect} from "react";

const SermonDetails = (props) => {
  const sermonData = props.location.state.sermonData;
  const allSermons = props.location.state.allSermons;
  let relatedSermons = allSermons.filter(related => related.sermonSeries[0].name.includes(sermonData.sermonSeries[0].name) && related.id !== sermonData.id).slice(0,5);
  let sameYearSermons = allSermons.filter(random => DateTime.fromISO(random.datePreached).toFormat('yyyy').includes(DateTime.fromISO(sermonData.datePreached).toFormat('yyyy')) && random.sermonSeries[0].name !== sermonData.sermonSeries[0].name);
  let randomSermons = [];
  let sermonDate = DateTime.fromISO(sermonData.datePreached).toLocaleString(DATE_FULL);
  let sermonVideoCode = sermonData.sermonVideoUrl.split('/')[sermonData.sermonVideoUrl.split('/').length-1];

  while(randomSermons.length < 5){
    randomSermons.push(sameYearSermons[Math.floor(Math.random() * sameYearSermons.length)])
    randomSermons = [...new Set(randomSermons)];
  }
  randomSermons = randomSermons.sort((a, b) => DateTime.fromISO(b.datePreached).toSeconds() - DateTime.fromISO(a.datePreached).toSeconds());
  return (
    <>
      <Container maxW="container.lg">
        <Box mb="20px" mt="20px">
          <VStack alignItems="left" alignContent="left">
            <Link href="/sermons">
              <Button variant="link" fontSize="lg" color="black" justifyContent="left" leftIcon={<ChevronLeftIcon />} display={{base:"none", md:"flex"}}>
                See all past sermons
              </Button>
            </Link>
            <AspectRatio mb="5" width="100%" ratio={16 / 9}>
              <iframe 
                  width="560" 
                  height="315" 
                  src= {`https://www.youtube.com/embed/${sermonVideoCode}`}
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
              </iframe>
            </AspectRatio>
              <Text
                fontWeight="bold"
                fontSize={{base:"xl", md: "3xl"}}>
                {sermonData.title}
              </Text>
              <Stack spacing={{base:"normal", md:"auto"}} direction={{base:"column", md:"row"}}>
                <HStack>
                  <Text fontWeight="bold">Series: </Text>
                  <Text>{sermonData.sermonSeries[0].name}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Date: </Text>
                  <Text>{sermonDate}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Speaker:</Text>
                  <Text>{sermonData.speaker[0].name}</Text>
                </HStack>
              </Stack>
              <HStack>
                <Text fontWeight="bold">
                  Passage:
                </Text>
                <Text>
                  {sermonData.passage}
                </Text>
              </HStack>
              <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                Audio Sermon:
              </Text>
              <HStack>
                <iframe 
                  src={sermonData.sermonAudioUrl}
                  width="100%" 
                  height="232" 
                  frameBorder="0" 
                  allowfullscreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
              </HStack>
              <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                More from this series: 
              </Text>
            {relatedSermons.length > 0 &&
              relatedSermons.map((sermon, i) => (
                <RelatedSermonCard key = {sermon.id} sermonData = {sermon} allSermons={allSermons}/>
            ))}
                
            <Text fontWeight="bold" color="#0628A3" fontSize="xl">
              Other past sermons you might like:
            </Text>
            {randomSermons.length > 0 &&
                randomSermons.map((sermon, i) => (
                  <RelatedSermonCard key = {sermon.id} sermonData= {sermon} allSermons={allSermons}/>
                ))}
          </VStack>
        </Box>
      </Container>
    </>
  )
}

export default SermonDetails;