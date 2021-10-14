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
import { DateTime } from "luxon";
import { DATE_FULL } from "luxon/src/impl/formats";
import React, {useEffect, useState} from "react";
import { customAxios as axios } from "../helpers/customAxios";

const SermonDetails = (props) => {
  const sermonData = props.location.state;

  let sermonDate = DateTime.fromISO(sermonData.datePreached).toLocaleString(DATE_FULL);
  console.log(sermonData)
  return (
    <>
      <Container maxW="container.lg">
        <Box>
          <VStack>
            <Link href="/sermons">
            <Button>
              Back
            </Button>
            </Link>
            <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                <Image borderRadius="20" src={sermonData.sermonSeries[0].image} objectFit="cover" />
              </AspectRatio>
            <HStack>
              <Text>
                {sermonData.title}
                |
                {sermonData.passage}
              </Text>
            </HStack>
            <HStack>
              <Text>
                Series: {sermonData.sermonSeries[0].name}
              </Text>
              <Text>
                Date: {sermonDate}
              </Text>
              <Text>
                Speaker: {sermonData.speaker[0].name}
              </Text>
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
            <p>test</p>
            <Button>
              {`See all Sermon Videos >`}
            </Button>
          </VStack>
        </Box>
      </Container>
    </>
  )
}

export default SermonDetails;