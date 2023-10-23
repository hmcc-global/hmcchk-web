import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Container,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const RippleOutTakePartSection = () => {
  const headerFontSize = ['2.5em', '4.25em'];
  const bodyFontSize = '1.4em';
  const fontColor = '#182E57';
  return (
    <Flex
      minH="100%"
      flexDir="column"
      bgColor="#FFFBEF"
      py={['1.8em', '4em']}
      color={fontColor}
    >
      <Container maxW={['container.xl']} h="100%" textStyle="darker_grotesque">
        <Flex flexDir="column" gap={9}>
          <Flex flexDir="column" gap={3}>
            <Text
              fontSize={headerFontSize}
              textStyle="darker_grotesque_black"
              color="#182E57"
              lineHeight="0.9em"
            >
              How can I take part?
            </Text>
            <Text fontSize={bodyFontSize}>
              Discern God’s calling for your commitment and participation in the
              Ripple Out Campaign
            </Text>
            <Accordion
              allowMultiple
              allowToggle
              fontSize="lg"
              borderRadius="2xl"
            >
              <AccordionItem borderTopRadius="2xl">
                {({ isExpanded }) => (
                  <>
                    <h4>
                      <AccordionButton
                        textStyle="darker_grotesque_bold"
                        fontSize="lg"
                        p={3}
                        bg="#34486F"
                        color="#ffffff"
                        _hover={{
                          bg: 'rgba(52, 72, 111, 0.8)',
                          color: '#ffffff',
                        }}
                        borderTopRadius="2xl"
                      >
                        <Box flex="1" textAlign="left">
                          Pray about your contribution
                        </Box>
                        {isExpanded ? (
                          <AccordionIcon as={AiOutlineMinus} w={5} h={5} />
                        ) : (
                          <AccordionIcon as={AiOutlinePlus} w={5} h={5} />
                        )}
                      </AccordionButton>
                    </h4>
                    <AccordionPanel pb={2} border="1px solid #34486F">
                      Take a moment to be prayerful and see how God will move
                      you to participate and contribute to the Ripple Out
                      Campaign. Here is a sample prayer to guide you in this
                      process: “Lord, I pray that you would move my heart and
                      show me how You are calling me to be a part of Your
                      kingdom work in Hong Kong. Give me faith so that I can
                      respond with generosity and give with joy by faith as I
                      believe that you’ll multiply and provide for Your church.
                      May it be more of you and we pray that you will use this
                      new facility for your glory to saturate the city. Amen”
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h4>
                      <AccordionButton
                        textStyle="darker_grotesque_bold"
                        fontSize="lg"
                        p={3}
                        bg="#34486F"
                        color="#ffffff"
                        _hover={{
                          bg: 'rgba(52, 72, 111, 0.8)',
                          color: '#ffffff',
                        }}
                      >
                        <Box flex="1" textAlign="left">
                          Remember the Biblical principle: “Different sums,
                          equal sacrifice”
                        </Box>
                        {isExpanded ? (
                          <AccordionIcon as={AiOutlineMinus} w={5} h={5} />
                        ) : (
                          <AccordionIcon as={AiOutlinePlus} w={5} h={5} />
                        )}
                      </AccordionButton>
                    </h4>
                    <AccordionPanel pb={2} border="1px solid #34486F">
                      God cares more about you taking a step of faith to give
                      generously than the amount that you give. While we may be
                      in different financial situations, we call for everyone to
                      give sacrificially by faith as we give with unity and
                      sacrifice equally. It’s not the amount, but it comes down
                      to stretching ourselves as we give by faith towards what
                      God is calling us to. 
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
              <AccordionItem borderBottomRadius="2xl">
                {({ isExpanded }) => (
                  <>
                    <h4>
                      <AccordionButton
                        textStyle="darker_grotesque_bold"
                        fontSize="lg"
                        borderBottomRadius={isExpanded ? 'none' : '2xl'}
                        p={3}
                        bg="#34486F"
                        color="#ffffff"
                        _hover={{
                          bg: 'rgba(52, 72, 111, 0.8)',
                          color: '#ffffff',
                        }}
                        borderTop="0px"
                      >
                        <Box flex="1" textAlign="left">
                          Choose to give as an act of worship and proactively
                          find ways to get involved
                        </Box>
                        {isExpanded ? (
                          <AccordionIcon as={AiOutlineMinus} w={5} h={5} />
                        ) : (
                          <AccordionIcon as={AiOutlinePlus} w={5} h={5} />
                        )}
                      </AccordionButton>
                    </h4>
                    <AccordionPanel
                      pb={2}
                      border="1px solid #34486F"
                      borderBottomRadius="2xl"
                    >
                      We give not because of obligation or duty, but because of
                      our response towards God’s great generosity to us that was
                      shown through the sacrifice of His son, Jesus Christ.
                      Giving and generosity can be a great avenue of worship as
                      we yield to God and give with joy and faith. May we be
                      reminded of the people of Macedonia who “gave not only
                      what they could afford, but gave beyond their means”. 
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default RippleOutTakePartSection;
