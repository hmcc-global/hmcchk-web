import { Flex, Link, Text, VStack } from '@chakra-ui/react';
import {
  subHeaderFontSize,
  bodyFontSize,
  fontColor,
} from '../RippleOutTextStyle';

const RippleOutPledgeSection = ({ pledgeData }) => {
  const data = pledgeData.content;
  return (
    <>
      <Flex>
        <VStack spacing={8} display="flex" alignItems="flex-start">
          <Text
            fontSize={subHeaderFontSize}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
          >
            PLEDGE TO THE CAMPAIGN
          </Text>
          {data.map((text, i) => {
            return (
              <VStack key={i} display="flex" alignItems="flex-start">
                <Text
                  fontSize={subHeaderFontSize}
                  textStyle="darker_grotesque_black"
                  lineHeight="0.9em"
                >
                  {text.title}
                </Text>
                <Text fontSize={bodyFontSize}>{text.data}</Text>
              </VStack>
            );
          })}

          <Text fontSize={bodyFontSize}>
            Pledge your support to the Ripple Out Campaign by filling out this
            form
          </Text>
          <Link
            fontSize={bodyFontSize}
            color={fontColor}
            textStyle="darker_grotesque_black"
            lineHeight="0.9em"
            variant="outline"
            fontWeight={700}
            border="1px solid #000000"
            borderRadius={10}
            padding="0.5em"
            href="https://bit.ly/ripple-pledge"
            style={{
              textDecoration: 'none',
            }}
            _hover={{ background: '#E1EAF0' }}
            isExternal
          >
            SUBMIT YOUR PLEDGE
          </Link>
        </VStack>
      </Flex>
    </>
  );
};

export default RippleOutPledgeSection;
