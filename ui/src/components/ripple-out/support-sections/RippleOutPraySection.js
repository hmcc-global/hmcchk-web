import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import {
  fontColor,
  bodyFontSize2,
  subHeaderFontSize,
} from '../RippleOutTextStyle';

const SliderDots = (props) => {
  const { slider, setSlider, length } = props;
  const dotList = [];
  for (let i = 0; i < length; i++) {
    dotList.push(
      <Box
        border={slider === i ? '8px solid #2A3A58' : '8px solid #B6C1D7'}
        borderRadius="30px"
        onClick={() => setSlider(i)}
        cursor="pointer"
      />
    );
  }
  return (
    <>
      <HStack w="100%" display="flex" justifyContent="center">
        {dotList}
      </HStack>
    </>
  );
};

const RippleOutPraySection = ({ prayerData }) => {
  const data = prayerData.content;
  const [slider, setSlider] = useState(0);
  return (
    <>
      <Flex>
        <VStack spacing={8} display="flex" alignItems="flex-start">
          <Text
            fontSize={['1.4em', '2.4em']}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
          >
            PRAY FOR THE CAMPAIGN
          </Text>

          <VStack w="100%" display="flex" alignItems="flex-start" spacing={6}>
            <Text
              fontSize={subHeaderFontSize}
              textStyle="darker_grotesque_black"
              lineHeight="0.9em"
            >
              {data[slider].title}
            </Text>
            <Text
              fontSize={bodyFontSize2}
              lineHeight="0.9em"
              color={fontColor}
              border="1px solid #182E57"
              borderRadius={10}
              padding="0.6em 0.8em"
            >
              {data[slider].data.map((line, i) => {
                return (
                  <Text key={i}>
                    {line}
                    <br />
                  </Text>
                );
              })}
            </Text>
          </VStack>

          <SliderDots
            slider={slider}
            setSlider={setSlider}
            length={data.length}
          />
        </VStack>
      </Flex>
    </>
  );
};

export default RippleOutPraySection;
