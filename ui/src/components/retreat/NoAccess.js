import retreatTheme from './retreatTheme';
import '@fontsource/sora';
import '@fontsource/inter';
import {
  Box,
  Center,
  Container,
  Text,
  Image,
  Link,
  HStack,
} from '@chakra-ui/react';
import { HiOutlineKey } from 'react-icons/hi';

const NoAccessRetreat = () => {
  return (
    <Box
      minH="100vh"
      w="100vw"
      bgImage={process.env.PUBLIC_URL + '/images/retreat/retreat.png'}
      bgSize="cover"
      bgPosition="center center"
      bgAttachment="fixed"
      justify="center"
      theme={retreatTheme}
    >
      <Container maxW={['container.lg']} minH="100vh">
        <Center mt="-10" minH="100vh" flexDirection="column">
          <Text
            textAlign="center"
            textStyle="sora"
            color="white"
            fontWeight={700}
            fontSize={['2xl', '4xl']}
          >
            WELCOME TO
          </Text>
          <Image
            w={['80vw', '30vw']}
            src={
              process.env.PUBLIC_URL +
              '/images/retreat/with-everything-text.png'
            }
          />
          <Text
            mt="-1.5rem"
            textAlign="center"
            textStyle="sora"
            color="white"
            fontWeight={700}
            fontSize={['2xl', '4xl']}
          >
            CHURCH-WIDE <br />
            CONFERENCE 2022
          </Text>
          <Center
            bg="#A9E0E3"
            borderRadius="17px"
            p={['2rem 1.2rem', '1rem 3rem']}
            flexDirection="column"
            mt="10"
          >
            <HStack
              textStyle="inter"
              textAlign="center"
              fontWeight={700}
              fontSize="md"
              mb={['3', '5']}
              alignItems="center"
              spacing={['1', '2']}
            >
              <HiOutlineKey size={24} mt="0.5rem" />
              <Text fontSize={['sm', 'md']}>
                Login with your HMCC Account to access
              </Text>
            </HStack>
            <Link
              borderRadius="20px"
              bg="#FFE9AF"
              boxShadow="xl"
              textStyle="sora"
              textAlign="center"
              fontWeight={700}
              fontSize={['xl', '2xl']}
              p="0.3rem 3rem"
              href="/login"
            >
              Login here
            </Link>
          </Center>
        </Center>
      </Container>
    </Box>
  );
};

export default NoAccessRetreat;
