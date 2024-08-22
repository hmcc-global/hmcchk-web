import {
  Flex,
  Text,
  Center,
  VStack,
  Stack,
  Image,
  Box,
  Heading,
} from '@chakra-ui/react';
import React from 'react';

const StaffSection = (props) => {
  const { title, blurb } = props;
  return (
    <Flex direction="column">
      <Center padding="5">
        <Heading
          as="h2"
          fontSize={['4xl', '6xl']}
          fontFamily="DMSerifDisplay_Italic"
          fontWeight={700}
          lineHeight={1}
          textAlign="center"
          color="#0628A3"
          mb={5}
          id="staff"
        >
          {title}
        </Heading>
      </Center>
      <VStack>
        <Box
          bgColor="#EEFAFF"
          w="100%"
          minH={{ base: '40em', lg: '30em' }}
          border="2px solid #CDDCE0"
          borderRadius="7"
        >
          <Stack
            direction={{ base: 'column', lg: 'column' }}
            py={['10', '2em']}
            px={['5', '4em']}
            spacing="10"
          >
            <Box
              objectFit="cover"
              margin="auto"
              borderRadius="7"
              w={{ base: '90%', lg: '66%' }}
              minW={{ base: '90%', lg: '50%' }}
            >
              <Image
                src={process.env.PUBLIC_URL + 'images/about/kimfamily.jpeg'}
                objectFit="cover"
                margin="auto"
                borderRadius="7"
              />
            </Box>

            <Box px="1.5em">
              <Text
                color="#0628A3"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="DMSerifDisplay_Italic"
              >
                {blurb.kim.title}
              </Text>
              {blurb.kim.position &&
                blurb.kim.position.split('\n').map((item) => {
                  return (
                    <Text
                      color="black"
                      fontSize="lg"
                      fontWeight="bold"
                      fontFamily="DMSerifDisplay_Italic"
                    >
                      {item}
                      <br />
                    </Text>
                  );
                })}

              <Box fontSize="md">
                {[blurb.kim[0], blurb.kim[1], blurb.kim[2]].map((item) => {
                  return (
                    <Text color="black" paddingTop="1em">
                      {item}
                    </Text>
                  );
                })}
              </Box>
            </Box>
          </Stack>
        </Box>
      </VStack>
      <Box></Box>
    </Flex>
  );
};

export default StaffSection;
