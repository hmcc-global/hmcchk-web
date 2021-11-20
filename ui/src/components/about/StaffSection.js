import {
  Flex,
  Text,
  Center,
  VStack,
  Stack,
  Image,
  Box,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";

const StaffSection = (props) => {
  const { title, blurb } = props;
  return (
    <Flex direction="column">
      <Center padding="5">
        <Heading
          as="h2"
          fontSize={["4xl", "6xl"]}
          fontWeight={700}
          lineHeight={1}
          textAlign="center"
          color="#062883"
          mb={5}
        >
          {title}
        </Heading>
      </Center>
      <VStack>
        <Box
          bgColor="#2D4769"
          w="100%"
          minH={{ base: "40em", lg: "30em" }}
          borderRadius="20px"
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            py={["2em", "2em", "4em"]}
          >
            <Image
              src={process.env.PUBLIC_URL + "images/about/KimFamily.png"}
              px={["0", "0", "1em"]}
              w={{ base: "90%", lg: "60em" }}
              minW={{ base: "90%", lg: "30em" }}
              objectFit="cover"
              margin="auto"
            />
            <Box px="1.5em">
              <Text color="white" fontSize="2xl" fontWeight="bold">
                {blurb.kim.title}
              </Text>
              <Text
                as="i"
                color="white"
                fontSize="md"
                fontWeight="semibold"
                paddingTop={{ base: "none", lg: "1em" }}
              >
                {blurb.kim.position}
              </Text>
              <Box>
                <Text color="white" fontSize="sm" paddingTop="1em">
                  {blurb.kim[0]}
                </Text>
                <Text color="white" fontSize="sm" paddingTop="1em">
                  {blurb.kim[1]}
                </Text>
                <Text color="white" fontSize="sm" paddingTop="1em">
                  {blurb.kim[2]}
                </Text>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box
          bgColor="#2D4769"
          w="100%"
          minH={{ base: "40em", lg: "30em" }}
          borderRadius="20px"
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            py={["2em", "2em", "4em"]}
          >
            <Image
              src={process.env.PUBLIC_URL + "/images/about/ZhuFamily.png"}
              w="90%"
              objectFit="cover"
              px={["0", "0", "1em"]}
              w={{ base: "90%", lg: "60em" }}
              minW={{ base: "90%", lg: "30em" }}
              margin="auto"
            />
            <Box px="1.5em">
              <Text color="white" fontSize="2xl" fontWeight="bold">
                {blurb.zhu.title}
              </Text>
              <Text
                as="i"
                color="white"
                fontSize="md"
                fontWeight="semibold"
                paddingTop={{ base: "none", lg: "1em" }}
              >
                {blurb.zhu.position}
              </Text>
              <Box>
                <Text color="white" fontSize="sm" paddingTop="1em">
                  {blurb.zhu[0]}
                </Text>
                <Text color="white" fontSize="sm" paddingTop="1em">
                  {blurb.zhu[1]}
                </Text>
                <Text color="white" fontSize="sm" paddingTop="1em">
                  {blurb.zhu[2]}
                </Text>
              </Box>
            </Box>
          </Stack>
        </Box>
      </VStack>
      <Box></Box>
    </Flex>
  );
};

export default StaffSection;
