import {
  Flex,
  Box,
  Grid,
  GridItem,
  Center,
  Text,
  Spacer,
  VStack,
  Image,
  HStack,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import RippleOutBarChart from './RippleOutBarChart';
import RippleOutGivingCard from './RippleOutGivingCard';
import {
  subHeaderFontSize,
  headerFontSize,
  bodyFontSize,
} from '../RippleOutTextStyle';
import RippleOutCalculatorSection from './RippleOutCalculatorSection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RippleOutGiveSection = ({ giveData }) => {
  const data = giveData.content;
  const [slider, setSlider] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    slidesPerRow: 1,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    afterChange: (index) => setSlider(index),
    // customPaging: (index) => {
    //   console.log(index, slider);
    //   return (
    //     <Box
    //       w="0"
    //       border={index === 2 ? '8px solid #2A3A58' : '8px solid #B6C1D7'}
    //       borderRadius="20px"
    //       display="flex"
    //       cursor="pointer"
    //       marginTop="20px"
    //     />
    //   );
    // },
  };
  return (
    <>
      <Text
        fontSize={subHeaderFontSize}
        textStyle="darker_grotesque_black"
        lineHeight="0.9em"
      >
        GIVE TO THE CAMPAIGN
      </Text>
      <Box
        bg="#ffffff"
        px="10"
        py="5"
        border="2px solid #182E57"
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
                <Text mt={5} fontSize="lg" textStyle="darker_grotesque_bold">
                  {data[0].data}
                </Text>
              </Flex>
            </Center>
          </GridItem>
          <GridItem display="flex" justifyContent="flex-end" minH="40vh">
            <RippleOutBarChart height="100%" width={['100%', '80%']} />
          </GridItem>
        </Grid>
      </Box>
      <Text fontSize={bodyFontSize} fontWeight={500}>
        {data[2].data[0]}
        <Box as="span" fontWeight={700}>
          {data[2].data[1]}
        </Box>
        {data[2].data[2]}
      </Text>

      {/* Plans ahead */}
      <Text
        fontSize={subHeaderFontSize}
        textStyle="darker_grotesque_black"
        lineHeight="0.9em"
      >
        PLAN AHEAD
      </Text>
      <Flex w="100%">
        <VStack w="100%">
          <Text fontSize={bodyFontSize} fontWeight={500}>
            Here’s an illustration of how a small act of giving over time can go
            a long way to contribute to the{' '}
            <Box as="span" fontWeight={700}>
              Ripple Out Campaign
            </Box>
          </Text>
          <Box w="100%">
            <Slider {...settings}>
              <Box>
                <Image
                  padding="0px 10px"
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/illustration-graph-1.png`}
                />
              </Box>
              <Box>
                <Image
                  padding="0px 10px"
                  src={`${process.env.PUBLIC_URL}/images/ripple-out/illustration-graph-2.png`}
                />
              </Box>
            </Slider>
          </Box>
        </VStack>
      </Flex>
      {/* Calculator section */}
      <RippleOutCalculatorSection />
      {/* Ways to give */}
      <Flex flexDir="column" gap={3}>
        <Text
          fontSize={['1.35em', '2.5em']}
          lineHeight="0.9em"
          textStyle="darker_grotesque_black"
        >
          WAYS TO GIVE
        </Text>
        <Text fontSize={bodyFontSize}>
          There are a few different ways you can give to the Ripple Out Campaign
        </Text>
        <Center minW="100%">
          <Flex
            direction={['column', 'column', 'row']}
            minW="100%"
            h={['100%', '100%', '13em']}
          >
            <RippleOutGivingCard
              text="FPS"
              imageLink={process.env.PUBLIC_URL + '/images/giving/FPS.png'}
            />
            <Spacer />
            <RippleOutGivingCard
              text="Online Giving"
              imageLink={process.env.PUBLIC_URL + '/images/giving/Online.png'}
            />
            <Spacer />
            <RippleOutGivingCard
              text="Bank Transfer"
              imageLink={process.env.PUBLIC_URL + '/images/giving/Transfer.png'}
            />
          </Flex>
          <Flex flexDir="column" gap={3}></Flex>
        </Center>
        <Text fontSize={bodyFontSize} fontWeight={600}>
          When giving, please{' '}
          <Box as="span" textDecoration="underline">
            always
          </Box>{' '}
          leave a note in the transfer remark:
        </Text>
        <Text fontSize={bodyFontSize} fontWeight={600}>
          Transfer Remarks:{' '}
          <Box
            textStyle="darker_grotesque_black"
            as="span"
            background="#C9DDED"
            borderRadius="15px"
            padding="2px 10px"
          >
            RIPPLE OUT: {'{{Your full name}}'}
          </Box>
        </Text>
        <Text fontSize={bodyFontSize}>
          Note: Please email{' '}
          <Box as="span" textDecoration="underline">
            stewardship@hongkong.hmcc.net
          </Box>{' '}
          with your full name and transfer receipt, especially if you forgot to
          leave a remark or memo in the online giving process, for
          record-keeping purposes
        </Text>
        <Text fontSize={bodyFontSize}>
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team. If you have
          any questions, please do not hesitate to contact us:{' '}
          <Link
            textDecoration="underline !important"
            href="mailto:stewardship@hongkong.hmcc.net"
          >
            stewardship@hongkong.hmcc.net
          </Link>
        </Text>
      </Flex>
    </>
  );
};

export default RippleOutGiveSection;
