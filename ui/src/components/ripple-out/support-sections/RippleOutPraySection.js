import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  fontColor,
  bodyFontSize2,
  subHeaderFontSize,
} from '../RippleOutTextStyle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RippleOutPraySection = ({ prayerData }) => {
  const data = prayerData.content;
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
      <Flex w="100%">
        <VStack spacing={8} display="flex" alignItems="flex-start" w="100%">
          <Text
            fontSize={['1.4em', '2.4em']}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
          >
            PRAY FOR THE CAMPAIGN
          </Text>
          <Box w="100%">
            <Slider {...settings}>
              {data.map((prayer, i) => {
                return (
                  <VStack
                    key={i}
                    w="100%"
                    display="flex"
                    alignItems="flex-start"
                    padding="0px 10px"
                  >
                    <Text
                      fontSize={subHeaderFontSize}
                      textStyle="darker_grotesque_black"
                      lineHeight="0.9em"
                      marginBottom="20px"
                    >
                      {prayer.title}
                    </Text>
                    <Text
                      fontSize={bodyFontSize2}
                      lineHeight={['0.9em', '0.94em']}
                      color={fontColor}
                      border="1px solid #182E57"
                      borderRadius={10}
                      padding="0.6em 0.8em"
                    >
                      {prayer.data.map((line, i) => {
                        return (
                          <Text key={i}>
                            {line}
                            <br />
                          </Text>
                        );
                      })}
                    </Text>
                  </VStack>
                );
              })}
            </Slider>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default RippleOutPraySection;
