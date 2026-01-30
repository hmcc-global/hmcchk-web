import { useState } from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  HStack,
  Button,
  SimpleGrid,
  VStack,
  Link,
} from '@chakra-ui/react';
import GivingCard from '../giving/GivingCard.js';

const GivingSection = (props) => {
  const [activeTab, setActiveTab] = useState('giving');

  const givingOptions = [
    {
      text: 'FPS',
      color: '#000000',
      imageLink: process.env.PUBLIC_URL + '/images/giving/FPS.png',
    },
    {
      text: 'Online Giving',
      color: '#000000',
      imageLink: process.env.PUBLIC_URL + '/images/giving/Online.png',
    },
    {
      text: 'Bank Transfer',
      color: '#000000',
      imageLink: process.env.PUBLIC_URL + '/images/giving/Transfer.png',
    },
    {
      text: 'Cash',
      color: '#000000',
      imageLink: process.env.PUBLIC_URL + '/images/giving/Cash.png',
    },
    {
      text: 'Cheque',
      color: '#000000',
      imageLink: process.env.PUBLIC_URL + '/images/giving/Cheque.png',
    },
  ];

  const GivingContent = () => (
    <Box
      w={['100%', '100%', '100%']}
      h="20%"
      borderRadius="lg"
      fontFamily="Manrope"
      bg="#FFFAED"
    >
      <Heading
        as="h2"
        size="md"
        paddingBottom="1vw"
        color="#000000"
        fontFamily="Manrope"
        letterSpacing={'0.12em'}
      >
        <Center>WAYS TO SPONSOR/GIVE:</Center>
      </Heading>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
        spacing={8}
        justifyItems="center"
      >
        {givingOptions.map((option, index) => (
          <VStack key={index} spacing={3} align="center">
            <GivingCard text={option.text} imageLink={option.imageLink} />
          </VStack>
        ))}
      </SimpleGrid>

      <Box paddingTop="2vh">
        <Text>
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team.
        </Text>
      </Box>
      <Box paddingTop="2vh">
        <Text>
          If you have any questions, please do not hesitate to contact us:&nbsp;
          <Text as="span" fontWeight="bold">
            hk@hmccglobal.org
          </Text>
        </Text>
      </Box>
    </Box>
  );
  const PrayerRequestContent = () => (
    <Box mt={6}>
      <Heading
        as="h2"
        size="md"
        mb={8}
        color="#000000"
        fontFamily="Manrope"
        fontWeight="bold"
        letterSpacing="wide"
        textAlign="center"
      >
        HERE'S OUR PRAYER REQUEST:
      </Heading>

      <Flex justifyContent="center" flexWrap="wrap" position="relative">
        <Box
          flex={{ base: '1 1 100%', md: '1' }}
          p={4}
          textAlign="center"
          position="relative"
          _after={{
            base: {},
            md: {
              content: '""',
              position: 'absolute',
              right: '0',
              top: '20%',
              bottom: '20%',
              width: '1px',
              bg: 'black',
              display: 'block',
            },
          }}
        >
          <VStack spacing={4}>
            <Box fontSize="4xl" color="#EBAC09">
              🙏
            </Box>
            <Text fontWeight="bold" fontSize="lg" textTransform="uppercase">
              ENGAGE
            </Text>
            <Text fontSize="sm" color="gray.700">
              Engage with the needy by loving the city through different
              existing initiatives and activities.
            </Text>
          </VStack>
        </Box>
        <Box
          flex={{ base: '1 1 100%', md: '1' }}
          p={4}
          textAlign="center"
          position="relative"
          _after={{
            base: {},
            md: {
              content: '""',
              position: 'absolute',
              right: '0',
              top: '20%',
              bottom: '20%',
              width: '1px',
              bg: 'black',
              display: 'block',
            },
          }}
        >
          <VStack spacing={4}>
            <Box fontSize="4xl" color="#EBAC09">
              ⛪
            </Box>
            <Text fontWeight="bold" fontSize="lg" textTransform="uppercase">
              EMPOWER
            </Text>
            <Text fontSize="sm" color="gray.700">
              Empower churches and ministries by providing participants a
              platform to serve the city together.
            </Text>
          </VStack>
        </Box>
        <Box flex={{ base: '1 1 100%', md: '1' }} p={4} textAlign="center">
          <VStack spacing={4}>
            <Box fontSize="4xl" color="#EBAC09">
              🫶
            </Box>
            <Text fontWeight="bold" fontSize="lg" textTransform="uppercase">
              EXHIBIT
            </Text>
            <Text fontSize="sm" color="gray.700">
              Exhibit God's work by serving and caring for the unreached through
              CityServe.
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
  return (
    <Container maxW="container.lg" py={8}>
      <Box bg="#FFFAED" p={6} borderRadius="lg" mb={10}>
       
          <Flex mb={10} position="relative">
            <Button
              bg={activeTab === 'giving' ? '#EBAC09' : 'white'}
              variant="unstyled"
              flex={1}
              px={6}
              py={6}
              fontSize="xl"
              fontWeight="bold"
              fontFamily="Manrope"
              color={activeTab === 'giving' ? '#FFFFFF' : 'black'}
              borderRadius="20px"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              onClick={() => setActiveTab('giving')}
            >
              SPONSOR/GIVE
            </Button>

            <Button
              variant="unstyled"
              flex={1}
              px={6}
              py={6}
              fontSize="xl"
              fontWeight="bold"
              fontFamily="Manrope"
              bg={activeTab === 'prayer' ? '#EBAC09' : 'white'}
              color={activeTab === 'prayer' ? '#FFFFFF' : 'black'}
              borderRadius="20px"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              onClick={() => setActiveTab('prayer')}
            >
              PRAYER REQUEST
            </Button>
          </Flex>

        {activeTab === 'giving' ? <GivingContent /> : <PrayerRequestContent />}
      </Box>
    </Container>
  );
};
export default GivingSection;
