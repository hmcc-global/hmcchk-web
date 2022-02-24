import {
  Flex,
  Text,
  Box,
  HStack,
  VStack,
  Container,
  Button,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import retreatTheme from '../retreatTheme';
import ThemeSection from './ThemeSection';
import SpeakerSection from './SpeakerSection';
import { useEffect, useState, useRef } from 'react';
import '@fontsource/sora';
import '@fontsource/inter';
import './fadeIn.css';

const NavButton = ({ color, name, ...props }) => {
  const buttonSize = useBreakpointValue(['xs', 'sm', 'md']);

  return (
    <Button
      borderRadius="20px"
      bg={color}
      color="white"
      justify="center"
      boxShadow="lg"
      textStyle="sora"
      size={buttonSize}
      _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
      {...props}
    >
      {name}
    </Button>
  );
};

const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

const AboutContainer = () => {
  const [isTheme, setTheme] = useState(true);
  const [isSpeaker, setSpeaker] = useState(false);

  const buttonHandler = () => {
    setTheme((current) => !current);
  };

  return (
    <Flex
      flexWrap="wrap"
      justify="center"
      bgImage="linear-gradient(90deg, #A9E0E3 33%, rgba(0, 0, 0, 0) 33%), linear-gradient(90deg, #FFE9AF 66%, #F2BBA8 66%)"
    >
      <Container maxW={['container.lg']} justify="center" theme={retreatTheme}>
        <Link href="/with-everything">
          <Button
            variant="link"
            fontSize={['xs', 'md', 'lg']}
            color="black"
            justifyContent="left"
            leftIcon={<ChevronLeftIcon />}
            textStyle="inter"
            marginTop="20px"
          >
            CWC Homepage
          </Button>
        </Link>
        <VStack spacing={8} marginTop="20px">
          <Box
            bg="white"
            borderRadius="20px"
            width={['95%', '70%']}
            height={['20%']}
            p={[5, 7]}
          >
            <Text
              textStyle="sora"
              fontSize={['lg', '2xl', '4xl']}
              textAlign="center"
            >
              <b>ABOUT THE CONFERENCE</b>
            </Text>
            <Text
              textStyle="sora"
              fontSize={['md', 'xl', '3xl']}
              textAlign="center"
            >
              <b> With Everything - Church-wide Conference 2022</b>
            </Text>
          </Box>
          <HStack spacing={[2, 5]}>
            <NavButton
              color="#FFC93E"
              name="Theme"
              onClick={() => {
                setTheme(true);
                setSpeaker(false);
              }}
            />
            <NavButton
              color="#EE794E"
              name="Speaker Profile"
              onClick={() => {
                setTheme(false);
                setSpeaker(true);
              }}
            />
          </HStack>
          {isTheme ? (
            <FadeInSection>
              <ThemeSection />
            </FadeInSection>
          ) : null}
          {isSpeaker ? (
            <FadeInSection>
              <SpeakerSection />
            </FadeInSection>
          ) : null}
        </VStack>
      </Container>
    </Flex>
  );
};

export default AboutContainer;
