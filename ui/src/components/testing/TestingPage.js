import {
    Box,
    Container,
    VStack,
    Text,
    Button,
    HStack,
    Image,
    Link,
  } from '@chakra-ui/react';
  
  const TestingPage = () => {
  
    return (
      <Box bgColor="#F6FAFF">
        <Container
          maxW="container.xl"
          paddingTop={5}
          paddingBottom={{ base: '4rem', lg: '5rem' }}
          fontFamily="DMSerifDisplay_Italic"
        >
          <Box
            max-width="100%"
            display="flex"
            flexDir={'column'}
            alignItems={'center'}
            gap={{ base: '1.75rem', md: '2.5rem', lg: '4rem' }}
          >
            <VStack
              maxWidth={{ base: '95%', lg: '100%' }}
              spacing={{ base: '1rem', lg: '1.5rem' }}
            >
              <Box mb="5" alignSelf="flex-start">
                <Text textStyle={'heading.1'}
                >
                  Discover HMCC of Hong Kong
                </Text>
                <Text textStyle={'heading.4.bold'}
                >
                  New here or just wanting to discover More about our church, find out how you can experience our church community here.
                </Text>
              </Box>
            </VStack>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default TestingPage;
  