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

const colorfulString = (text, colorArray) => {
  if (colorArray.length !== text.length) {
    return <span>{text}</span>;
  }
  let result = [];
  for (let i = 0; i < text.length; i++) {
    result[i] = (
      <span key={i} style={{ color: colorArray[i] }}>
        {text[i]}
      </span>
    );
  }
  return result;
};

const lg = {
  section: 'Community',
  title: 'LIFE Groups',
  text: 'There is no better way to get a taste of who we are and what we believe in then to check out one of our LIFE Groups. This is an opportunity to experience the life-changing power of Biblical community with Love, Investment, Faith, and Enjoyment.',
};
const buttonText = 'Learn More';

const LifeGroupSection = () => {
  return (
    <Flex w="full" h={['100vh', '75vh']}>
      <Container maxW="container.lg" justifyContent="center" display="flex">
        <Stack
          w="100%"
          direction={['column', 'row']}
          justify="center"
          alignItems={['left', 'center']}
          spacing={[6, null]}
        >
          <VStack
            w={['100%', '55%']}
            align={['center', 'baseline']}
            spacing={[6, 8]}
          >
            <Heading
              as="h5"
              fontSize={['0.9em', '1.5em']}
              alignSelf={['baseline']}
              color="#505050"
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
              fontSize={['2em', '4.5em']}
              color="#0628A3"
              alignSelf={['baseline']}
            >
              {lg.title}
            </Heading>
            <Text fontSize={['0.9em', '1.2em']} textAlign={['justify']}>
              {lg.text}
            </Text>
            <Button
              alignSelf={['center', 'baseline']}
              bg="rgb(0, 0, 0, 0)"
              variant="outline"
              color="#0628A3"
              borderColor="#0628A3"
              w={['85%', '38.2%']}
              _hover={{
                bg: '#0628A3',
                color: 'white',
                borderColor: 'white',
                textDecoration: 'none',
              }}
            >
              <Link to={{ pathname: '/connect', hash: '#lifegroup' }}>
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
