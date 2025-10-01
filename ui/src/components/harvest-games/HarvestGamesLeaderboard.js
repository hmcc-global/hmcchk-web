import {
  Box,
  Flex,
  Icon,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { RiArrowLeftLine, RiFlagLine } from 'react-icons/ri';
import { customAxios as axios } from '../helpers/customAxios';

const HarvestGamesLeaderboard = ({ onBack }) => {
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRankings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get('/api/hgRankings/get');

        if (isMounted) {
          const safeData = Array.isArray(data) ? data : [];
          setRankings(safeData);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to retrieve Harvest Games rankings', err);
          setRankings([]);
          setError(
            'Unable to load leaderboard right now. Please try again later.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRankings();

    return () => {
      isMounted = false;
    };
  }, []);

  const tableData = useMemo(() => {
    if (!rankings?.length) return [];

    const getScoreValue = (entry) => {
      const overall = Number(entry?.overallRanking);
      return Number.isFinite(overall) ? overall : Number.NEGATIVE_INFINITY;
    };

    const sorted = [...rankings].sort((a, b) => {
      const scoreA = getScoreValue(a);
      const scoreB = getScoreValue(b);

      if (scoreA === scoreB) {
        const nameA = a?.lgName?.toLowerCase?.() || '';
        const nameB = b?.lgName?.toLowerCase?.() || '';
        return nameA.localeCompare(nameB);
      }

      return scoreB - scoreA;
    });

    return sorted.map((entry, index) => {
      const overall = Number(entry?.overallRanking);
      return {
        id: entry?.id || entry?._id || index,
        rank: index + 1,
        lgName: entry?.lgName || '—',
        score: Number.isFinite(overall) && overall >= 0 ? overall : '—',
      };
    });
  }, [rankings]);

  return (
    <VStack
      spacing={{ base: 6, sm: 7, md: 8 }}
      w="full"
      fontFamily="'CodeBold'"
      align="center"
      px={{ base: 3, sm: 4, md: 6, lg: 0 }}
      py={{ base: 4, sm: 6, md: 6, lg: 0 }}
      transform={{ base: 'translateY(-16px)', sm: 'translateY(-18px)', md: 'translateY(-24px)', lg: 'translateY(-30px)' }}
    >
      <Box
        w="full"
        maxW="720px"
      >
        <Flex
          align="center"
          gap={{ base: 3, sm: 4 }}
          cursor="pointer"
          color="white"
          onClick={onBack}
          _hover={{ color: '#FFF769' }}
          justify="flex-start"
          wrap="wrap"
          transform={{ base: 'none', md: 'translateX(calc(maxW/2))', lg: 'translateX(calc(-270px))' }}
        >
          <Flex
            w={{ base: '40px', sm: '44px', md: '48px' }}
            h={{ base: '40px', sm: '44px', md: '48px' }}
            borderRadius="full"
            border="1px solid rgba(255, 255, 255, 0.35)"
            bg="rgba(0, 0, 0, 0.55)"
            align="center"
            justify="center"
            transform={{ base: 'none', md: 'translateY(-10px)' }}
          >
            <Icon as={RiArrowLeftLine} fontSize={{ base: 'lg', sm: 'xl', md: 'xl' }} />
          </Flex>
          <Image
            src="/images/harvest-games/harvestgames_title.png"
            alt="Harvest Games Title"
            h={{ base: '60px', sm: '70px', md: '90px', lg: '120px' }}
            maxW={{ base: 'calc(100% - 64px)', sm: 'calc(100% - 76px)', md: '420px', lg: '100%' }}
            objectFit="contain"
          />
        </Flex>
      </Box>

      <VStack
        spacing={{ base: 4, sm: 5, md: 6, lg: 8 }}
        w="full"
        maxW="720px"
        transform={{ base: 'translateY(-10px)', sm: 'translateY(-14px)', md: 'translateY(-28px)', lg: 'translateY(-40px)' }}
      >
        <Box
          bg="rgba(0, 0, 0, 0.65)"
          border="1px solid #474747"
          borderRadius="8px"
          px={{ base: 5, sm: 6, md: 8, lg: 8 }}
          py={{ base: 5, sm: 6, md: 7, lg: 4}}
          color="white"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          w="full"
          textAlign="center"
          boxShadow="0 3px 19px -103px rgba(74, 74, 74, 0.20)"
        >
          <Flex align="center" gap={{ base: 2, sm: 3 }} justify="center">
            <Icon
              as={RiFlagLine}
              fontSize={{ base: '22px', sm: '28px', md: '36px', lg: '50px' }}
              color="white"
            />
            <Text
              fontSize={{ base: '29px', sm: '28px', md: '36px', lg: '50px' }}
              textTransform="uppercase"
              whiteSpace="nowrap"
              letterSpacing={{ base: '0.881px', sm: '0.5px', md: '0.6px', lg: '1.5px' }}
            >
              Leaderboard
            </Text>
          </Flex>
        </Box>

        <Box
          bg="rgba(0, 0, 0, 0.6)"
          border="1px solid #474747"
          borderRadius="8px"
          px={{ base: 3, sm: 4, md: 6, lg: 8 }}
          py={{ base: 4, sm: 5, md: 7, lg: 8 }}
          color="white"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          w="full"
          boxShadow="0 3px 19px -103px rgba(74, 74, 74, 0.20)"
        >
          <Box overflowX={{ base: 'auto', md: 'visible' }}>
            <Table
              variant="unstyled"
              color="white"
              overflow="hidden"
              letterSpacing={{ base: '0.45px', sm: '0.5px', md: '0.6px' }}
              minW={{ base: '100%', sm: '520px' }}
              fontFamily="'CodeBold'"
            >
              <Thead>
                <Tr
                  fontSize={{ base: '13px', sm: '15px', md: '18px', lg: '20px' }}
                  textTransform="uppercase"
                  fontFamily="'CodeBold'"
                >
                  <Th
                    textAlign="center"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    fontFamily="'CodeBold'"
                    py={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    px={{ base: 2, sm: 3, md: 4 }}
                    fontSize={{ base: '15px', sm: '15px', md: '20px', lg: '20px' }}
                  >
                    Rank #
                  </Th>
                  <Th
                    textAlign="center"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    fontFamily="'CodeBold'"
                    py={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    px={{ base: 2, sm: 3, md: 4 }}
                    fontSize={{ base: '15px', sm: '15px', md: '20px', lg: '20px' }}
                  >
                    Life Group Name
                  </Th>
                  <Th
                    textAlign="center"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    py={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    px={{ base: 2, sm: 3, md: 4 }}
                    fontFamily="'CodeBold'"
                    fontSize={{ base: '15px', sm: '15px', md: '20px', lg: '20px' }}
                  >
                    Score
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  <Tr>
                    <Td colSpan={3}>
                      <Flex align="center" justify="center" py={6} gap={3}>
                        <Spinner size="sm" color="#FFF769" />
                        <Text fontSize={{ base: 'sm', md: 'md' }}>
                          Loading leaderboard...
                        </Text>
                      </Flex>
                    </Td>
                  </Tr>
                ) : error ? (
                  <Tr>
                    <Td colSpan={3}>
                      <Text textAlign="center" color="red.300" py={6}>
                        {error}
                      </Text>
                    </Td>
                  </Tr>
                ) : tableData.length === 0 ? (
                  <Tr>
                    <Td colSpan={3}>
                      <Text textAlign="center" color="gray.300" py={6}>
                        Leaderboard results will appear here soon.
                      </Text>
                    </Td>
                  </Tr>
                ) : (
                  tableData.map((entry) => (
                    <Tr
                      key={entry.id}
                      fontSize={{ base: '13px', sm: '15px', md: '17px', lg: '20px' }}
                      borderBottom="1px solid rgba(255, 255, 255, 0.08)"
                      _last={{ borderBottom: 'none' }}
                    >
                      <Td
                        color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                        textAlign="center"
                        whiteSpace="normal"
                        py={{ base: 2, sm: 3, md: 4, lg: 3}}
                        px={{ base: 2, sm: 3, md: 4 }}
                      >
                        {entry.rank}
                      </Td>
                      <Td
                        color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                        textTransform="uppercase"
                        textAlign="center"
                        whiteSpace="normal"
                        wordBreak="break-word"
                        py={{ base: 2, sm: 3, md: 4, lg: 3 }}
                        px={{ base: 2, sm: 3, md: 4 }}
                      >
                        {entry.lgName}
                      </Td>
                      <Td
                        textAlign="center"
                        color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                        whiteSpace="normal"
                        py={{ base: 2, sm: 3, md: 4, lg: 3 }}
                        px={{ base: 2, sm: 3, md: 4 }}
                      >
                        {entry.score}
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>
    </VStack>
  );
};

export default HarvestGamesLeaderboard;
