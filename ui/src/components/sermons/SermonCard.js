import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Text,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { DATE_FULL } from "luxon/src/impl/formats";

const SermonCard = ({ sermonData, allSermons }) => {
  let sermonDate = DateTime.fromISO(sermonData.datePreached).toLocaleString(
    DATE_FULL
  );

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="20"
        overflow="hidden"
        h="auto"
        bg="white"
        shadow="lg"
        p={[4, 10]}
      >
        <Box>
          <Link
            to={{ pathname: `/sermons/${sermonData.id}`, state: sermonData }}
          >
            <AspectRatio mb="5" width="100%" ratio={16 / 9}>
              <Image
                borderRadius="20"
                src={sermonData.sermonSeries[0].image}
                objectFit="cover"
              />
            </AspectRatio>
          </Link>
        </Box>
        <Box overflow="hidden" position="relative">
          <VStack alignItems="left">
            <Text as="h4" mb="5" size="lg" fontWeight="900" isTruncated>
              {sermonData.title}
            </Text>
            <Text>{sermonData.sermonSeries[0].name}</Text>
            <HStack>
              <Text>{sermonData.speaker[0].name}</Text>
              <Text align="right">{sermonDate}</Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default SermonCard;
