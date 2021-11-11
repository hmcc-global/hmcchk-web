import {
  Accordion,
  Flex,
  TextProps,
  MinusIcon,
  AddIcon,
  Text,
  Heading,
  Center,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const ValuesSection = (props) => {
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
          mb={5}
        >
          {title}
        </Heading>
      </Center>
      <Accordion allowMultiple>
        <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                <Text>{blurb.head[0]}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>{blurb.body[0]}</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                <Text>{blurb.head[1]}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>{blurb.body[1]}</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                <Text>{blurb.head[2]}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>{blurb.body[2]}</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                <Text>{blurb.head[3]}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>{blurb.body[3]}</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                <Text>{blurb.head[4]}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>{blurb.body[4]}</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                <Text>{blurb.head[5]}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>{blurb.body[5]}</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default ValuesSection;
