import { VStack, HStack, Box, Text, Button, Container } from '@chakra-ui/react';
import { retreatTheme } from '../retreatTheme';

const AboutSection = () => {
  return (
    <>
      <Container maxW={['container.xl']} justify="center">
        <VStack w="full" justify="center" spacing={6}>
          <Box
            bg="white"
            borderRadius="20px"
            marginTop="20px"
            width={['60%']}
            height={['20%']}
            p={[7]}
          >
            <Text textStyle="title" fontSize="4xl">
              <b>ABOUT THE RETREAT:</b>
            </Text>
            <Text textStyle="subtitle" fontSize="3xl">
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
            >
              Our Vision for the Retreat
            </Button>
            <Button
              borderRadius="20px"
              bg="#EE794E"
              color="white"
              justify="center"
              boxShadow="lg"
            >
              Speaker Profile
            </Button>
            <Button
              borderRadius="20px"
              bg="#0FB4BE"
              color="white"
              justify="center"
              boxShadow="lg"
            >
              Promo Video
            </Button>
          </HStack>
        </VStack>
      </Container>
    </>
  );
};

export default AboutSection;
