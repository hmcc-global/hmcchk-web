import {
  Image,
  AspectRatio,
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
        h={['50vh', '100vh']}
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
        bgPos="center"
      >
        <Container
          maxW="container.md"
          color="white"
          mt="3em"
          textAlign="justify"
        >
          <VStack gap={4}>
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
              <br /> In our church, missions is ingrained in our DNA. We want to
              see the multiplication of churches in campuses and cities to
              transform the next generation among the nations, and where lost
              people are transformed into Christ’s disciples who will then
              transform the world. Short term missions projects are one way to
              be inspired and experience this.
            </Text>
            <Text>
              <b>
                Why are we going to Thailand for Missions this Chinese New Year?
              </b>
              <br /> By God’s grace, as the borders opened up, we were offered
              the opportunity to enter Thailand and serve the local ministry in
              the region. We see this as a way to respond to God’s calling for
              us to live out the Great Commandment and Commission.
            </Text>
            <Text>
              What We Will be Doing The 12 members of the Thailand Missions
              Project Team will be going to Bangkok and Chiang Mai between
              January 20th - 29th. During their time there, the team will:
            </Text>
            <Text w="100%">
              <UnorderedList>
                <ListItem>
                  Spend time with the children and teachers in Mango House at
                  Chiang Mai through after-school and weekend activities
                </ListItem>
                <ListItem>
                  Serve the refugees from Myanmar in Northern Thailand who left
                  due to instability in the region
                </ListItem>
                <ListItem>
                  Steep ourselves in the city and learn about the spiritual
                  climate with local missionaries in Bangkok.
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
            <Text>
              <b>Prayer Support:</b> We believe that apart from God, we can do
              nothing. Therefore, we want to seek God in everything we do as we
              enter this Missions Project. Here are our prayer requests:
            </Text>
            <Text>
              <UnorderedList>
                <ListItem>
                  UNITY as a team. To support one another as the body of Christ
                  and grow deeper in our love for God and His people.
                </ListItem>
                <ListItem>
                  PROVISION in the Missions Project. For God’s provision and
                  protection over the Missions Project during the process of
                  training and fieldwork.
                </ListItem>
                <ListItem>
                  GOSPEL to be shared. For the children and people we will
                  encounter in Thailand to experience the transformative power
                  of the Gospel.
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>
              <b>Financial Support</b>: To respond to God’s calling on the team
              to share the Gospel with the people in Thailand, we also need to
              raise HK$152,900 before January 20th to support the various
              expenses on the trip and the local needs. If you feel convicted to
              partner with us financially, you can give through the following
              instructions on our website: hongkong.hmcc.net/tmp-2023
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
