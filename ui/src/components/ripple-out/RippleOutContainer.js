import {
  Box,
  Container,
  Flex,
  Text,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import RippleOutSubHero from './RippleOutSubHero';
import faqContent from './faqContent.json';
import RippleOutTakePartSection from './RippleOutTakePartSection';
import RippleOutSupportGiveSection from './RippleOutSupportGiveSection';

const headerFontSize = ['2.5em', '4.25em'];
const bodyFontSize = '1.4em';
const fontColor = '#182E57';

const RippleOutContainer = () => {
  return (
    <>
      {/* Hero section - desktop */}
      <Box
        w="full"
        h="100%"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['none', 'block']}
      >
        <Container maxW={['container.xl']} h="100%">
          <Center h="full">
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['4em', '14em']}
                lineHeight={['1em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text textStyle="darker_grotesque" fontSize={['3em', '12em']}>
                CAMPAIGN
              </Text>
            </Flex>
          </Center>
        </Container>
      </Box>
      {/* Hero section - mobile */}
      <Box
        w="full"
        h="36%"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero-mobile.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['block', 'none']}
      >
        <Container maxW={['container.xl']} h="100%">
          <Center h="full">
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['4em', '14em']}
                lineHeight={['1em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text textStyle="darker_grotesque" fontSize={['3em', '12em']}>
                CAMPAIGN
              </Text>
            </Flex>
          </Center>
        </Container>
      </Box>
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#FFFBEF"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Flex flexDir="column" gap={9}>
            <RippleOutSubHero
              headerFontSize={headerFontSize}
              bodyFontSize={bodyFontSize}
            />
            <Flex flexDir="column" gap={3}>
              <Text
                fontSize={headerFontSize}
                textStyle="darker_grotesque_black"
                color="#182E57"
                lineHeight="0.9em"
              >
                THE STEPS
              </Text>
              <Text fontSize={bodyFontSize}>
                As you prayerfully consider giving to the campaign, you are not
                just simply giving a sum to a campaign or facility, but you are
                giving towards a larger vision so that we can accomplish all
                that God has called us and see life transformation through the
                Gospel
              </Text>
            </Flex>
          </Flex>
        </Container>

        {/* Ripple steps drops image - desktop & mobile */}
        <Box
          my={9}
          h={['50vh', '60vh', '60vh', '80vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-steps.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
          display={['none', 'block']}
        />
        <Box
          my={9}
          h={['50vh', '60vh', '60vh', '80vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-steps-mobile.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
          display={['block', 'none']}
        />

        <RippleOutTakePartSection
          headerFontSize={headerFontSize}
          bodyFontSize={bodyFontSize}
        />
      </Flex>

      {/* The space section */}
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#C9DDED"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Text
            fontSize={headerFontSize}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
          >
            THE SPACE
          </Text>
          <Text fontSize="3xl" textStyle="darker_grotesque_semibold">
            TRANSFORMATION CENTER, 22/F CROCODILE CENTER, KWUN TONG
          </Text>
          <Text fontSize={bodyFontSize}>
            Features of the Transformation Center:
            <UnorderedList>
              <ListItem>Main sanctuary that sits up to 200 people</ListItem>
              <ListItem>
                Function room for ministry gatherings and training classes
              </ListItem>
              <ListItem>
                Classroom for our Building Blocks children’s ministry and other
                classes
              </ListItem>
              <ListItem>
                Pantry common area for fellowship times and community gatherings
              </ListItem>
              <ListItem>Pastoral staff office</ListItem>
            </UnorderedList>
          </Text>
        </Container>
        <Box
          my={9}
          h={['20vh', '40vh', '60vh', '80vh']}
          w="screen"
          bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-photos.png)`}
          bgSize="contain"
          bgRepeat="no-repeat"
        ></Box>
      </Flex>
      {/* The support and how to give section */}
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#FFFBEF"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <RippleOutSupportGiveSection
          headerFontSize={headerFontSize}
          bodyFontSize={bodyFontSize}
        />
      </Flex>

      {/* FAQ section */}
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#C9DDED"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Flex flexDir="column" gap={3}>
            <Text
              fontSize={headerFontSize}
              textStyle="darker_grotesque_black"
              color="#182E57"
              lineHeight="0.9em"
            >
              FAQ
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
                          {faqContent[0].title}
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
                      bg="#FFFBEF"
                      whiteSpace="pre-wrap"
                    >
                      {faqContent[0].content}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>

              {faqContent.slice(1, 9).map((item, index) => (
                <AccordionItem key={'faq' + index}>
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
                            {item.title}
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
                        bg="#FFFBEF"
                        whiteSpace="pre-wrap"
                      >
                        {item.content}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}

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
                          {faqContent[9].title}
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
                      bg="#FFFBEF"
                      whiteSpace="pre-wrap"
                    >
                      {faqContent[9].content}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default RippleOutContainer;
