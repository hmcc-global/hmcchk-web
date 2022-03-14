import {
  VStack,
  Text,
  Image,
  Box,
  Flex,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import './fadeIn.css';

let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
};

const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  let callback = (entries) => {
    entries.forEach((entry) => setVisible(entry.isIntersecting));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`${props.classToUse} ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

const StoryContainer = () => {
  return (
    <>
      <Center>
        <VStack justify="center" w={['90%', '80%', '70%', '50%']}>
          <Text textStyle="Quicksand">Story</Text>
          <Box>
            <Flex>
              <Image
                boxSize={['25%']}
                src={process.env.PUBLIC_URL + '/images/easter/birds2.png'}
              />
              <FadeInSection classToUse="fade-in-section2">
                <Text
                  textStyle="Quicksand"
                  color="#754156"
                  fontSize={['10px', 'sm', 'md', 'md']}
                >
                  <p align="center">
                    A lot of people, if not most people, in this world go
                    through every day on autopilot <b>without</b> knowing why we
                    do what we do.
                  </p>
                </Text>
              </FadeInSection>
              <Image
                boxSize={['20%']}
                src={process.env.PUBLIC_URL + '/images/easter/birds1.png'}
              />
            </Flex>
            <FadeInSection classToUse="fade-in-section1">
              <Image
                src={
                  process.env.PUBLIC_URL + '/images/easter/story1-notext.png'
                }
              />
            </FadeInSection>
          </Box>
          <Box>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(7, 1fr)"
              h="auto"
            >
              <GridItem colSpan={5} colStart={2}>
                <FadeInSection classToUse="fade-in-section2">
                  <Text
                    textStyle="Quicksand"
                    color="#685255"
                    fontSize={['10px', 'sm', 'md', 'md']}
                  >
                    <p align="center">
                      Life becomes <b>mundane</b> because we are{' '}
                      <b>not inspired</b> or motivated by something greater and
                      beyond ourselves.
                    </p>
                  </Text>
                </FadeInSection>
              </GridItem>
              <GridItem colSpan={7} colEnd={9} mb={5}>
                <FadeInSection classToUse="fade-in-section1">
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/easter/story2-notext.png'
                    }
                  />
                </FadeInSection>
              </GridItem>
            </Grid>
          </Box>

          <Box>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(8, 1fr)"
              h="auto"
            >
              <GridItem colSpan={6} colStart={2} mb={5}>
                <FadeInSection classToUse="fade-in-section2">
                  <Text
                    textStyle="Quicksand"
                    color="#147076"
                    fontSize={['10px', 'sm', 'md', 'md']}
                  >
                    <p align="center">
                      When we <b>seek</b> to know the reason and purpose behind
                      things, we open doors to deeper connections, desires,
                      motivations, and stories <b>beyond the surface</b>.
                    </p>
                  </Text>
                </FadeInSection>
              </GridItem>
              <GridItem colSpan={10} mb={5}>
                <FadeInSection classToUse="fade-in-section1">
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/easter/story3-notext.png'
                    }
                  />
                </FadeInSection>
              </GridItem>
            </Grid>
          </Box>

          <Box>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(8, 1fr)"
              h="auto"
            >
              <GridItem colSpan={6} colStart={2}>
                <FadeInSection classToUse="fade-in-section2">
                  <Text
                    textStyle="Quicksand"
                    color="#00367A"
                    fontSize={['10px', 'sm', 'md', 'md']}
                  >
                    <p align="center">
                      We want to keep emphasizing that the <b>reason</b> we do
                      anything is the <b>GOSPEL</b> and it revolves around{' '}
                      <b>who Jesus is and what He has done</b>.
                    </p>
                  </Text>
                </FadeInSection>
              </GridItem>

              <GridItem colSpan={10}>
                <FadeInSection classToUse="fade-in-section1">
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/easter/story4-notext.png'
                    }
                  />
                </FadeInSection>
              </GridItem>
            </Grid>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default StoryContainer;
