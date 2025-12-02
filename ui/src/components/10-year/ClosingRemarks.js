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
      <VStack gap={tenYearTheme.spacing.section} mt='3rem'>
        <Flex gap="10" align="center">
          <Text
            textAlign={'Center'}
            {...getTypography('h1')}
          >
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
        <Text
          textAlign={'Center'}
          {...getTypography('h1')}
        >
          Thank you for being a part of HMCC Hong Kong in<br />
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
      </VStack>

      <Image
        display={['none', 'none', 'block']}
        src={process.env.PUBLIC_URL + '/images/10-year/ClosingRemarks/10.svg'}
        h="2em"
        opacity="100"
        width="56.281px"
        height="65.116px"
        flexShrink={0}
      />
      <Box shadow="0 0 30px rgba(139,192,236,0.53)" />
    </Box>
  );
};

export default ClosingRemarks;
