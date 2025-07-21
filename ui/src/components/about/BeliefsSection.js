
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
        <Box flex={1} p={4} overflow="auto">
          <VStack spacing={6} align="stretch">
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
