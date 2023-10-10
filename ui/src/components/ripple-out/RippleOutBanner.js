import { Flex, Center, Link, Box, HStack, Text } from '@chakra-ui/react';

const RippleOutBanner = () => {
  return (
    <Flex
      w="100vw"
      bgColor="#FFFFFF95"
      h={['10vh', '12vh']}
      p={2}
      bgPosition="center"
      bgSize="cover"
      justify="center"
      display="flex"
    >
      <Flex w="100vw" justify="space-around">
        <Center>
          <Link href="/ripple-out" _hover={{}}>
            <HStack h="100%" spacing="1">
              <Box>
                <Text
                  position="relative"
                  fontSize={['0.65em', 'xl']}
                  as="i"
                  color="#182E57"
                  fontWeight={600}
                >
                  CLICK HERE TO LEARN MORE ABOUT THE RIPPLE OUT CAMPAIGN!
                </Text>
              </Box>
            </HStack>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
};

export default RippleOutBanner;
