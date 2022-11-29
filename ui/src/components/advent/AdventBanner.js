import {
  Flex,
  Center,
  Button,
  Link,
  Box,
  HStack,
  Text,
} from '@chakra-ui/react';

const AdventBanner = () => {
  return (
    <Flex
      w="100vw"
      bgColor="#FFFFFF95"
      h="12vh"
      p={2}
      bgPosition="center"
      bgSize="cover"
      justify="center"
      bgImage={`url('${process.env.PUBLIC_URL}/images/advent/banner.png')`}
      display="flex"
    >
      <Flex w="100vw" justify="space-around" h="100%">
        <Center>
          <Link href="/advent" _hover={{}}>
            <HStack h="100%" spacing="1">
              <Box h="100%">
                <Text
                  position="relative"
                  fontSize={['xs', 'xl']}
                  as="i"
                  background="white"
                  textFillColor="transparent"
                  backgroundClip="text"
                  fontWeight={700}
                >
                  CLICK HERE TO CHECK OUT <b>ADVENT 2022</b>
                </Text>
                <Box w="100%" h={['1px', '2px']} background="white" />
              </Box>
            </HStack>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
};

export default AdventBanner;
