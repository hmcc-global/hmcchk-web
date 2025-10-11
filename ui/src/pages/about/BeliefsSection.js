import {
  Flex,
  Text,
  Heading,
  Center,
  Box,
  HStack,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const BeliefsCard = ({ head, body }) => {
  return (
    <Box
      border="1px solid #CDDCE0"
      borderRadius="7"
      shadow="lg"
      bg="#EEFAFF"
      px="8"
      pt="6"
      pb="6"
      h="100%"
      w="19em"
    >
      <Box>
        <Text
          fontWeight="bold"
          color="#0628A2"
          fontSize="xl"
          textAlign="center"
          fontFamily="DMSerifDisplay_Regular"
        >
          {head}
        </Text>
        <Text color="#2C5282" fontSize="sm">
          {body}
        </Text>
      </Box>
    </Box>
  );
};

const BeliefsSection = (props) => {
  const { title, blurb } = props;
  return (
    <Flex direction="column" w="100%">
      <Center padding="5">
        <Heading
          as="h2"
          fontSize={['3xl', '5xl']}
          fontWeight={700}
          lineHeight={1}
          textAlign="center"
          color="#0628A3"
          mb={5}
          fontFamily="DMSerifDisplay_Italic"
          id="beliefs"
        >
          {title}
        </Heading>
      </Center>
      <Box display={{ base: 'none', lg: 'flex' }}>
        <VStack spacing="5" w="100%">
          <HStack spacing="5" h="20em">
            <BeliefsCard head={blurb.head[0]} body={blurb.body[0]} />
            <BeliefsCard head={blurb.head[1]} body={blurb.body[1]} />
            <BeliefsCard head={blurb.head[2]} body={blurb.body[2]} />
          </HStack>
          <HStack spacing="5" h="20em">
            <BeliefsCard head={blurb.head[3]} body={blurb.body[3]} />
            <BeliefsCard head={blurb.head[4]} body={blurb.body[4]} />
            <BeliefsCard head={blurb.head[5]} body={blurb.body[5]} />
          </HStack>
          <HStack spacing="5" h="20em">
            <BeliefsCard head={blurb.head[6]} body={blurb.body[6]} />
            <BeliefsCard head={blurb.head[7]} body={blurb.body[7]} />
            <BeliefsCard head={blurb.head[8]} body={blurb.body[8]} />
          </HStack>
        </VStack>
      </Box>
      <Center>
        <Box
          display={{ base: 'block', lg: 'none' }}
          w="90%"
          fontFamily="Manrope"
        >
          <Accordion allowMultiple>
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
      </Center>
    </Flex>
  );
};

export default BeliefsSection;
