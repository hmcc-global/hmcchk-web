
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
    <Flex h="100vh" w={"100%"}>
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
              fontSize="2.125rem"
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
  );
};

export default Beliefs;
