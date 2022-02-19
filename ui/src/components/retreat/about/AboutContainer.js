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
import '@fontsource/sora';
import '@fontsource/inter';
import { HashLink } from 'react-router-hash-link';
import HorizontalScroll from 'react-scroll-horizontal';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Slider from 'react-slick';
import React from 'react';

const NavButton = ({ to, color, name }) => {
  const buttonSize = useBreakpointValue(['xs', 'sm', 'md']);
  return (
    <HashLink smooth to={to}>
      <Button
        borderRadius="20px"
        bg={color}
        color="white"
        justify="center"
        boxShadow="lg"
        textStyle="sora"
        size={buttonSize}
      >
        {name}
      </Button>
    </HashLink>
  );
};

const AboutContainer = () => {
  const child = { width: `100%`, height: `100%` };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
  };

  const sliderStyle = {
    width: '95%',
    position: 'relative',
    // left: '50%',
    // right: '50%',
    // marginLeft: '-50vw',
    // marginRight: '-50vw',
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
              to="/with-everything/about#theme"
              color="#FFC93E"
              name="Theme"
            />
            <NavButton
              to="/with-everything/about#speaker"
              color="#EE794E"
              name="Speaker Profile"
            />
          </HStack>
          <ThemeSection id="theme" />
        </VStack>
      </Container>
    </Flex>
  );
};

export default AboutContainer;
