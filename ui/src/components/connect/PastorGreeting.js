import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Icon,
  Text,
  HStack,
} from '@chakra-ui/react';
import './_connect.scss';
import { IoPlayCircleOutline } from 'react-icons/io5';

const PastorGreeting = (props) => {
  return (
    <Box id="pastor-greeting" w="full">
      <HStack
        textAlign="center"
        fontFamily="Manrope"
        fontWeight="800"
        fontSize={['xs', 'sm', 'xl']}
        color="#4A6EEB"
        mb={[4, 5]}
        justifyContent="center"
      >
        <Icon as={IoPlayCircleOutline} boxSize={[6, 8, 10]} />
        <Text>A welcome message from our Pastor Seth Kim</Text>
      </HStack>
      <AspectRatio
        maxW={['100%', '100%', '66%']}
        ratio={16 / 9}
        mx="auto"
        borderRadius="20"
        borderWidth="1px"
        overflow="hidden"
      >
        <iframe
          src="https://www.youtube.com/embed/tainVHwAWt0"
          title="YouTube video player"
          allowFullScreen
        />
      </AspectRatio>
    </Box>
  );
};

export default PastorGreeting;
