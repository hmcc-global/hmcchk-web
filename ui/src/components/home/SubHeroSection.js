import React from 'react';
import {
  Container,
  Grid,
  Image,
  Link,
  Stack,
  Text,
  Flex,
  Fade,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { InView } from 'react-intersection-observer';

const LinkCardInfo = [
  {
    path: '/connect',
    mobileImage: 'imnew-mobile.svg',
    desktopImage: 'imnew.svg',
    title: "I'm New",
    textDesktop: 'Find out how you can get involved in our church community',
    textMobile: 'Get involved in our church community',
    bgPosition: ['center bottom', 'left bottom'],
  },
  {
    path: '/visit-us',
    mobileImage: 'visit-us.svg',
    desktopImage: 'visit-us.svg',
    title: 'Visit Us',
    textDesktop: 'Check out our church by joining our Sunday Celebration',
    textMobile: 'Check out our church by joining our Sunday Celebration',
    bgPosition: ['center bottom', 'left bottom'],
  },
  {
    path: '/sermons',
    mobileImage: 'sermons-mobile.svg',
    desktopImage: 'sermons.svg',
    title: 'Sermons',
    textDesktop: 'Watch the latest sermons from HMCC of Hong Kong',
    textMobile: 'Watch the latest sermons from HMCC of Hong Kong',
    bgPosition: ['center bottom', 'left bottom'],
  },
  {
    path: '/',
    mobileImage: 'resources.svg',
    desktopImage: 'resources.svg',
    title: 'Resources',
    textDesktop: 'Access various tools and resources created by our church',
    textMobile: 'Access various tools and resources created by our church',
    bgPosition: ['center bottom', 'left bottom'],
  },
];

const LinkCard = (props) => {
  return (
    <Link
      as={ReactLink}
      to={{ pathname: props.path }}
      _hover={{
        textDecoration: 'none',
        color: '#4A6EEB',
      }}
      w="100%"
    >
      <Flex
        direction="column"
        justifyContent={['none', 'space-around', 'space-between']}
        border="1px solid #4A6EEB"
        borderRadius="5"
        backgroundImage={[
          process.env.PUBLIC_URL + '/images/home/' + props.mobileImage,
          process.env.PUBLIC_URL + '/images/home/' + props.mobileImage,
          process.env.PUBLIC_URL + '/images/home/' + props.desktopImage,
        ]}
        bgPosition={props.bgPosition}
        bgRepeat="no-repeat"
        bgSize="contain"
        minH={['4em', '5em', '6em', '10.75em']}
        p={[3, 3, 5, 5]}
        spacing="0"
      >
        <Stack direction="row" justifyContent="space-between">
          <Text
            fontSize={['1.5rem', '1.5rem', '2rem']}
            fontFamily="DMSerifDisplay_Italic"
          >
            {props.title}
          </Text>
          <Image
            pl="5"
            pb={[0, 0, 0, '5']}
            h={['2em', '2em', '2.5em', '3em']}
            w="auto"
            src={process.env.PUBLIC_URL + '/images/home/call-made.svg'}
          />
        </Stack>

        <Text fontSize={{ base: '0.825rem', md: '1rem' }} color="#4A6EEB">
          <Text
            as="span"
            whiteSpace="pre-wrap"
            display={['none', 'none', 'inline-block']}
          >
            {props.textDesktop}
          </Text>
          <Text
            as="span"
            whiteSpace="pre-wrap"
            display={['inline-block', 'inline-block', 'none']}
          >
            {props.textMobile}
          </Text>
        </Text>
      </Flex>
    </Link>
  );
};

const SubHeroSection = () => {
  return (
    <>
      <InView rootMargin="-200px" triggerOnce={true}>
        {({ inView, ref }) => (
          <Fade transition={{ enter: { duration: 1 } }} in={inView}>
            <Container
              display="flex"
              maxW="container.xl"
              justifyContent="flex-start"
              my={['5', '5', '7vh']}
              ref={ref}
            >
              <Stack w="100%" fontFamily="Manrope">
                <Text
                  px={[0, 0, '5%']}
                  textAlign={['justify', 'justify', 'center']}
                  fontSize={['1rem', '1rem', '1.4rem']}
                >
                  <b>Harvest Mission Community Church of Hong Kong</b> is an
                  international church planted in 2015, when a team of 20 people
                  came to Hong Kong with a vision to reach this great city. We
                  value transculturalism and we actively reach out to people
                  from all walks of life, specifically students, working adults,
                  and families.
                </Text>
                <Grid
                  pt={['10vh', '10vh', '7vh']}
                  w="100%"
                  templateColumns={[
                    'repeat(1, 1fr)',
                    'repeat(1, 1fr)',
                    'repeat(1, 1fr)',
                    'repeat(4, 1fr)',
                  ]}
                  gap={5}
                  fontFamily="Manrope"
                >
                  {LinkCardInfo.map((data, i) => {
                    return <LinkCard key={'linkCardInfo' + i} {...data} />;
                  })}
                </Grid>
              </Stack>
            </Container>
          </Fade>
        )}
      </InView>
    </>
  );
};

export default SubHeroSection;
