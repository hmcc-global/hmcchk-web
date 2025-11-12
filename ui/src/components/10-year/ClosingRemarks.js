import {
  Center,
  Text,
  Container,
  Fade,
  Box,
  Image,
  VStack,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { tenYearTheme, getTypography } from './theme';

const ClosingRemarks = () => {
  return (
    <Box>
      <VStack gap="4rem" mt="3rem" mb="5rem" mx="2rem" py="4rem">
        {/* Desktop and Tablet version */}
        <Flex gap="10" align="center" display={['none', 'none', 'flex']}>
          <Text textAlign={'Center'} {...getTypography('h1')}>
            Celebrating a Decade of
          </Text>
          <Flex align="center" gap="2" position="relative">
            <Image
              src={process.env.PUBLIC_URL + '/images/10-year/t.svg'}
              h="90px"
              w="auto"
              alt="T"
              transform="translateY(-10px)"
              position="absolute"
              zIndex="0"
              left="-25px"
            />
            <Text
              textAlign={'Center'}
              position="relative"
              zIndex="1"
              ml="5px"
              {...getTypography('h1')}
            >
              ransformation
            </Text>
          </Flex>
        </Flex>

        {/* Mobile version */}
        <Text
          textAlign={'Center'}
          display={['block', 'none', 'none']}
          {...getTypography('h1')}
          lineHeight="161%"
        >
          Celebrating a decade of
          <br />
          <Flex
            align="center"
            gap="2"
            position="relative"
            justify="center"
            mt="2"
          >
            <Image
              src={process.env.PUBLIC_URL + '/images/10-year/t.svg'}
              h="90px"
              w="auto"
              alt="T"
              transform="translateY(-2px)"
              position="absolute"
              zIndex="0"
              left="25px"
            />
            <Text
              textAlign={'Center'}
              position="relative"
              zIndex="1"
              ml="5px"
              {...getTypography('h1')}
              lineHeight="161%"
            >
              ransformation
            </Text>
          </Flex>
        </Text>
        {/* Desktop and Tablet version */}
        <Text
          textAlign={'Center'}
          display={['none', 'block', 'block']}
          {...getTypography('h1')}
        >
          Thank you for being a part of HMCC Hong Kong in
          <br />
          the past{' '}
          <Box as="span" position="relative" display="inline-block">
            <Image
              src={process.env.PUBLIC_URL + '/images/10-year/10.svg'}
              h="8rem"
              w="auto"
              alt="10"
              position="absolute"
              zIndex="0"
              left="15%"
              top="50%"
              transform="translate(-50%, -50%)"
            />
            <Text
              as="span"
              position="relative"
              zIndex="1"
              ml="50px"
              {...getTypography('h1')}
            >
              years
            </Text>
          </Box>
        </Text>

        {/* Mobile version */}
        <Text
          textAlign={'Center'}
          display={['block', 'none', 'none']}
          {...getTypography('h2')}
          lineHeight="161%"
        >
          Thank you for being a<br />
          part of HMCC Hongkong
          <br />
          in the past{' '}
          <Box as="span" position="relative" display="inline-block">
            <Image
              src={process.env.PUBLIC_URL + '/images/10-year/10.svg'}
              h="8rem"
              w="auto"
              alt="10"
              position="absolute"
              zIndex="0"
              left="22%"
              top="40%"
              transform="translate(-50%, -50%)"
            />
            <Text
              as="span"
              position="relative"
              zIndex="1"
              ml="50px"
              {...getTypography('h1')}
              lineHeight="161%"
            >
              years
            </Text>
          </Box>
        </Text>
      </VStack>
    </Box>
  );
};

export default ClosingRemarks;
