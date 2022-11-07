import {
  Flex,
  Center,
  Button,
  Link,
  Box,
  HStack,
  Text,
} from '@chakra-ui/react';

const MissionsMonthBanner = () => {
  return (
    <Flex
      w="100vw"
      bgColor="#FFFFFF95"
      h="12vh"
      p={2}
      bgPosition="center"
      bgSize="cover"
      justify="center"
      display="flex"
    >
      <Flex w="100vw" justify="space-around">
        <Center>
          <Link href="/missions-month" _hover={{}}>
            <HStack h="100%" spacing="1">
              <Box>
                <Text
                  position="relative"
                  fontSize={['xs', 'xl']}
                  as="i"
                  background="linear-gradient(90deg, rgba(0,50,141,1) 20%, rgba(235,122,80,1) 85%);"
                  textFillColor="transparent"
                  backgroundClip="text"
                  fontWeight={600}
                >
                  CHECK OUT <b>MISSIONS MONTH 2022: NO OTHER NAME</b>
                </Text>
                <Box
                  w="100%"
                  h={['1px', '2px']}
                  bgGradient="linear-gradient(90deg, rgba(0,50,141,1) 20%, rgba(235,122,80,1) 85%);"
                />
              </Box>
            </HStack>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
};

export default MissionsMonthBanner;
