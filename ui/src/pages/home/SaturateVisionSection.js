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

export const saturateText = {
  title: 'SATURATE VISION',
  text: 'From January 2024 through December 2029, our church will journey together to fulfill God\'s calling for us through the Saturate Vision in Hong Kong.',
};
const buttonText = 'Learn More';

const SaturateVisionSection = () => {
  return (
    <Flex
      w="full"
      bgImage={`url(${
        process.env.PUBLIC_URL + '/images/home/saturate-bg.png'
      })`}
      bgSize="cover"
      bgPosition="center"
    >
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
            <Image
              src={process.env.PUBLIC_URL + '/images/home/saturate-logo.png'}
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
              fontSize={['1.875em', '4xl']}
              color="#0628A3"
              alignSelf={['baseline']}
              fontWeight="bold"
            >
              {saturateText.title}
            </Heading>
            <Text fontSize={['0.9em', '1.2em']} textAlign={['justify']}>
              {saturateText.text}
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
              <Link to={{ pathname: '/saturate' }} id="homepage-saturate">
                {buttonText}
              </Link>
            </Button>
          </VStack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default SaturateVisionSection;
