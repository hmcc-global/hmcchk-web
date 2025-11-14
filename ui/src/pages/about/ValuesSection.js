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
        <Accordion.Root allowMultiple>
          {Object.values(values.head).map((value, index) => (
            <Accordion.Item
              key={index}
              value={value}
              border="2px solid #63B3ED"
              my="3"
              borderRadius="5"
            >
              <h2>
                <Accordion.ItemTrigger>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    <Text color="#000000" fontFamily="DMSerifDisplay_Regular">
                      {values.head[index]}
                    </Text>
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
              </h2>
              <Accordion.ItemContent>
                <Text color="#000000">{values.body[index]}</Text>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </>
  );
};

export default ValuesSection;
