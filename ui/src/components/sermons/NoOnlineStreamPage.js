import React from 'react';
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Box,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { MdVideoLibrary, MdSchedule } from 'react-icons/md';

const NoOnlineStreamPage = () => {
  const history = useHistory();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleGoToSermons = () => {
    history.push('/sermons');
  };

  return (
    <Box bg={bgColor} minH="70vh" py={8}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          {/* Icon */}
          <Box>
            <Icon as={MdSchedule} w={16} h={16} color="blue.500" mb={4} />
          </Box>

          {/* Main Content */}
          <Box bg={cardBg} p={8} borderRadius="lg" shadow="md" w="100%">
            <VStack spacing={6}>
              <Heading
                as="h1"
                size="xl"
                fontFamily="DMSerifDisplay_Italic"
                color="blue.600"
              >
                No Live Stream Available
              </Heading>

              <Text fontSize="lg" color="gray.600" maxW="md" lineHeight="tall">
                We're not currently streaming live, but don't worry! You can
                still access our collection of past sermons
              </Text>

              <Text fontSize="md" color="gray.500">
                Our live streams typically happen during:
              </Text>

              <VStack spacing={2} fontSize="sm" color="gray.600">
                <Text>📅 Sunday Service: 10:00 AM HKT</Text>
                <Text>
                  📅 Check out our EVENTS page for upcoming services and
                  gatherings
                </Text>
              </VStack>
            </VStack>
          </Box>

          <VStack spacing={4} w="100%">
            <Button
              size="lg"
              colorScheme="blue"
              leftIcon={<Icon as={MdVideoLibrary} />}
              onClick={handleGoToSermons}
              px={8}
              py={6}
              fontSize="md"
              fontWeight="semibold"
            >
              Browse Past Sermons
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default NoOnlineStreamPage;
