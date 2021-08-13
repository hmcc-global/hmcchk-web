import {
  Flex,
  VStack,
  Stack,
  useBreakpointValue,
  Heading,
  HStack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import CustomButton from "../helpers/components/CustomButton";

// TODO figure out a way to have a central location to edit photo url, blurbs etc.
const heroUrl =
  "https://hongkong.hmcc.net/wp-content/uploads/2021_Apr_4_Easter_Celebration_Worship_Wide_2-1-min.jpg";
const heroText = "Transforming Lives,\nTransforming the World";

const HeroSection = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      bgImage={`url(${heroUrl})`}
      bgSize="cover"
      bgPosition="center center"
    >
      <VStack
        w="full"
        justify="center"
        px={useBreakpointValue({ base: 4, md: 8 })}
        bg="rgba(0, 0, 0, .5)"
      >
        <Stack maxW="6xl" align="flex-start" spacing={6}>
          <Heading
            color="white"
            as="h1"
            size="4xl"
            textAlign="center"
            whiteSpace="pre-wrap"
            alignSelf="center"
          >
            {heroText}
          </Heading>
          <ButtonGroup
            bg="rgb(0, 0, 0, 0)"
            variant="outline"
            color="white"
            w="full"
          >
            <CustomButton
              _hover={{
                bg: "white",
                color: "#1A365D",
                borderColor: "#1A365D",
              }}
              text="WORSHIP IN-PERSON >"
              w="inherit"
            />
            <CustomButton
              _hover={{
                bg: "white",
                color: "#1A365D",
                borderColor: "#1A365D",
              }}
              text="CHURCH ONLINE >"
              w="inherit"
            />
          </ButtonGroup>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default HeroSection;
