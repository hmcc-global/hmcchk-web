import {
  Flex,
  Text,
  VStack,
  Container,
  Highlight,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize } from './RippleOutTextStyle';
import RippleOutStoryCard from './RippleOutStoryCards';
import storyCardsContent from './storyCardsContent.json';
import { useState } from 'react';



const RippleOutStoryContainer = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, isBigMobile, isSmallTablet, isMediumTablet, isLargeTablet, isDesktop] = useMediaQuery([
    '(max-width : 410px)',
    '(max-width : 500px)',
    '(max-width : 800px)',
    '(max-width : 950px)',
    '(max-width : 1400px)',
    '(min-width : 1400px',
  ]);

  const NextArrow = (props) => {
    const { onClick, index, maxSlide } = props;
    return index !== maxSlide - 1 ? (
      <div
        style={{
          display: 'block',
          position: 'absolute',
          right: isMobile
            ? '-11%'
            : isBigMobile
            ? '-10%'
            : isSmallTablet
            ? '2.5%'
            : isMediumTablet
            ? '1%'
            : isLargeTablet
            ? '5%'
            : '10%',
          top: isMobile
            ? '9%'
            : isBigMobile
            ? '12%'
            : isSmallTablet
            ? '17.5%'
            : isMediumTablet
            ? '20%'
            : isLargeTablet
            ? '23%'
            : '23%',
          zIndex: 8,
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <Image
          src={process.env.PUBLIC_URL + '/images/home/NextArrow.png'}
          boxSize={['50%', '80%']}
          alt="Arrow"
        />
      </div>
    ) : null;
  };

  const PrevArrow = (props) => {
    const { onClick, index } = props;
    return index !== 0 ? (
      <div
        style={{
          display: 'block',
          position: 'absolute',
          left:
            isMobile || isBigMobile
              ? '0%'
              : isSmallTablet
              ? '5%'
              : isMediumTablet
              ? '3%'
              : isLargeTablet
              ? '6.5%'
              : '11.5%',
          top: isMobile
            ? '9%'
            : isBigMobile
            ? '12%'
            : isSmallTablet
            ? '17.5%'
            : isMediumTablet
            ? '20%'
            : isLargeTablet
            ? '23%'
            : '23%',
          zIndex: 8,
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <Image
          src={process.env.PUBLIC_URL + '/images/home/PrevArrow.png'}
          boxSize={['50%', '80%']}
          alt="Arrow"
        />
      </div>
    ) : null;
  };

  const onArrowClick = (e) => {
    setSlideIndex(e);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: (
      <NextArrow index={slideIndex} maxSlide={storyCardsContent.length} />
    ),
    prevArrow: <PrevArrow index={slideIndex} />,
    afterChange: onArrowClick,
  };

  const sliderStyle = {
    width: '100%',
    position: 'relative',
    height: 'auto',
  };

  return (
    <>
      <RippleOutHeroSection />
      <Flex
        flexDir="column"
        bgGradient="linear(120deg, rgba(132,225,255,0.5), rgba(197,230,212,0.5), rgba(255,235,174,0.5));"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
          px={isDesktop ? '' : '0'}
        >
          <Text
            fontSize={headerFontSize}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
            px={['0.4em', '0.25em']}
          >
            THE STORY
          </Text>

          <VStack px={'1em'} mt={['2.5em', '5em']} textAlign="center">
            <Text
              fontSize={['2.25em', '2.75em', '3.25em', '3.75em', '4.25em']}
              lineHeight={['1.5em', '1.5em']}
              textStyle="darker_grotesque_medium"
            >
              <Highlight
                query={['ripple out', 'saturate vision']}
                styles={{
                  px: '1',
                  bg: '#D7BB84',
                  fontWeight: '800',
                  color: '#182E57',
                }}
              >
                We are called to ripple out as we live out our Saturate vision
                to saturate Hong Kong with the knowledge of God’s glory
              </Highlight>
            </Text>
          </VStack>
          <Image
            src={
              process.env.PUBLIC_URL +
              '/images/ripple-out/ripple-out-story-circles.png'
            }
            boxSize={'100%'}
            height={['11.5em', '13em', '16em', '20em', '100%']}
            objectFit="cover"
            my={'2em'}
          />
          <VStack px={'1em'} textAlign={'center'}>
            <Text
              fontSize={['1.5em', '1.75em', '2.25em', '2.5em', '2.75em']}
              fontWeight={800}
              textStyle="darker_grotesque_medium"
            >
              TRANSFORMING LIVES. TRANSFORMING THE WORLD.
            </Text>
            <Text
              fontSize={['1.65em', '1.80em', '2.40em', '2.65em', '2.9em']}
              fontWeight={600}
              mt={['1.5em', '2.5em']}
              mb={'0.5em'}
            >
              SWIPE TO READ OUR STORY {'>>'}
            </Text>
          </VStack>
          <Slider {...sliderSettings} style={sliderStyle}>
            {storyCardsContent.length > 0 &&
              storyCardsContent.map((storyCardContent, i) => {
                return (
                  <RippleOutStoryCard
                    storyCardContent={storyCardContent}
                    key={'ripple-out-story' + i}
                  />
                );
              })}
          </Slider>
        </Container>
      </Flex>
      <RippleOutFaqSection pageTopic="ripple-out-story" />
    </>
  );
};

export default RippleOutStoryContainer;
