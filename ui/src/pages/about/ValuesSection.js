import { Accordion, Text, Heading, Box } from '@chakra-ui/react';
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
        <Accordion.Root multiple>
          <Accordion.Item border="2px solid #63B3ED" my="3" borderRadius="5" value='item-0'>
            <h2>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[0]}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent><Accordion.ItemBody>
                <Text color="#000000">{values.body[0]}</Text>
              </Accordion.ItemBody></Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item border="2px solid #63B3ED" my="3" borderRadius="5" value='item-1'>
            <h2>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[1]}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent><Accordion.ItemBody>
                <Text color="#000000">{values.body[1]}</Text>
              </Accordion.ItemBody></Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item border="2px solid #63B3ED" my="3" borderRadius="5" value='item-2'>
            <h2>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[2]}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent><Accordion.ItemBody>
                <Text color="#000000">{values.body[2]}</Text>
              </Accordion.ItemBody></Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item border="2px solid #63B3ED" my="3" borderRadius="5" value='item-3'>
            <h2>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[3]}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent><Accordion.ItemBody>
                <Text color="#000000">{values.body[3]}</Text>
              </Accordion.ItemBody></Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item border="2px solid #63B3ED" my="3" borderRadius="5" value='item-4'>
            <h2>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[4]}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent><Accordion.ItemBody>
                <Text color="#000000">{values.body[4]}</Text>
              </Accordion.ItemBody></Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item border="2px solid #63B3ED" my="3" borderRadius="5" value='item-5'>
            <h2>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[5]}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent><Accordion.ItemBody>
                <Text color="#000000">{values.body[5]}</Text>
              </Accordion.ItemBody></Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item border="2px solid #63B3ED" my="3" borderRadius="5" value='item-6'>
            <h2>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                    {values.head[6]}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent><Accordion.ItemBody>
                <Text color="#000000">{values.body[6]}</Text>
              </Accordion.ItemBody></Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Box>
    </>
  );
};

export default ValuesSection;
