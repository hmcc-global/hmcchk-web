import { Box, Flex, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { RiArrowLeftLine, RiGamepadLine } from 'react-icons/ri';

const HarvestGamesInstructions = ({ onBack }) => {
  return (
    <VStack spacing={8} w="full" fontFamily="'CodeBold'" align="center" px={{ base: 4, md: 0 }}>
      <Box w="full" maxW="720px" pl={{ base: 0, md: 4 }}>
        <Flex
          align="center"
          gap={4}
          cursor="pointer"
          color="white"
          onClick={onBack}
          _hover={{ color: '#FFF769' }}
        >
          <Flex
            w={{ base: '40px', md: '48px' }}
            h={{ base: '40px', md: '48px' }}
            borderRadius="full"
            border="1px solid rgba(255, 255, 255, 0.35)"
            bg="rgba(0, 0, 0, 0.55)"
            align="center"
            justify="center"
          >
            <Icon as={RiArrowLeftLine} fontSize={{ base: 'lg', md: 'xl' }} />
          </Flex>
          <Image
            src="/images/harvest-games/harvestgames_title.png"
            alt="Harvest Games Title"
            h={{ base: '40px', md: '60px' }}
            objectFit="contain"
          />
        </Flex>
      </Box>

      <Image
        src="/images/harvest-games/harvestgames_title.png"
        alt="Harvest Games Title"
        h={{ base: '48px', md: '88px' }}
        objectFit="contain"
      />

      <VStack spacing={4} w="full" maxW="720px">
        <Box
          bg="rgba(0, 0, 0, 0.65)"
          border="1px solid rgba(255, 255, 255, 0.2)"
          borderRadius="24px"
          px={{ base: 6, md: 10 }}
          py={{ base: 6, md: 8 }}
          color="white"
          backdropFilter="blur(12px)"
          w="full"
          textAlign="left"
          boxShadow="0 18px 35px -18px rgba(0,0,0,0.45)"
        >
          <Flex align="center" gap={4}>
            <Icon as={RiGamepadLine} fontSize={{ base: 'xl', md: '2xl' }} color="#FFF769" />
            <Text fontSize={{ base: '2xl', md: '3xl' }} textTransform="uppercase">
              Game Instructions
            </Text>
          </Flex>
        </Box>

        <Box
          bg="rgba(0, 0, 0, 0.6)"
          border="1px solid rgba(255, 255, 255, 0.15)"
          borderRadius="24px"
          px={{ base: 6, md: 10 }}
          py={{ base: 6, md: 8 }}
          color="white"
          backdropFilter="blur(12px)"
          w="full"
          boxShadow="0 22px 45px -18px rgba(0,0,0,0.45)"
        >
          <VStack align="flex-start" spacing={4} fontSize={{ base: 'md', md: 'lg' }}>
            <Text>
              Detailed instructions for Harvest Games 2025 will appear here. Stay tuned for the
              full lineup, scoring system, and event schedule.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </VStack>
  );
};

export default HarvestGamesInstructions;

