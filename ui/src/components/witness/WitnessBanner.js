import {
  Flex,
  Center,
  Button,
  Link,
  Box,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

const WitnessBanner = () => {
  return (
    <Flex
      w="100vw"
      bgColor="#FFFFFF95"
      h={["50px","12vh"]}
      p={2}
      bgPosition="center"
      bgSize="cover"
      justify="center"
      display="flex"
    >
      <Flex w="100vw" justify="space-around">
        <Center>
          <Link href="/witness/home" _hover={{}}>
            <HStack h="100%" spacing="1">
              <Box>
                <Text
                  position="relative"
                  fontSize={['10px', 'xl']}
                  as="i"
                  background="linear-gradient(90deg, #FF8933, #AF4F83)"
                  textFillColor="transparent"
                  backgroundClip="text"
                  fontWeight={600}
                >
                  CLICK HERE TO WITNESS GOD'S WORK IN OUR CHURCH!
                </Text>
                <Box
                  w="100%"
                  h={['1px', '2px']}
                  bgGradient="linear-gradient(90deg, #FF8933, #AF4F83)"
                />
              </Box>
              {/* <Button
                size={['xx-small', 'xs']}
                padding={1.5}
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs']}
                marginRight={'0.4em'}
                backgroundColor={'transparent'}
                borderColor="green"
                textColor="blue"
                borderWidth={2}
                borderRadius={'0.8em'}
                display="flex"
                _hover={{
                  // backgroundColor: currMode.hoverbgColor,
                  // textColor: currMode.hovertextColor,
                }}
              >
                WATCH NOW
              </Button> */}
              {/* <Box
                as="span"
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs', 'small']}
                fontWeight="extrabold"
              >
                {currMode.content1}
              </Box>
              <Box
                as="span"
                textStyle="FogtwoNo5"
                fontSize={['sm', 'medium', 'lg']}
                fontWeight="extrabold"
                whiteSpace="pre"
                paddingTop={['0em', '0.15em', '0.15em']}
                display={isDisplay ? 'flex' : 'none'}
              >
                {currMode.content2}
              </Box>
              <Box
                as="span"
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs', 'small']}
                fontWeight="extrabold"
                whiteSpace="pre"
              >
                {currMode.content3}
              </Box>
              <Box
                as="span"
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs', 'small']}
                fontWeight="extrabold"
                whiteSpace="pre"
                textDecoration={'underline'}
                textUnderlineOffset={'0.2em'}
              >
                <u>{currMode.content4}</u>
              </Box> */}
            </HStack>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
};

export default WitnessBanner;
