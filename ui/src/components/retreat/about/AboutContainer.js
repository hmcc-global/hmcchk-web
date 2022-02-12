import {
  Flex,
  Text,
  Box,
  HStack,
  VStack,
  Container,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import retreatTheme from '../retreatTheme';
import '@fontsource/sora';
import '@fontsource/inter';

const AboutContainer = () => {
  const buttonSize = useBreakpointValue(['sm', 'md']);

  return (
    <>
      <Flex
        w="full"
        h="100vh"
        justify="center"
        bgImage="linear-gradient(90deg, #A9E0E3 33%, rgba(0, 0, 0, 0) 33%), linear-gradient(90deg, #FFE9AF 66%, #F2BBA8 66%)"
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
              width={['95%', '70%']}
              height={['20%']}
              p={[7]}
            >
              <Text
                textStyle="sora"
                fontSize={['lg', '2xl', '4xl']}
                textAlign="center"
              >
                <b>ABOUT THE RETREAT:</b>
              </Text>
              <Text
                textStyle="sora"
                fontSize={['md', 'xl', '3xl']}
                textAlign="center"
              >
                <b> With Everything - Congregational Retreat 2022</b>
              </Text>
            </Box>
            <HStack spacing={[2, 5]}>
              <Button
                borderRadius="20px"
                bg="#FFC93E"
                color="white"
                justify="center"
                boxShadow="lg"
                textStyle="sora"
                size={buttonSize}
              >
                Theme
              </Button>
              <Button
                borderRadius="20px"
                bg="#EE794E"
                color="white"
                justify="center"
                boxShadow="lg"
                textStyle="sora"
                size={buttonSize}
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
                size={buttonSize}
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
