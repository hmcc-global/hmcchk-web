import {
  Accordion,
  Text,
  Heading,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import VisionMissionSection from './VisionMissionSection';

const ValuesSection = (props) => {
  const { title, blurb } = props;
  const { visionMission, values } = blurb;

  return (
    <>
      <VisionMissionSection blurb={visionMission} />
      <Box w="100%" px="1" id="our-values">
        <Heading
          as="h2"
          fontSize={['3xl', '5xl']}
          fontWeight={700}
          color="#0628A3"
          lineHeight={1}
          textAlign="center"
          mt={5}
          mb={5}
          fontFamily="DMSerifDisplay_Italic"
        >
          {title.slice(17, 28)}
        </Heading>
        <Accordion allowMultiple>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[0]}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="#000000">{values.body[0]}</Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[1]}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="#000000">{values.body[1]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[2]}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="#000000">{values.body[2]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[3]}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="#000000">{values.body[3]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[4]}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="#000000">{values.body[4]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[5]}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="#000000">{values.body[5]}</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="2px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[6]}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text color="#000000">{values.body[6]}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default ValuesSection;
