import React from 'react';
import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  Flex,
  Divider,
} from '@chakra-ui/react';

const AdventContainer = () => {
  return (
    <>
      <Container maxW="container.lg" m={0} p={0}>
        <Box w="100%" h="30em">
          <Text>Welcome to advent :D </Text>
        </Box>
      </Container>
    </>
  );
};

export default AdventContainer;
