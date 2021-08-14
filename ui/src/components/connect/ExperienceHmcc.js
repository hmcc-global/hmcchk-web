import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";

const ExperienceHmcc = (props) => {
  return (
    <Box>
      <Heading
        as="h2"
        fontSize={["2.25em", "4em"]}
        fontWeight={800}
        textAlign="center"
        mb={[0, 4]}
      >
        EXPERIENCE HMCC
      </Heading>
      <Flex flexWrap="wrap">
        <Box
          flex={1}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${process.env.PUBLIC_URL}/images/2021_07_11_Membership_Recognition_Prayer_2.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
          p={[8, 24]}
          m={2}
        >
          <Text fontSize={["0.75em", "1.5em"]} fontWeight={600}>
            Every Sunday at 10AM
          </Text>
          <Heading as="h2" fontSize={["1.125em", "2.5em"]} fontWeight={700}>
            Sunday Celebration
          </Heading>
          <Text fontSize={["0.75em", "1.5em"]} fontWeight={600} mb={[4, 6]}>
            Worship In-person and Online
          </Text>
          <Button
            as={Link}
            size="sm"
            href="/about-us"
            variant="outline"
            w={[200, 240]}
            borderRadius={10}
            fontSize={["0.75em", "1.125em"]}
          >
            Learn more {">"}
          </Button>
        </Box>
        <Box
          flex={1}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${process.env.PUBLIC_URL}/images/2016_Apr_EOY_Celebration_Group_Cheering_higher.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
          p={[8, 24]}
          m={2}
        >
          <Text fontSize={["0.75em", "1.5em"]} fontWeight={600}>
            Learn about our
          </Text>
          <Heading as="h2" fontSize={["1.125em", "2.5em"]} fontWeight={700}>
            Upcoming Events
          </Heading>
          <Text fontSize={["0.75em", "1.5em"]} fontWeight={600} mb={[4, 6]}>
            and get connected!
          </Text>
          <Button
            as={Link}
            size="sm"
            href="/events"
            variant="outline"
            w={[200, 240]}
            borderRadius={10}
            fontSize={["0.75em", "1.125em"]}
          >
            Check them out {">"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExperienceHmcc;
