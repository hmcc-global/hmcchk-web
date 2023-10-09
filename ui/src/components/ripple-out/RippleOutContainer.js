import {
  Box,
  Container,
  Flex,
  Text,
  Center,
  Spacer,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { GivingCard } from '../giving/GivingCard';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import RippleOutSubHero from './RippleOutSubHero';
import faqContent from './faqContent.json';
import RippleOutTakePartSection from './RippleOutTakePartSection';

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
        <Container maxW={['container.xl']}>
          <Flex flexDir="column" gap={9} textStyle="darker_grotesque">
            <Flex flexDir="column" gap={3}>
              <Text
                fontSize={headerFontSize}
                textStyle="darker_grotesque_black"
                lineHeight="0.9em"
              >
                THE SUPPORT
              </Text>
              <Text fontSize={bodyFontSize}>
                Join and contribute to the Ripple Out Campaign
              </Text>
              <Box
                bg="#ffffff"
                px="10"
                py="5"
                borderRadius="2xl"
                boxShadow="lg"
              >
                <Grid templateColumns={['repeat(1, 2fr)', 'repeat(2, 1fr)']}>
                  <GridItem>
                    <Center h="100%">
                      <Flex flexDir="column">
                        <Text
                          color="#96825B"
                          textStyle="darker_grotesque_bold"
                          lineHeight={['1em', '0.5em']}
                          fontSize={['2xl', '3xl']}
                        >
                          Fundraising Target
                        </Text>
                        <Text
                          fontSize={headerFontSize}
                          textStyle="darker_grotesque_black"
                          lineHeight="1em"
                        >
                          HKD $2MILLION
                        </Text>
                        <Text fontSize={bodyFontSize} lineHeight="1.3em">
                          raised by end of March 2024
                        </Text>
                        <Text
                          mt={5}
                          fontSize="lg"
                          textStyle="darker_grotesque_bold"
                        >
                          To facilitate procurement of required materials and
                          ensure smooth renovation progress, sufficient funds
                          need to be secured at designated times according to
                          project plan.
                        </Text>
                      </Flex>
                    </Center>
                  </GridItem>
                  <GridItem
                    bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/waterfall.png)`}
                    bgSize="contain"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    minH="40vh"
                  ></GridItem>
                </Grid>
              </Box>
            </Flex>
            <Flex flexDir="column" gap={3}>
              <Text
                fontSize={['1.35em', '2.5em']}
                lineHeight="0.9em"
                textStyle="darker_grotesque_black"
              >
                WAYS TO GIVE
              </Text>
              <Text fontSize={bodyFontSize}>
                There are a few different ways you can give to our church.
              </Text>
              <Text fontSize={bodyFontSize}>
                When giving for the Ripple Out Campaign:
                <UnorderedList>
                  <ListItem>
                    Please always use your legal name and provide the same email
                    address consistently.
                  </ListItem>
                  <ListItem>
                    Please always leave a note in the transfer remark
                  </ListItem>
                </UnorderedList>
                Transfer Remark:{' '}
                <Box textStyle="darker_grotesque_black" as="span">
                  RIPPLE OUT: {'{Your full name}'}
                </Box>
              </Text>
              <Text fontSize={bodyFontSize}>
                Note: Please email stewardship@hongkong.hmcc.net with your full
                name and transfer receipt, especially if you forgot to leave a
                remark or memo in the online giving process, for record-keeping
                purposes
              </Text>
              <Center minW="100%">
                <Flex
                  direction={['column', 'column', 'row']}
                  minW="100%"
                  h={['100%', '100%', '13em']}
                >
                  <GivingCard
                    text="FPS"
                    imageLink={
                      process.env.PUBLIC_URL + '/images/giving/FPS.png'
                    }
                  />
                  <Spacer />
                  <GivingCard
                    text="Online Giving"
                    imageLink={
                      process.env.PUBLIC_URL + '/images/giving/Online.png'
                    }
                  />
                  <Spacer />
                  <GivingCard
                    text="Bank Transfer"
                    imageLink={
                      process.env.PUBLIC_URL + '/images/giving/Transfer.png'
                    }
                  />
                </Flex>
                <Flex flexDir="column" gap={3}></Flex>
              </Center>
              <Text fontSize={bodyFontSize}>
                Personal information is kept confidential, used only for tax
                receipt purposes, and is only accessible by the Stewardship
                Team.
              </Text>
              <Text fontSize={bodyFontSize}>
                If you have any questions, please do not hesitate to contact us:{' '}
                <a href="mailto:stewardship@hongkong.hmcc.net">
                  stewardship@hongkong.hmcc.net
                </a>
              </Text>
            </Flex>
          </Flex>
        </Container>
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
