import React from 'react';
import { Box, Flex, Link, Button, Text } from '@chakra-ui/react';

const EasterNavbar = () => {
  return (
      <Flex justifyContent="center" alignItems="center" position="fixed" height="50px" w="100%" backgroundColor="white" zIndex="1000">
        <Flex justifyContent="space-between" alignItems="center" height="50px" w={["100%", "50%"]}>
          <Button as={Link} href="/" variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>Theme</Text>
          </Button>
          <Button as={Link} href="/" variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>Story</Text>
          </Button>
          <Button as={Link} href="/" variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>Events</Text>
          </Button>
          <Button as={Link} href="/" variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>More</Text>
          </Button>
        </Flex>
      </Flex>
  );
};

export default EasterNavbar;
