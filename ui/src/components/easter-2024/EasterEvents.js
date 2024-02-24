import {
  Grid,
  GridItem,
  Box,
  VStack,
  Text,
  Button,
  AspectRatio,
  HStack,
  Spacer,
  Flex,
} from '@chakra-ui/react';
import '@fontsource/cousine';
import { DownloadIcon, InfoIcon, ExternalLinkIcon } from '@chakra-ui/icons';
const EasterEvents = () => {
  return (
    <VStack h="80em" w="100%">
      <Grid
        h="30em"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        w="100%"
      >
        <GridItem rowSpan={3} colSpan={1}>
          <Box w="100%" h="100%" borderRadius="0.75rem" bgColor="#FFDFAF">
            <Flex
              paddingTop="1em"
              align="left"
              w="90%"
              m="auto"
              h="95%"
              flexDirection="column"
            >
              <Text
                color="#464646"
                fontFamily="Inter"
                fontSize="2em"
                fontStyle="normal"
                fontWeight="900"
                lineHeight="normal"
                textTransform="uppercase"
              >
                EVENTS
              </Text>
              <Text
                color="#4F4F4F"
                fontFamily="Cousine"
                fontSize="1em"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
              >
                Join us to remember Jesus’ death and celebrate His resurrection!
              </Text>
              <Spacer />
              <Button
                borderRadius="2em"
                w="15em"
                border="2px solid #D67944"
                bgcolor="#FFF"
              >
                <Text
                  color="#D67944"
                  fontFamily="Cousine"
                  fontSize="1em"
                  fontStyle="italic"
                  fontWeight="700"
                  lineHeight="normal"
                  px="1em"
                >
                  Share an invite
                </Text>
                <DownloadIcon color="#D67944" />
              </Button>
            </Flex>
          </Box>
        </GridItem>
        <GridItem
          colSpan={1}
          borderRadius="0.75em"
          border="1px solid #181818"
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter2024/good_friday_bg.svg')`}
          bgSize="cover"
        >
          <VStack align="left" w="90%" mx="auto" my=" 1em" fontFamily="Cousine">
            <Text fontSize="1.5em" fontWeight="700">
              Good Friday
            </Text>
            <Flex fontSize="1em">
              <Text>When: </Text>
              <Text fontWeight="700">Friday March 29, 2024 @8PM</Text>
            </Flex>
            <Flex fontSize="1em">
              <Text>Where: </Text>
              <Text fontWeight="700">Transformation Center, Kwun Tong</Text>
            </Flex>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={1}
          borderRadius="0.75em"
          border="1px solid #181818"
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter2024/easter_bg.svg')`}
          bgSize="cover"
        >
          <VStack align="left" w="90%" mx="auto" my=" 1em" fontFamily="Cousine">
            <Text fontSize="1.5em" fontWeight="700">
              Easter Celebration
            </Text>
            <Flex fontSize="1em">
              <Text>When: </Text>
              <Text fontWeight="700"> Sunday March 31, 2024 @10AM</Text>
            </Flex>
            <Flex fontSize="1em">
              <Text>Where: </Text>
              <Text fontWeight="700">Transformation Center, Kwun Tong</Text>
            </Flex>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={1}
          borderRadius="0.75em"
          border="1px solid #181818"
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter2024/baptism_bg.svg')`}
          bgSize="cover"
        >
          <VStack align="left" w="90%" mx="auto" my=" 1em" fontFamily="Cousine">
            <Text fontSize="1.5em" fontWeight="700">
              Baptism Celebration
            </Text>
            <Flex fontSize="1em">
              <Text>When: </Text>
              <Text fontWeight="700"> Sunday March 31, 2024 @2PM</Text>
            </Flex>
            <Flex fontSize="1em">
              <Text>Where: </Text>
              <Text fontWeight="700">Transformation Center, Kwun Tong</Text>
            </Flex>
          </VStack>
        </GridItem>
      </Grid>
      <VStack
        w="100%"
        h="60em"
        borderRadius="0.75em"
        bgColor="#FFF"
        border=" 1px solid #181818;"
      >
        <Text
          color="#464646"
          fontFamily="Cousine"
          fontSize="1.5em"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          textTransform="uppercase"
          paddingTop="1em"
        >
          #UNDEFEATRED
        </Text>
        <Text
          color="#464646"
          fontFamily="Inter"
          fontSize="2em"
          fontStyle="normal"
          fontWeight="900"
          lineHeight="normal"
          textTransform="uppercase"
        >
          WE'RE SHARING TESTIMONIES!
        </Text>
        <HStack w="60%" h="50%" justifyContent="space-between">
          <Button
            borderRadius="2em"
            w="20em"
            border="2px solid #525252"
            bgcolor="#FFF"
          >
            <Text
              color="#525252"
              fontFamily="Cousine"
              fontSize="1em"
              fontStyle="italic"
              fontWeight="700"
              lineHeight="normal"
              px="1em"
            >
              Learn how to participate
            </Text>
            <InfoIcon color="#525252" />
          </Button>
          <Button
            borderRadius="2em"
            w="20em"
            border="2px solid #B0005C"
            bgcolor="#FFF"
          >
            <Text
              color="#B0005C"
              fontFamily="Cousine"
              fontSize="1em"
              fontStyle="italic"
              fontWeight="700"
              lineHeight="normal"
              px="1em"
            >
              Check it out on IG
            </Text>
            <ExternalLinkIcon color="#B0005C" />
          </Button>
        </HStack>
        <AspectRatio h="50em" w="80%" ratio={1}>
          <iframe
            title="Easter 2024 Events"
            src="https://widgets.sociablekit.com/instagram-hashtag-feed/iframe/25366574"
          />
        </AspectRatio>
      </VStack>
    </VStack>
  );
};

export default EasterEvents;
