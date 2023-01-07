import {
  Box,
  Text,
  Container,
  VStack,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';

const MissionsContainer = () => {
  return (
    <Box bgColor="#254B72" pb="5vh">
      <Box
        w="100vw"
        h={['46vh', '100vh']}
        bgImage={[
          process.env.PUBLIC_URL + '/images/tmp-2023/hero_mobile.png',
          process.env.PUBLIC_URL + '/images/tmp-2023/hero_web.png',
        ]}
        bgSize="cover"
        bgPos="top center"
      >
        {/* <Image src={process.env.PUBLIC_URL + '/images/tmp-2023/hero_web.png'} /> */}
      </Box>
      <Box
        w="100vw"
        bgImage={process.env.PUBLIC_URL + '/images/tmp-2023/middle_bg.png'}
        bgSize="contain"
        bgRepeat="repeat"
        bgPos="top center"
      >
        <Container
          maxW="container.md"
          color="white"
          mt={['0', '3em']}
          textAlign="justify"
        >
          <VStack gap={4}>
            <Text fontSize="3xl">WHY</Text>
            <Text>
              <b>Why do we go on missions as a Christ follower?</b>
              <br />
              As we have experienced the fullness of the Gospel as Christ
              followers, we are called to respond and obey the Great
              Commandment: to love God and love others (Matthew 22:37-39), and
              the Great Commission: to go out and make disciples of all nations
              (Matthew 28:19).
            </Text>
            <Text>
              <b>How does missions fit into our church’s vision and mission?</b>
              <br />
              In our church, missions is ingrained in our DNA. We want to see
              the multiplication of churches in campuses and cities to transform
              the next generation among the nations, and where lost people are
              transformed into Christ’s disciples who will then transform the
              world. Short term missions projects are one way to be inspired and
              experience this.
            </Text>
            <Text>
              <b>
                Why are we going to Thailand for Missions this Chinese New Year?
              </b>
              <br />
              By God’s grace, as the borders opened up, we were offered the
              opportunity to enter Thailand and serve the local ministry in the
              region. We see this as a way to respond to God’s calling for us to
              live out the Great Commandment and Commission.
            </Text>
            <Text pt="2em" fontSize="3xl">
              WHAT
            </Text>
            <Text>
              <b>What We Will be Doing</b>
              <br />
              The 12 members of the Thailand Missions Project Team will be going
              to Bangkok and Chiang Mai between January 20th - 29th. During
              their time there, the team will:
            </Text>
            <Text w="100%">
              <UnorderedList>
                <ListItem>
                  Spend time with the children and teachers at Mango House in
                  Chiang Mai through after-school and weekend activities;
                </ListItem>
                <ListItem>
                  Serve the refugees from Myanmar in Northern Thailand who left
                  due to instability in the region; and
                </ListItem>
                <ListItem>
                  Steep ourselves in the city of Bangkok and learn about the
                  spiritual climate with local missionaries.
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>
              For more details of Mango House whom we will be partnering with
              during our time in Thailand, check out{' '}
              <Link href="https://www.elijahfoundation.org/mangohouse">
                https://www.elijahfoundation.org/mangohouse
              </Link>
            </Text>

            <Text pt="2em" fontSize="3xl">
              HOW TO SUPPORT
            </Text>
            <Text>
              <b>Prayer Support:</b>
              We believe that apart from God, we can do nothing. We also want to
              invite you to partner with us in God’s mission through prayer.
              Therefore, we want to seek God in everything we do as we enter
              this Missions Project. Here are our prayer requests:
            </Text>
            <Text>
              <UnorderedList>
                <ListItem>
                  <b>
                    <i>UNITY</i>
                  </b>{' '}
                  as a team. To support one another as the body of Christ and
                  grow deeper in our love for God and His people.
                </ListItem>
                <ListItem>
                  <b>
                    <i>PROVISION</i>
                  </b>{' '}
                  in the Missions Project. For God’s provision and protection
                  over the Missions Project during the process of training and
                  fieldwork.
                </ListItem>
                <ListItem>
                  <b>
                    <i>GOSPEL</i>
                  </b>{' '}
                  to be shared. For the children and people we will encounter in
                  Thailand to experience the transformative power of the Gospel.
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>
              <b>Financial Support</b>: To respond to God’s calling on the team
              to share the Gospel with the people in Thailand, we also need to
              raise <b>HK$152,900</b> before January 20th to support the various
              expenses on the trip and the local needs.
            </Text>
            <Text w="100%">
              <b>Giving by Cash</b>
              <UnorderedList>
                <ListItem>
                  Please put cash in an envelope and include a{' '}
                  <u>
                    note: "HMI-P for{' '}
                    <Text as="span" color="#FFFF00">
                      TEAM MEMBER NAME
                    </Text>
                    "
                  </u>
                </ListItem>
                <ListItem>
                  You may drop it off in the offering box at HMCC at Sunday
                  Celebration
                </ListItem>
              </UnorderedList>
            </Text>
            <Text w="100%">
              <b>Giving by Cheque</b>
              <UnorderedList>
                <ListItem>
                  All Checks should be made out to: “Harvest Mission Community
                  Church (Hong Kong) Limited”
                </ListItem>
                <ListItem>
                  Please put the cheque in an envelope and include a{' '}
                  <u>
                    note: "HMI-P for{' '}
                    <Text as="span" color="#FFFF00">
                      TEAM MEMBER NAME
                    </Text>
                    "
                  </u>
                </ListItem>
                <ListItem>
                  You may drop off the cheque in an offering box also mail it
                  to: <br /> P.O. Box 50443 Sai Ying Pun Post Office Sai Ying
                  Pun, Hong Kong
                </ListItem>
              </UnorderedList>
            </Text>
            <Text w="100%">
              <b>Giving by Bank Transfer</b>
              <UnorderedList>
                <ListItem>
                  Bank Name: China Construction Bank (Asia) Corporation Limited
                  <br />
                  Bank Code: 009
                  <br />
                  Branch Code: 845
                  <br />
                  Account Name: Harvest Mission Community Church (Hong Kong)
                  <br />
                  Limited Account Number: 400147911
                  <br />
                  Please{' '}
                  <u>
                    note: "HMI-P for{' '}
                    <Text as="span" color="#FFFF00">
                      TEAM MEMBER NAME
                    </Text>
                    "
                  </u>
                </ListItem>
                <ListItem>
                  If our account name is too long and exceeds the number of
                  permitted characters, you may shorten it as “Harvest Mission
                  Community Church HK”.
                </ListItem>
                <ListItem>
                  Please email a copy of your transfer receipt along with your
                  Full Name within 2 weeks to{' '}
                  <Link href="mailto:stewardship@hongkong.hmcc.net">
                    stewardship@hongkong.hmcc.net
                  </Link>
                  .
                </ListItem>
              </UnorderedList>
            </Text>
            <Text w="100%">
              <b>Giving by Credit Card (also for those abroad)</b>
              <UnorderedList>
                <ListItem>
                  Please use this{' '}
                  <Link href="https://tithe.ly/give_new/www/#/tithely/give-one-time/645349">
                    link
                  </Link>{' '}
                  to give online via credit card:
                  <br />
                  <Link href="https://tithe.ly/give_new/www/#/tithely/give-one-time/645349">
                    https://tithe.ly/give_new/www/#/tithely/give-one-time/645349
                  </Link>
                </ListItem>
                <ListItem>
                  Kindly note that a portion of your giving will be deducted for
                  online credit card transactions (3.5% + HKD $2.35 processing
                  fee). If you wish for 100% of your contribution to go towards
                  our church’s ministry work, please check the box to “cover
                  fees” on the giving site
                </ListItem>
                <ListItem>
                  In the giving category "To:" please select "HMI-P (Specific
                  Missions Project)"
                </ListItem>
                <ListItem>
                  In the note/memo section at the bottom, please{' '}
                  <u>
                    note: "HMI-P for{' '}
                    <Text as="span" color="#FFFF00">
                      TEAM MEMBER NAME
                    </Text>
                    "
                  </u>
                </ListItem>
              </UnorderedList>
            </Text>
            <Text w="100%" pb="5em">
              <b>Other Support Raising Initiatives</b>
              <UnorderedList>
                <ListItem>
                  Hoodie & T-Shirt Purchasing Link:{' '}
                  <Link href="https://bit.ly/TMP23Merch">
                    <u>bit.ly/TMP23Merch</u>
                  </Link>
                </ListItem>
                <ListItem>
                  Bidding Challenge{' '}
                  <Link href="https://bit.ly/TMPBiddingChallenge">
                    <u>bit.ly/TMPBiddingChallenge</u>
                  </Link>
                </ListItem>
              </UnorderedList>
            </Text>
          </VStack>
        </Container>
      </Box>
      <Box
        w="100vw"
        h="33vh"
        bgImage={process.env.PUBLIC_URL + '/images/tmp-2023/footer.png'}
        bgSize="cover"
        bgPosition="top center"
      ></Box>
    </Box>
  );
};

export default MissionsContainer;
