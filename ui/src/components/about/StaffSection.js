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
          fontFamily="DMSerifDisplay"
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
      <VStack mb={[5, 10]}>
        <Box w="full">
          <Heading
            as="h3"
            fontSize={['3xl', '4xl']}
            fontFamily="DMSerifDisplay_Italic"
            fontWeight={700}
            lineHeight={1}
            textAlign="left"
            color="#0628A3"
            mb={3}
            id="staff"
          >
            Pastoral Staff
          </Heading>
        </Box>
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
                {blurb.pastoral.kim.title}
              </Text>
              {blurb.pastoral.kim.position &&
                blurb.pastoral.kim.position.split('\n').map((item) => {
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
                {[
                  blurb.pastoral.kim[0],
                  blurb.pastoral.kim[1],
                  blurb.pastoral.kim[2],
                ].map((item) => {
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
      <VStack>
        <Box w="full" mb={[5, 10]}>
          <Heading
            as="h3"
            fontSize={['3xl', '4xl']}
            fontFamily="DMSerifDisplay_Italic"
            fontWeight={700}
            lineHeight={1}
            textAlign="left"
            color="#0628A3"
            id="staff"
          >
            Ministry Directors
          </Heading>
        </Box>
        <Flex flexDir={['column', 'row']}>
          {blurb.directors.length > 0 &&
            blurb.directors.map((content, i) => (
              <Box
                key={'director' + i}
                fontFamily="Manrope"
                textAlign="center"
                w={['90%', '100%', '100%']}
                mb="3"
                mx="auto"
              >
                <Box px={[5, 9]} mb="3">
                  <Image
                    src={
                      process.env.PUBLIC_URL + 'images/about/' + content.photo
                    }
                    w={['80%', '100%', '100%']}
                    objectFit="cover"
                    margin="auto"
                    borderRadius="7"
                  />
                </Box>

                <Box
                  fontSize={['md', 'md', '2xl']}
                  fontWeight="700"
                  color="#0628A3"
                >
                  {content.name}
                </Box>
                {content.title.length > 0 &&
                  content.title.map((title, i) => (
                    <Box
                      key={'directortitle' + i}
                      fontSize={['xs', 'xs', 'lg']}
                      fontWeight="700"
                    >
                      {title}
                    </Box>
                  ))}
              </Box>
            ))}
        </Flex>
      </VStack>
      <Box></Box>
    </Flex>
  );
};

export default StaffSection;
