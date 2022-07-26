import { Center, Icon, Text, VStack, Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const ErrorPage = (props) => {
  console.log(props);
  return (
    <Box
      minH="100vh"
      bgImage={`url(${
        process.env.PUBLIC_URL + 'images/default-hk-background.jpeg'
      })`}
      w="full"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      bgSize="cover"
    >
      <Center pt={['50%', '25%']}>
        <VStack
          bgColor="#f7fafc"
          borderRadius="xl"
          px={['6', '9']}
          py={['7']}
          maxW={['95%', '100%']}
          spacing="3"
          textAlign="center"
        >
          <Icon as={MdErrorOutline} color="#F89A9A" w="8" h="8" />
          <Text color="#656565" fontSize={['sm', 'md']}>
            Oops, something went wrong!
            <br />
            You are unable to access this form right now.
          </Text>
          <Text color="#656565" fontWeight="700" fontSize={['sm', 'md']}>
            Please login to your HMCC account to try again.
          </Text>
          <Button
            as={Link}
            to="/"
            borderRadius="lg"
            bgColor="#0058D2"
            color="#ffffff"
            w="100%"
            fontWeight="700"
            size="md"
            fontSize={['sm', 'md']}
            _hover={{ bgColor: '#0058d2d9' }}
          >
            LOGIN
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default ErrorPage;
