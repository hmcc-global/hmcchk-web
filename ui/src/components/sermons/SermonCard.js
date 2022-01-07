import {
  AspectRatio,
  Box,
  Image,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const SermonCard = ({ sermonData, allSermons }) => {
  let sermonDate = DateTime.fromISO(sermonData.datePreached).toFormat(
    "LLLL dd, yyyy"
  );
  let sermonImage = "";
  if (sermonData.sermonSeries[0].image !== null)
    sermonImage = sermonData.sermonSeries[0].image.sourceUrl;
  else sermonImage = process.env.PUBLIC_URL + "/images/ripple_black.svg";
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="20"
        overflow="hidden"
        h="auto"
        bg="white"
        shadow="lg"
      >
        <Box>
          <Link
            to={{
              pathname: `/sermons/${sermonData.id}`,
              state: { sermonData: sermonData, allSermons: allSermons },
            }}
          >
            <AspectRatio width="100%" ratio={16 / 9}>
              <Image borderTopRadius="20" src={sermonImage} objectFit="cover" />
            </AspectRatio>
            <Box position="absolute" left="100%" top="50%">
              <AspectRatio width="20%" ratio={1 / 1}>
                <Image
                  borderRadius="100%"
                  src={process.env.PUBLIC_URL + "/images/PlayButton.png"}
                />
              </AspectRatio>
            </Box>
          </Link>
        </Box>
        <Link
          to={{
            pathname: `/sermons/${sermonData.id}`,
            state: { sermonData: sermonData, allSermons: allSermons },
          }}
        >
          <Box
            overflow="hidden"
            position="relative"
            paddingLeft={[2, 4]}
            paddingRight={[2, 4]}
            paddingBottom={[2, 4]}
            paddingTop={[1, 2]}
          >
            <VStack alignItems="left" spacing={1}>
              <Text as="h4" size="lg" fontWeight="900" isTruncated>
                {sermonData.title}
              </Text>
              <Text fontSize="sm" isTruncated>
                {sermonData.sermonSeries[0].name}
              </Text>
              <HStack spacing="auto">
                <Text fontSize="xs" isTruncated>
                  {sermonData.speaker[0].name}
                </Text>
                <Text fontSize="xs" isTruncated>
                  {sermonDate}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default SermonCard;
