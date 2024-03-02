import React from 'react';
import { Box, Flex, Link, Button, Text } from '@chakra-ui/react';

const EasterNavbar = () => {

  const scrollIntoView = (anchor) => () => {
    document.getElementById(anchor).scrollIntoView({ behavior: "smooth" });
  }

  return (
      <Flex justifyContent="center" alignItems="center" position="sticky" height="50px" w="100%" backgroundColor="white" zIndex="1000" top={0}>
        <Flex justifyContent="space-between" alignItems="center" height="50px" w={["100%", "50%"]} px={[5, 0]}>
          <Button onClick={scrollIntoView("easter-2024-theme")} variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>Theme</Text>
          </Button>
          <Button onClick={scrollIntoView("easter-2024-story")} variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>Story</Text>
          </Button>
          <Button onClick={scrollIntoView("easter-2024-events")} variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>Events</Text>
          </Button>
          <Button onClick={scrollIntoView("easter-2024-more")} variant="link" borderRadius={20} backgroundColor="#EFECEB" height="80%" width="100%" m={[1, 2]} color="#DD580B">
            <Text as='i'>More</Text>
          </Button>
        </Flex>
      </Flex>
  );
};

export default EasterNavbar;
