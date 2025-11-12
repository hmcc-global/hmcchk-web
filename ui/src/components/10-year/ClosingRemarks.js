import { Text, Box, Image, VStack, Flex } from '@chakra-ui/react';
import { tenYearTheme, getTypography } from './theme';

const ClosingRemarks = () => {
  return (
    <Box w="100%">
      <VStack
        gap="4rem"
        mt="4rem"
        mb={{ base: '3rem', md: '10rem' }}
        mx="2rem"
        py="4rem"
      >
        {/* Desktop and Tablet version */}
        <Flex
          gap="10"
          align="center"
          display={{ base: 'none', md: 'none', lg: 'flex' }}
        >
          <Text textAlign={'Center'} {...getTypography('h1')} display="inline">
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
          display={{ base: 'block', md: 'block', lg: 'none' }}
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
              left={{ base: '1rem', sm: '2.7rem', md: '3rem', lg: '25px' }}
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
          display={{ base: 'none', md: 'none', lg: 'block' }}
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
          display={{ base: 'block', md: 'block', lg: 'none' }}
          {...getTypography('h1')}
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
