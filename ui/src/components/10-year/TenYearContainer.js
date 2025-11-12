import { Flex, Box } from '@chakra-ui/react';
import TenYearVideo from './TenYearVideo';
import { tenYearTheme } from './theme';

const TenYearContainer = () => {
  return (
    <Flex direction="column" bgColor={tenYearTheme.colors.background} py={10} align="center">
      <Box w="100%" px={[4, 8]}>
        <TenYearVideo />
      </Box>
    </Flex>
  );
};

export default TenYearContainer;
