import { Box, Container, Flex, Text, Center, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const RippleOutSection = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/ripple-out');
  };

  return (
    <>
      {/* Hero section - desktop */}
      <Box
        w="full"
        h="100vh"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['none', 'block']}
      >
        <Container maxW="container.xl" h="100%">
          <Center h="full" flexDir="column">
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['4em', '14em']}
                lineHeight={['1em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text textStyle="darker_grotesque" fontSize={['3em', '12em']}>
                CAMPAIGN
              </Text>
            </Flex>
            <Button
              variant="outline"
              onClick={handleClick}
              fontSize="xl"
              bgColor="#ffffff"
              fontWeight="bold"
              borderColor="#182E57"
              color="#182E57"
              alignSelf="flex-start"
              px="2em"
            >
              LEARN MORE
            </Button>
          </Center>
        </Container>
      </Box>
      {/* Hero section - mobile */}
      <Box
        w="full"
        h="36vh"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero-mobile.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['block', 'none']}
      >
        <Container maxW={['container.xl']} h="100%">
          <Center h="full" flexDir="column" px="8%">
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['3.5em', '14em']}
                lineHeight={['0.25em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text textStyle="darker_grotesque" fontSize={['2.75em', '12em']}>
                CAMPAIGN
              </Text>
            </Flex>
            <Button
              variant="outline"
              onClick={handleClick}
              fontSize="lg"
              bgColor="#ffffff"
              fontWeight="bold"
              borderColor="#182E57"
              alignSelf="flex-start"
              color="#182E57"
              mt="1em"
            >
              LEARN MORE
            </Button>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default RippleOutSection;
