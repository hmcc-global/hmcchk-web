import { Box, Text, extendTheme } from '@chakra-ui/react';
import '@fontsource/sora';

const retreatTheme = extendTheme({
  textStyles: {
    title: {
      fontSize: '50px',
      fontWeight: 'normal',
      lineHeight: '95.5%',
    },
  },
});

const AboutSection = () => {
  return (
    <Box>
      <Text textStyle="title" fontSize="5xl">
        ABOUT:
        <br />
        WITH EVERYTHING - <br />
        CONGREGATIONAL RETREAT 2022
      </Text>
    </Box>
  );
};

export default AboutSection;
