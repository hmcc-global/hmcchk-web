import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';

const ExperienceHmcc = (props) => {
  return (
    <Box fontFamily="Manrope">
      <Heading
        as="h2"
        fontSize={['2.25em', '3em', '4em']}
        fontWeight={800}
        textAlign="center"
        mb={[0, 4]}
        fontFamily="DMSerifDisplay_Italic"
      >
        EXPERIENCE HMCC
      </Heading>
      <Flex flexWrap="wrap">
        <Box
          flex={1}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${process.env.PUBLIC_URL}/images/connect/sunday-celebration.JPG')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
          px={[8, 10]}
          pt={[8, 20]}
          pb={[8, 14]}
          m={[0, 2]}
          ml={0}
          my={[1, 0]}
        >
          <Text fontSize={['0.85em', '1.25em']} fontWeight={[400, 700]}>
            Every Sunday at 10AM
          </Text>
          <Heading
            fontSize={['1.25em', '2.25em']}
            fontWeight={[700, 900]}
            fontFamily="DMSerifDisplay_Italic"
          >
            Sunday Celebration
          </Heading>
          <Text
            fontSize={['0.85em', '1.25em']}
            fontWeight={[400, 700]}
            mb={[4, 6]}
          >
            Worship In-person and Online
          </Text>
          <Button
            as={Link}
            size="md"
            href="/discover"
            variant="outline"
            w={[200, 240]}
            borderRadius={10}
            backdropFilter="blur(10px)"
            fontSize={['0.85em', '1.125em']}
            color="inherit"
            _hover={{
              bgColor: 'white',
              color: 'black',
              textDecoration: 'none',
            }}
            id="connect-visit"
          >
            Learn more
          </Button>
        </Box>
        <Box
          flex={1}
          borderWidth="1px"
          borderRadius="20"
          bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${process.env.PUBLIC_URL}/images/connect/upcoming-events.jpg')`}
          bgPosition="center"
          bgSize="cover"
          shadow="lg"
          color="white"
          textAlign="center"
          px={[8, 10]}
          pt={[8, 20]}
          pb={[8, 14]}
          m={[0, 2]}
          mr={0}
          my={[1, 0]}
        >
          <Text fontSize={['0.85em', '1.25em']} fontWeight={[400, 700]}>
            Learn about our
          </Text>
          <Heading
            fontSize={['1.25em', '2.25em']}
            fontWeight={[700, 900]}
            fontFamily="DMSerifDisplay_Italic"
          >
            Upcoming Events
          </Heading>
          <Text
            fontSize={['0.85em', '1.25em']}
            fontWeight={[400, 700]}
            mb={[4, 6]}
          >
            and get connected!
          </Text>
          <Button
            as={Link}
            size="md"
            href="/events"
            variant="outline"
            w={[200, 240]}
            borderRadius={10}
            backdropFilter="blur(10px)"
            fontSize={['0.85em', '1.125em']}
            color="inherit"
            _hover={{
              bgColor: 'white',
              color: 'black',
              textDecoration: 'none',
            }}
            id="connect-events"
          >
            Check them out
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExperienceHmcc;
