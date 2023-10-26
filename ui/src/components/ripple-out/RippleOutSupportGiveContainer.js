import {
  Container,
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  Center,
  Spacer,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import RippleOutGivingCard from './RippleOutGivingCard';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize, bodyFontSize } from './RippleOutTextStyle';
import RippleOutBarChart from './RippleOutBarChart';

const RippleOutSupportGiveContainer = () => {
  return (
    <>
      <RippleOutHeroSection />
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
                  <GridItem minH="40vh">
                    <RippleOutBarChart height="100%" width="100%" />
                  </GridItem>
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
                  <RippleOutGivingCard
                    text="FPS"
                    imageLink={
                      process.env.PUBLIC_URL + '/images/giving/FPS.png'
                    }
                  />
                  <Spacer />
                  <RippleOutGivingCard
                    text="Online Giving"
                    imageLink={
                      process.env.PUBLIC_URL + '/images/giving/Online.png'
                    }
                  />
                  <Spacer />
                  <RippleOutGivingCard
                    text="Bank Transfer"
                    imageLink={
                      process.env.PUBLIC_URL + '/images/giving/Transfer.png'
                    }
                  />
                </Flex>
                <Flex flexDir="column" gap={3}></Flex>
              </Center>
              <Text fontSize={bodyFontSize}>
                If you are giving from the US, you may give to our Chase account
                via Zellepay using the email stewardship@hongkong.hmcc.net
              </Text>
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
      <RippleOutFaqSection pageTopic="ripple-out-support" />
    </>
  );
};

export default RippleOutSupportGiveContainer;
