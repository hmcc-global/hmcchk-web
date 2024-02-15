import React from 'react';
import { Box, Flex, Link, Button } from '@chakra-ui/react';

const EasterNavbar = () => {
  return (
    <Box bg="gray.100" p={4}>
      <Flex alignItems="center">
        <Button as={Link} href="/" variant="link">
          Theme
        </Button>
        <Button as={Link} href="/" variant="link">
          Story
        </Button>
        <Button as={Link} href="/" variant="link">
          Events
        </Button>
        <Button as={Link} href="/" variant="link">
          More
        </Button>
      </Flex>
    </Box>
  );
};

export default EasterNavbar;
