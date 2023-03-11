import {
  Container,
  Text,
  VStack,
  Box,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Image,
  Stack,
  Button,
  Flex,
  Link,
  Center,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import CuratorWidget from "./CuratorWidget";

const igEmbed = () => {
  return(
    <VStack>
      <Box>
      textAlign="center"
      textStyle="dm_sans_bold"
      fontSize={{ sm: '20px', md: '30px', lg: '40px' }}
    
      <Text textColor="#E60053">#2023Witness Testimony Campaign</Text>
      <Button
        borderRadius={[5, 10]}
        background="linear-gradient(109.54deg, #FF4F50 11.11%, #D33E68 57.55%, #BD3381 95.53%)"
        textColor="#FFFFFF"
        fontWeight="700"
        fontFamily="Inter"
        height={['25px', '40px']}
        fontSize={['xs', 'sm', 'lg']}
        as={Link}
        href="https://www.instagram.com/hmcc_hk/"
        _hover="none"
        target="_blank"
      >
        Follow @hmcc_hk
      </Button>
    </Box>
        {/* <CuratorWidget feedId="c9604362-7f5d-442f-9ce4-2acbbffedd3e"/> */}
    <Box
      paddingLeft={{ sm: '10%', md: '20%', lg: '20%' }}
      paddingRight={{ sm: '10%', md: '20%', lg: '20%' }}
      maxHeight= 'inherit'
      backgroundColor = 'pink' 
      // maxW = {{ sm: '90%', md: 700, lg: 900 }}
    >

    {/* <CuratorWidget feedId="c9604362-7f5d-442f-9ce4-2acbbffedd3e"/> */}
    {/* {(new Date("2023-03-14")) < (new Date()) ?  <CuratorWidget feedId='98ed08e0-ffb8-42b7-b9ef-a760398b3066'/>  : null} */}

    </Box>
    </VStack>
 
);
};  export default igEmbed;