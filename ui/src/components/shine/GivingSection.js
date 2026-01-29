import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  HStack,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import GivingCard from '../giving/GivingCard.js';

const GivingSection = (props) => {
  return (
    <Container maxW="container.lg">
      <Button
        bg="#EBAC09"
        w="50%"
        px={6}
        py={3}
        borderRadius="md"
        color="#FFFAED"
        fontFamily="Manrope"
        fontWeight="extrabold"
        fontSize="xl"
        display="inline-block"
      >
        <center>SPONSOR/GIVE</center>
      </Button>
      <Button
        bg="#EBAC09"
        w="50%"
        px={6}
        py={3}
        borderRadius="md"
        color="#FFFAED"
        fontFamily="Manrope"
        fontWeight="extrabold"
        fontSize="xl"
        display="inline-block"
      >
        <center>Prayer Requests</center>
      </Button>
      <Box
        w={['100%', '100%', '100%']}
        h="20%"
        borderRadius="lg"
        fontFamily="Manrope"
      >
        <Heading
          as="h2"
          size="lg"
          paddingBottom="1vw"
          color="#000000"
          fontFamily="Manrope"
          letterSpacing={'0.12em'}
        >
          <Center>WAYS TO SPONSOR/GIVE:</Center>
        </Heading>
      </Box>

      <HStack>
        <Center fontFamily="Manrope">
          <Flex h={['100%', '100%', '11em']} minW="100%">
            <Spacer />
            <GivingCard
              text="FPS"
              imageLink={process.env.PUBLIC_URL + '/images/giving/FPS.png'}
            />
            <Spacer />
            <GivingCard
              text="Online Giving"
              imageLink={process.env.PUBLIC_URL + '/images/giving/Online.png'}
            />
            <Spacer />
            <GivingCard
              text="Bank Transfer"
              imageLink={process.env.PUBLIC_URL + '/images/giving/Transfer.png'}
            />
            <GivingCard
              text="Cash"
              imageLink={process.env.PUBLIC_URL + '/images/giving/Cash.png'}
            />
            <Spacer />
            <GivingCard
              text="Cheque"
              imageLink={process.env.PUBLIC_URL + '/images/giving/Cheque.png'}
            />
          </Flex>
        </Center>
      </HStack>
      <Box paddingTop="2vh">
        <Text>
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team.
        </Text>
      </Box>
      <Box paddingTop="2vh">
        <Text>
          If you have any questions, please do not hesitate to contact us:&nbsp;
        </Text>
        <Text fontWeight="bold">hk@hmccglobal.org</Text>
      </Box>
    </Container>
  );
};
export default GivingSection;
