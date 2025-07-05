
import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import BeliefsAccordion from './BeliefsAccordion';

const Beliefs = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const textAlign = isMobile ? 'center' : 'left';
  return (
    <Container maxW="container.xl" py={{ base: '4rem', lg: '5rem' }}>
      <Flex h="100vh">
        {/* Left Side - Navbar */}
        {!isMobile && (
          <Box 
            w="350px" 
            bg="gray.100" 
            p={4}
            borderRight="1px solid"
            borderColor="gray.200"
          >
            <Text>Vision & Mission Menu</Text>
          </Box>
        )}
        
        {/* Right Side - Main Content */}
        <Box flex={1} p={4} overflow="auto">
          <VStack spacing={6} align="stretch">
            <Box
              textAlign={"left"}
            >
              <Box
                borderRadius="1.875em"
                bgColor="white"
                px="1em"
                display={"inline-block"}
              >
                <Text
                  color="#0C0C20"
                  fontSize="0.8rem"
                  fontFamily="Manrope"
                  fontWeight="700"
                  textTransform="uppercase"
                  lineHeight="1rem"
                  letterSpacing="2px"
                  wordBreak="break-word"
                  py="0.5em"
                >
                  ABOUT US
                </Text>
              </Box>
            </Box>
            <Box
              textAlign={textAlign}
            >

            <Text
                display="inline"
                fontWeight="400"
                lineHeight="1.6rem"
                wordBreak="break-word"
                fontSize="2rem"
                // color="#4A6EEB"
                fontFamily="DMSerifDisplay_Italic, serif"
              >
                  Beliefs
              </Text>
            </Box>
            <BeliefsAccordion/>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Beliefs;
