import React from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import '@fontsource/dm-sans';

const WitnessSection = () => {
  return (
    <Container maxW="100vw" justifyContent="center" display="flex" p={0}>
      <Box
        w="100vw"
        bgImage={[
          `url('${process.env.PUBLIC_URL}/images/easter-2023/easter.png')`,
        ]}
        bgSize="cover"
        justifyContent="center"
        py={[20, 120]}
      >
        <VStack
          w={['85%', '50%']}
          justifyContent="center"
          alignItems="center"
          mx="auto"
        >
          <Image
            src={process.env.PUBLIC_URL + '/images/easter-2023/title.png'}
            w="20%"
          />
          <Image
            src={process.env.PUBLIC_URL + '/images/easter-2023/passion.png'}
            w="100%"
          />
          <Box py={'5'}>
            <Text
              textStyle={'dm_sans'}
              color="white"
              fontSize={['md']}
              textAlign="center"
              textShadow="0px 0px 14px #000000"
            >
              This Passion week, we want to simply remember and commemorate
              Jesus’ passion that He showed through his sacrifice for us by
              dying on the cross, so that we can passionately live our lives for
              Him.
              <br />
              <br />
              It’s easy to be comfortable and complacent as we go day to day,
              but as Christ followers, as we have personally witnessed His
              passionate love for us, we want to be passionate witnesses of His
              Gospel to others around us. 
            </Text>
          </Box>
          <Button
            py={[8, 7]}
            fontSize={'md'}
            w={['100%', '70%']}
            bg="#EA2169"
            color="white"
            _hover={{ bg: 'white', color: '#EA2169' }}
            as={Link}
            href="/easter"
            whiteSpace="pre-wrap"
            textAlign="center"
          >
            Check out the page to pray for, learn, and share about this Passion
            Week!
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default WitnessSection;
