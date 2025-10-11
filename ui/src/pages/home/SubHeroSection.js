import React from 'react';
import {
  Container,
  Grid,
  Stack,
  Text,
  Fade,
} from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import TitleCard from '../../components/Card/TitleCard';

const LinkCardInfo = [
  {
    path: '/discover',
    mobileImage: 'imnew-mobile.svg',
    desktopImage: 'imnew.svg',
    title: "I'm New",
    textDesktop: 'Find out how you can get involved in our church community',
    textMobile: 'Get involved in our church community',
    bgPosition: ['center bottom', 'left bottom'],
  },

  {
    path: '/discover/visit-us-page',
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
  // {
  //   path: '/',
  //   mobileImage: 'resources.svg',
  //   desktopImage: 'resources.svg',
  //   title: 'Resources',
  //   textDesktop: 'Access various tools and resources created by our church',
  //   textMobile: 'Access various tools and resources created by our church',
  //   bgPosition: ['center bottom', 'left bottom'],
  // },
];

const SubHeroSection = () => {
  return (
    <>
      <InView rootMargin="-50px" triggerOnce={true}>
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
                    'repeat(3, 1fr)',
                  ]}
                  gap={5}
                  fontFamily="Manrope"
                >
                  {LinkCardInfo.map((data, i) => {
                    return (
                      <TitleCard
                        key={'linkCardInfo' + i}
                        title={data.title}
                        bgDesktopImage={data.desktopImage}
                        bgMobileImage={data.mobileImage}
                        bgPosition={data.bgPosition}
                        linkTo={data.path}
                        body={
                          <Text
                            fontSize={{ base: '0.825rem', md: '1rem' }}
                            color="#4A6EEB"
                          >
                            <Text
                              as="span"
                              whiteSpace="pre-wrap"
                              display={['none', 'none', 'inline-block']}
                            >
                              {data.textDesktop}
                            </Text>
                            <Text
                              as="span"
                              whiteSpace="pre-wrap"
                              display={['inline-block', 'inline-block', 'none']}
                            >
                              {data.textMobile}
                            </Text>
                          </Text>
                        }
                      />
                    );
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
