import {
  Flex,
  Center,
  VStack,
  Image,
  Box,
  Heading,
  Grid,
  GridItem,
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
          <Grid templateColumns={['none', 'repeat(2, 1fr)']} gap={1}>
            {blurb.directors.length > 0 &&
              blurb.directors.map((content, i) => (
                <GridItem>
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
                          process.env.PUBLIC_URL +
                          'images/about/' +
                          content.photo
                        }
                        w={['80%', '100%', '100%']}
                        objectFit="cover"
                        margin="auto"
                        borderRadius="7px"
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
                </GridItem>
              ))}
          </Grid>
        </Flex>
      </VStack>
      <Box></Box>
    </Flex>
  );
};

export default StaffSection;
