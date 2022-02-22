import { Text, Box } from '@chakra-ui/react';
const PraiseCard = ({ cardColor, message }) => {
  return (
    <Box
      bg={cardColor}
      minH="80px"
      borderRadius="20"
      shadow="lg"
      w="100%"
      overflow="True"
    >
      <Text p="0.5em" align="center" verticalAlign="center">
        {message}
      </Text>
    </Box>
  );
};
export default PraiseCard;
