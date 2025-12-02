import { Flex, Box } from '@chakra-ui/react';
import TenYearVideo from './TenYearVideo';
import { tenYearTheme } from './theme';

const TenYearContainer = () => {
  const backgroundImage = `${process.env.PUBLIC_URL}/images/10-year/10y_bg.png`;
  
  return (
    <Flex 
      direction="column" 
      bgColor={tenYearTheme.colors.background}
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      py={10} 
      align="center"
    >
      <Box w="100%" px={[4, 8]}>
        <TenYearVideo />
      </Box>
    </Flex>
  );
};

export default TenYearContainer;
