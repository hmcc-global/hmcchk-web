import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const lg = {
  section: 'Community',
  title: 'LIFE Groups',
  text: 'There is no better way to get a taste of who we are and what we believe in then to check out one of our LIFE Groups. This is an opportunity to experience the life-changing power of Biblical community with Love, Investment, Faith, and Enjoyment.',
};
const buttonText = 'Learn More';

const LifeGroupSection = () => {
  return (
    <Flex w="full">
      <Container
        maxW="container.lg"
        justifyContent="center"
        display="flex"
        py={[55]}
      >
        <Stack
          w="100%"
          direction={['column', 'row']}
          justify="center"
          alignItems={['left', 'center']}
          spacing={[6, null]}
          mx={[6, 0]}
        >
          <VStack
            w={['100%', '55%']}
            align={['center', 'baseline']}
            spacing={[6, 8]}
          >
            <Heading
              as="h5"
              fontSize={['1.875em', '4xl']}
              alignSelf={['baseline']}
              color="#505050"
              fontWeight="semibold"
              fontFamily="Inter"
            >
              {lg.section}
            </Heading>
            <Image
              src={process.env.PUBLIC_URL + '/images/home/lifegroup.png'}
              w={['90%']}
            />
          </VStack>
          <VStack
            w={['100%', '55%']}
            align={['center', 'baseline']}
            spacing={[6, 8]}
          >
            <Heading
              as="h1"
              fontSize={['1.875em', '6xl']}
              color="#0628A3"
              alignSelf={['baseline']}
              fontWeight="bold"
            >
              {lg.title}
            </Heading>
            <Text fontSize={['0.9em', '1.2em']} textAlign={['justify']}>
              {lg.text}
            </Text>
            <Button
              alignSelf={['start', 'baseline']}
              bg="white"
              variant="outline"
              color="#0628A3"
              borderColor="#0628A3"
              borderWidth="2px"
              w={['45%', '38.2%']}
              _hover={{
                bg: '#0628A3',
                color: 'white',
                borderColor: '#0628A3',
                textDecoration: 'none',
              }}
              fontSize="1.2em"
            >
              <Link
                to={{ pathname: '/connect', hash: '#lifegroup' }}
                id="homepage-lg"
              >
                {buttonText}
              </Link>
            </Button>
          </VStack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default LifeGroupSection;
