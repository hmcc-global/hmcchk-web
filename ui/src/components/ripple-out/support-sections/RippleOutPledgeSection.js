import { Flex, Text, VStack } from '@chakra-ui/react';
import { subHeaderFontSize, bodyFontSize } from '../RippleOutTextStyle';

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
            PLEDGES FOR THE CAMPAIGN
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
        </VStack>
      </Flex>
    </>
  );
};

export default RippleOutPledgeSection;
