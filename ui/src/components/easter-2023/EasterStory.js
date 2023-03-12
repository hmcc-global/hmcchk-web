import { Text, VStack, Box, Heading } from '@chakra-ui/react';

import React from 'react';

const EasterStory = () => {
  return (
    <VStack
      w="100%"
      spacing="3vw"
      py="3vw"
      paddingLeft="10%"
      paddingRight="10%"
      paddingBottom="0"
    >
      <Box bgPosition="center" bgSize="cover">
        <VStack px="3" py="6">
          <Text
            fontFamily={'concrete_demo'}
            textColor="#FF3E02"
            fontWeight="1000"
            lineHeight="110%"
            fontSize={['2.1em', '3em']}
            marginBottom="15px"
            textAlign="center"
            paddingTop={['10', '4']}
          >
            EASTER
          </Text>
          <Box>
            <Heading
              as="h4"
              fontSize={{ base: 18, sm: 20, md: 25, lg: 30 }}
              align="center"
              color="#7B0D0D"
              fontWeight="bold"
              py={{ base: 1, sm: 2, md: 2, lg: 2 }}
            >
              <Text textStyle={'dm_sans'} fontSize={['14px', '18px']}>
                Easter is the time where Christians all over the world gather to
                celebrate the
                <Text
                  fontSize={['14px', '18px']}
                  textStyle={'dm_sans'}
                  paddingLeft="3"
                  paddingBottom="5"
                  display="inline-block"
                  bgRepeat="no-repeat"
                  bgSize="100%"
                  bgImage={` 
                url('${process.env.PUBLIC_URL}/images/easter-2023/jesus-christ.png')`}
                >
                  resurrection of Jesus Christ.
                </Text>
              </Text>
            </Heading>
          </Box>
          <Box>
            <Heading
              as="h4"
              fontSize={{ base: 18, sm: 20, md: 25, lg: 30 }}
              align="center"
              color="#7B0D0D"
              fontWeight="bold"
              py={{ base: 1, sm: 2, md: 2, lg: 2 }}
            >
              <Text textStyle={'dm_sans'} fontSize={['14px', '18px']}>
                Because of His passionate love for us, demonstrated through his
                death and resurrection on the cross, we can have
                <Text
                  textStyle={'dm_sans'}
                  fontSize={['14px', '18px']}
                  paddingLeft="3"
                  paddingBottom="5"
                  display="inline-block"
                  bgRepeat="no-repeat"
                  bgSize="100%"
                  bgImage={` 
                url('${process.env.PUBLIC_URL}/images/easter-2023/greater-freedom.png')`}
                >
                  love, joy, and greater freedom in our lives.{' '}
                </Text>
              </Text>
            </Heading>
          </Box>

          <Heading
            as="h4"
            fontSize={{ base: 18, sm: 20, md: 25, lg: 30 }}
            align="center"
            color="#7B0D0D"
            fontWeight="bold"
            py={{ base: 1, sm: 2, md: 2, lg: 2 }}
            >
            <Text textStyle={'dm_sans'} fontSize={['14px', '18px']}>
              We no longer have to be held down by the world, but we can look to
              Jesus
              <Text
                textStyle={'dm_sans'}
                fontSize={['14px', '18px']}
                paddingLeft="3"
                paddingBottom="5"
                display="inline-block"
                bgRepeat="no-repeat"
                bgSize="100%"
                bgImage={` 
                url('${process.env.PUBLIC_URL}/images/easter-2023/our-ultimate-hope.png')`}
              >
                who is our ultimate hope.{' '}
              </Text>
            </Text>
          </Heading>
        </VStack>
      </Box>
    </VStack>
  );
};

export default EasterStory;
