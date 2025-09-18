import { Flex, Box, Text } from '@chakra-ui/react';

import { tenYearTheme } from './theme';

const Testimony = () => {
  return (
    <Flex direction="column" {...tenYearTheme.components.fullPageSection}>
      <Text {...tenYearTheme.typography.h1}>Years The Memories</Text>
      <iframe
        src="https://padlet.com/embed/8z5rbl41cl1ji4ax"
        width={['100%', '80%']}
        height="600"
        frameborder="0"
        allowfullscreen
        style={{ borderRadius: '20px', overflow: 'hidden' }}
      ></iframe>
    </Flex>
  );
};

export default Testimony;
