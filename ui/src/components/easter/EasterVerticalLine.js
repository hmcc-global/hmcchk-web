import { Box } from '@chakra-ui/react';

const EasterVerticalLine = ({ position, color = '#B8B09B' }) => {
  return position === 'right' ? (
    <Box
      h="auto"
      w="3em"
      borderRightWidth="1px"
      borderRightStyle="solid"
      borderRightColor={color}
      borderRadius="24px"
    />
  ) : (
    <Box
      h="auto"
      w="3em"
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor={color}
      borderRadius="24px"
    />
  );
};

export default EasterVerticalLine;
