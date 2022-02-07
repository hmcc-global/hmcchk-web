import {
  Flex,
  Text,
  Box,
  HStack,
  VStack,
  Stack,
  Container,
  Button,
  Image,
} from '@chakra-ui/react';
import retreatTheme from '../retreatTheme';
import '@fontsource/sora';
import '@fontsource/inter';

const AboutContainer = () => {
  return (
    <>
      <Flex
        w="full"
        h="100vh"
        justify="center"
        bgImage="linear-gradient(90deg, #0FB4BE 33%, rgba(0, 0, 0, 0) 33%), linear-gradient(90deg, #FFDC82 66%, #F39371 66%)"
      >
        <Container
          maxW={['container.lg']}
          justify="center"
          theme={retreatTheme}
        >
          <VStack w="full" justify="center" spacing={8}>
            <Box
              bg="white"
              borderRadius="20px"
              marginTop="20px"
              width={['60%']}
              height={['20%']}
              p={[7]}
            >
              <Text textStyle="sora" fontSize="4xl">
                <b>ABOUT THE RETREAT:</b>
              </Text>
              <Text textStyle="sora" fontSize="3xl">
                <b> With Everything - Congregational Retreat 2022</b>
              </Text>
            </Box>
            <HStack spacing={5}>
              <Button
                borderRadius="20px"
                bg="#FFC93E"
                color="white"
                justify="center"
                boxShadow="lg"
                textStyle="sora"
              >
                Our Vision for the Retreat
              </Button>
              <Button
                borderRadius="20px"
                bg="#EE794E"
                color="white"
                justify="center"
                boxShadow="lg"
                textStyle="sora"
              >
                Speaker Profile
              </Button>
              <Button
                borderRadius="20px"
                bg="#0FB4BE"
                color="white"
                justify="center"
                boxShadow="lg"
                textStyle="sora"
              >
                Promo Video
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default AboutContainer;
