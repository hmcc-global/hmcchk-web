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

const ClosingRemarks = () => {
  return (
    <Box>
      <VStack gap="10">
        <Flex gap="10" align="center">
          <Text
            color="#FFFFFF"
            textAlign={'Center'}
            fontFamily="Abhaya Libre"
            fontSize="42px"
            fontWeight="800"
            lineHeight="120%"
          >
            Celebrating a Decade of
          </Text>
          <Text
            color="#FFFFFF"
            textAlign={'Center'}
            fontFamily="Abhaya Libre"
            fontSize="42px"
            fontWeight="800"
            lineHeight="120%"
          >
            ransformation
          </Text>
        </Flex>
        <Text
          color="#FFFFFF"
          textAlign={'Center'}
          fontFamily="Abhaya Libre"
          fontSize="42px"
          fontWeight="800"
          lineHeight="120%"
        >
          Thank you for being a part of HMCC Hong Kong in the past years
        </Text>
      </VStack>

      <Text
        color="#95CFFF"
        textAlign={'Center'}
        fontFamily="Qindom"
        fontSize="98.152px"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="normal"
        letterSpacing="12.807px"
      >
        t
      </Text>
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
