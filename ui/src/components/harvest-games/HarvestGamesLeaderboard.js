import {
  Box,
  Flex,
  Icon,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { RiArrowLeftLine, RiFlagLine } from 'react-icons/ri';

const MOCK_DATA = [
  { rank: 1, name: 'Eras Life Group', score: 1000 },
  { rank: 2, name: 'Canon Life Group', score: 1000 },
  { rank: 3, name: 'All In Life Group', score: 1000 },
  { rank: 4, name: 'Peak Life Group', score: 1000 },
];

const HarvestGamesLeaderboard = ({ onBack }) => {
  return (
    <VStack
      spacing={8}
      w="full"
      fontFamily="'CodeBold'"
      align="center"
      px={{ base: 4, md: 0 }}
      transform={{ base: 'translateY(-48px)', md: 'translateY(-60px)' }}
    >
      <Box
        w="full"
        maxW="720px"
        transform={{ base: 'translateX(-48px)', md: 'translateX(-180px)' }}
      >
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
            transform={{ base: 'translateY(-10px)', md: 'translateY(-10px)' }}
          >
            <Icon as={RiArrowLeftLine} fontSize={{ base: 'lg', md: 'xl' }} />
          </Flex>
          <Image
            src="/images/harvest-games/harvestgames_title.png"
            alt="Harvest Games Title"
            h={{ base: '40px', md: '120px' }}
            objectFit="contain"
          />
        </Flex>
      </Box>

      <VStack spacing={4} w="full" maxW="720px" transform={{ base: 'translateY(-40px)', md: 'translateY(-40px)' }}>
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
            <Icon
              as={RiFlagLine}
              fontSize={{ base: 'xl', md: '2xl' }}
              color="#FFF769"
            />
            <Text
              fontSize={{ base: '2xl', md: '3xl' }}
              textTransform="uppercase"
            >
              Leaderboard
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
          <Table variant="unstyled" color="white">
            <Thead>
              <Tr
                fontSize={{ base: 'sm', md: 'md' }}
                textTransform="uppercase"
                color="#B7B7B7"
              >
                <Th>Rank #</Th>
                <Th>Life Group Name</Th>
                <Th textAlign="right">Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {MOCK_DATA.map((entry) => (
                <Tr
                  key={entry.rank}
                  fontSize={{ base: 'sm', md: 'md' }}
                  borderBottom="1px solid rgba(255, 255, 255, 0.08)"
                  _last={{ borderBottom: 'none' }}
                >
                  <Td>{entry.rank}</Td>
                  <Td
                    color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                    textTransform="uppercase"
                  >
                    {entry.name}
                  </Td>
                  <Td
                    textAlign="right"
                    color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                  >
                    {entry.score}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </VStack>
  );
};

export default HarvestGamesLeaderboard;
