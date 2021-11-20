import {
  Flex,
  Text,
  Heading,
  Center,
  Box,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const BeliefsSection = (props) => {
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
      <Box display={{ base: "none", lg: "flex" }}>
        <SimpleGrid columns={[1, 1, 3]} spacingX="1" spacingY="1">
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[0]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[0]}
              </Text>
            </Box>
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[1]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[1]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[2]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[2]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[3]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[3]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[4]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[4]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[5]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[5]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[6]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[6]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[7]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[7]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px="8"
            pt="6"
            pb="6"
            m="4"
            h="18em"
            w="19em"
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[8]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[8]}
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
      <Box>
        <Accordion allowMultiple display={{ base: "block", lg: "none" }}>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[0]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[0]}</Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[1]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[1]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[2]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[2]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[3]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[3]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[4]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[4]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[5]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[5]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[6]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[6]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[7]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[7]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="black">{blurb.head[8]}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="black">{blurb.body[8]}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default BeliefsSection;
