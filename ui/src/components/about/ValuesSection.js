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
  return (
    <Flex direction="column">
      <Center padding="5">
        <Heading>Our Values </Heading>
      </Center>
      <Center>
        <Accordion w={["90%", "70%"]} allowMultiple>
          <AccordionItem border="1px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text>S – Spirit-led ministry</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                To be connected with God and anointed by His Spirit, in order to
                hear His direction and step out in faith to minister to His
                people with His power.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="1px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text>L – Leadership ​development</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                To develop people to their full AC and in Christ-like character
                in order to impact their spheres of influence and increase the
                spread of the Gospel to future generations.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="1px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text>T – Transculturalism</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                To make the decision to go through discomforts and difficulties,
                in order to develop understanding and delight in people from a
                different culture.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="1px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text>C – Community</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                To willingly come together as a diverse group of people to
                experience and live out the Gospel, in order to fulfill God’s
                purposes.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="1px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text>M – Ministry inside and outside</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                To be a visible display and viable demonstration of God’s
                Kingdom by stewarding our God-given spiritual gift(s), resources
                and experiences to build God’s Church and transform the world.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="1px solid #63B3ED" my="3" borderRadius="5">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  <Text>M – Missions through church planting</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                To obey and fulfill the Great Commission through the local
                church, which God has established so that we can be witnesses
                and servants of His redemptive purpose.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Center>
    </Flex>
  );
};

export default ValuesSection;
