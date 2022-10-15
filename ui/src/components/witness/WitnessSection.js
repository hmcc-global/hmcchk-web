import React from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import '@fontsource/dm-sans';

const WitnessSection = () => {
  return (
    <Container maxW="100vw" justifyContent="center" display="flex" p={0}>
      <Box
        bgImage={[
          `url('${process.env.PUBLIC_URL}/images/witness/ad-home-mobile.png')`,
          `url('${process.env.PUBLIC_URL}/images/witness/ad-home-desktop.png')`,
        ]}
        bgSize="cover"
        justifyContent="center"
        py={[20, 120]}
      >
        <Stack
          direction={['column', 'row']}
          justifyContent={['center', 'space-evenly']}
          alignItems="center"
          p={[5, 0]}
        >
          <VStack
            w={['100%', '45%']}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={process.env.PUBLIC_URL + '/images/witness/title.png'}
              w="80%"
            />
            <Text
              textStyle="dm_sans_bold"
              textColor="white"
              fontWeight={500}
              fontSize="24px"
              pb={4}
              pt={4}
              // fontFamily="DM Sans"
            >
              HMCC 2022 - 2023
            </Text>
            <Box pt={'5'}>
              <Text
                textStyle={'dm_sans'}
                color="white"
                fontSize={['md']}
                textAlign="center"
              >
                The theme for HMCC 2022-2023 is Witness. As a church, it is our
                hope that our daily and personal witness of Jesus will translate
                into our passionate witness for Jesus to others around us.
                <br />
                <br />
                Throughout this year, we want to invite you to share your
                personal witness of Jesus here and witness God’s work in our
                church!
              </Text>
            </Box>
          </VStack>
          <VStack pt={['10', '30']} w={['100%', '40%']}>
            <Text
              textStyle={'dm_sans_bold'}
              color="white"
              fontSize={['xl', '2xl']}
              textAlign="center"
            >
              HOW ARE YOU WITNESSING GOD?
            </Text>
            <Button
              py={[5, 7]}
              fontSize={[17, 24]}
              w="100%"
              bg="#8D2C72"
              color="white"
              _hover={{ bg: 'white', color: '#8D2C72' }}
              as={Link}
              href="/witness/home"
            >
              CHECK OUT OUR TESTIMONIES HERE
            </Button>
          </VStack>
        </Stack>
      </Box>
    </Container>
  );
};

export default WitnessSection;
