import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  ListItem,
  UnorderedList,
  AccordionIcon,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import GivingCard from './GivingCard.js';

const GivingPage = (props) => {
  return (
    <Container maxW="container.lg">
      <VStack w="100%" spacing="3vw" py="3vw">
        <Box
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/giving/Banner.png')`}
          bgPosition="center"
          bgSize="cover"
          fontFamily="Manrope"
        >
          <Heading
            fontFamily="DMSerifDisplay_Italic"
            as="h1"
            fontSize={['5xl', '5xl', '6xl']}
            align="center"
            paddingTop="1vw"
            color="#319795"
            fontWeight="bold"
          >
            Giving
          </Heading>
          <VStack px="3" py="6">
            <Heading
              as="h4"
              fontSize={['md', 'md', 'lg']}
              align="center"
              color="#319795"
              fontWeight="bold"
              fontFamily="DMSerifDisplay_Regular"
            >
              At HMCC, we believe that when God gives someone a vision, He will
              always provide for that vision.
            </Heading>

            <Text align="center" fontSize={['sm', 'md', 'md']}>
              {' '}
              <Text fontWeight="bold">
                God invites us to partner with Him in His ministry of making
                disciples and transforming the world.
              </Text>
              Our financial giving—whether it is regular tithes or additional
              gifts—is not only an expression of thankfulness and worship unto
              God, but also an act of faith that God will provide and equip His
              church for His mission.
            </Text>

            <Text align="center" fontSize={['sm', 'md', 'md']}>
              Your gift propels us towards our vision and enables our church to
              respond swiftly with obedience to God's calling. We invite you to
              contribute to this vision and play a vital role in what God is
              doing!
            </Text>
          </VStack>
        </Box>
      </VStack>
      <Center fontFamily="Manrope">
        <Flex
          h={['100%', '100%', '13em']}
          direction={['column', 'column', 'row']}
          paddingBottom={[0, 0, '2vh']}
          minW="100%"
        >
          <Box
            w={['100%', '100%', '32%']}
            h="20%"
            borderRadius="lg"
            fontFamily="Manrope"
          >
            <Heading
              as="h3"
              size="xl"
              paddingBottom="1vw"
              color="#319795"
              fontFamily="DMSerifDisplay_Italic"
            >
              Ways to Give:
            </Heading>
            <Text
              fontWeight="bold"
              paddingBottom="1vw"
              fontFamily="DMSerifDisplay_Regular"
            >
              There are a few different ways you can give to our church
            </Text>
            <Text as="i" color="#319795" fontSize="12">
              *When giving, please always use your legal name and provide the
              same email address consistently.
            </Text>
          </Box>
          <Spacer />
          <GivingCard
            text="FPS"
            imageLink={process.env.PUBLIC_URL + '/images/giving/FPS.png'}
          />
          <Spacer />
          <GivingCard
            text="Bank Transfer"
            imageLink={process.env.PUBLIC_URL + '/images/giving/Transfer.png'}
          />
        </Flex>
      </Center>

      <Center>
        <Flex
          direction={['column', 'column', 'row']}
          minW="100%"
          h={['100%', '100%', '13em']}
        >
          <GivingCard
            text="Cash"
            imageLink={process.env.PUBLIC_URL + '/images/giving/Cash.png'}
          />
          <Spacer />
          <GivingCard
            text="Online Giving"
            imageLink={process.env.PUBLIC_URL + '/images/giving/Online.png'}
          />
          <Spacer />
          <GivingCard
            text="Cheque"
            imageLink={process.env.PUBLIC_URL + '/images/giving/Cheque.png'}
          />
        </Flex>
      </Center>
      <Box paddingTop="2vh">
        <Text as="i">
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team.
        </Text>
      </Box>
      <Box paddingTop="2vh">
        <Text as="i">
          If you have any questions, please do not hesitate to contact us:&nbsp;
        </Text>
        <Text as="i" fontWeight="bold">
          stewardship@hongkong.hmcc.net
        </Text>
      </Box>
      <Box paddingBottom="10vh" fontFamily="Manrope">
        <Box display={{ base: 'none', md: 'block', lg: 'block' }}>
          <Heading
            as="h1"
            fontSize="5xl"
            paddingTop="4vw"
            paddingBottom="1vw"
            px="1vh"
          >
            Frequently Asked Question
          </Heading>
        </Box>
        <Box display={{ base: 'block', md: 'none', lg: 'none' }}>
          <Heading as="h1" fontSize={['5xl', '5xl', '6xl']} py="4vw" px="1vh">
            FAQs
          </Heading>
        </Box>

        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4" minw="100%">
                    Giving Categories
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              When you give, you can give under any of the following categories:
              <UnorderedList>
                <ListItem>Tithe: 10% of your regular income</ListItem>
                <ListItem>
                  Weekly Offering: offering that you give exclusive of your
                  tithe
                </ListItem>
                <ListItem>
                  Thanksgiving Offering: offering given out of a thankful heart
                  toward God
                </ListItem>
                <ListItem>
                  HMI: General Missions Fund: Offering to our church’s efforts
                  towards mission work
                </ListItem>
                <ListItem>
                  HMI-P: Giving to a specific short-term missions project team
                  or members
                </ListItem>
                <ListItem>
                  Other: any other specific offering you would like to indicate
                </ListItem>
              </UnorderedList>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4">
                    Tax Exemption
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Harvest Mission Community Church (Hong Kong) Limited is a
              registered charity recognized by the Inland Revenue Department in
              Hong Kong. Donations to “Harvest Mission Community Church (Hong
              Kong) Limited” can be exempted from income tax in Hong Kong.
              Giving receipts will be available to all donors who include their
              personal details on the offering envelope or email us at
              stewardship@hongkong.hmcc.net to request a receipt. Members will
              receive their giving reports at the end of the Hong Kong fiscal
              year in April, in compliance with the Hong Kong SAR government.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Container>
  );
};
export default GivingPage;
