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

      return scoreA - scoreB;
    });

    return sorted.map((entry, index) => {
      const overall = Number(entry?.overallRanking);
      const game = entry?.gameRankings;

      return {
        id: entry?.id || entry?._id || index,
        rank: Number.isFinite(overall) && overall >= 0 ? overall : '—',
        lgName: entry?.lgName || '—',
        game1: Number.isFinite(game[0]) && game[0] >= 0 ? game[0] : '—',
        game2: Number.isFinite(game[1]) && game[1] >= 0 ? game[1] : '—',
        game3: Number.isFinite(game[2]) && game[2] >= 0 ? game[2] : '—',
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
      transform={{
        base: 'translateY(-16px)',
        sm: 'translateY(-18px)',
        md: 'translateY(-24px)',
        lg: 'translateY(-30px)',
      }}
    >
      <Box w="full" maxW="45rem">
        <Flex
          align="center"
          gap={{ base: 3, sm: 4 }}
          cursor="pointer"
          color="white"
          onClick={onBack}
          _hover={{ color: '#FFF769' }}
          justify="flex-start"
          wrap="wrap"
          alignSelf="flex-start"
          ml={{
            base: '1vw',
            sm: '1vw',
            md: '1vw',
            lg: '-18vw',
          }}
        >
          <Flex
            w={{ base: '2.5rem', sm: '2.75rem', md: '3rem' }}
            h={{ base: '2.5rem', sm: '2.75rem', md: '3rem' }}
            borderRadius="full"
            border="0.0625rem solid rgba(255, 255, 255, 0.35)"
            bg="rgba(0, 0, 0, 0.55)"
            align="center"
            justify="center"
            transform={{ base: 'none', md: 'translateY(-0.625rem)' }}
          >
            <Icon
              as={RiArrowLeftLine}
              fontSize={{ base: 'lg', sm: 'xl', md: 'xl' }}
            />
          </Flex>
          <Image
            src="/images/harvest-games/harvestgames_title.png"
            alt="Harvest Games Title"
            h={{
              base: '3.75rem',
              sm: '4.375rem',
              md: '5.625rem',
              lg: '7.5rem',
            }}
            maxW={{
              base: 'calc(100% - 4rem)',
              sm: 'calc(100% - 4.75rem)',
              md: '26.25rem',
              lg: '100%',
            }}
            objectFit="contain"
          />
        </Flex>
      </Box>

      <VStack
        spacing={{ base: 4, sm: 5, md: 6, lg: 8 }}
        w="full"
        maxW="45rem"
        transform={{
          base: 'translateY(-0.625rem)',
          sm: 'translateY(-0.875rem)',
          md: 'translateY(-1.75rem)',
          lg: 'translateY(-2.5rem)',
        }}
      >
        <Box
          bg="rgba(0, 0, 0, 0.65)"
          border="0.0625rem solid #474747"
          borderRadius="0.5rem"
          px={{ base: '1.25rem', sm: '1.5rem', md: '2rem', lg: '2rem' }}
          py={{ base: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '1rem' }}
          color="white"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          w="full"
          textAlign="center"
          boxShadow="0 0.1875rem 1.1875rem -6.4375rem rgba(74, 74, 74, 0.20)"
        >
          <Flex align="center" gap={{ base: 2, sm: 3 }} justify="center">
            <Icon
              as={RiFlagLine}
              fontSize={{
                base: '1.375rem',
                sm: '1.75rem',
                md: '2.25rem',
                lg: '3.125rem',
              }}
              color="white"
            />
            <Text
              fontSize={{
                base: '1.8125rem',
                sm: '1.75rem',
                md: '2.25rem',
                lg: '3.125rem',
              }}
              textTransform="uppercase"
              whiteSpace="nowrap"
              letterSpacing={{
                base: '0.0550625rem',
                sm: '0.03125rem',
                md: '0.0375rem',
                lg: '0.09375rem',
              }}
            >
              Leaderboard
            </Text>
          </Flex>
        </Box>

        <Box
          bg="rgba(0, 0, 0, 0.6)"
          border="0.0625rem solid #474747"
          borderRadius="0.5rem"
          px={{ base: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2rem' }}
          py={{ base: '1rem', sm: '1.25rem', md: '1.75rem', lg: '2rem' }}
          color="white"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          w="full"
          boxShadow="0 0.1875rem 1.1875rem -6.4375rem rgba(74, 74, 74, 0.20)"
        >
          <Box overflowX={{ base: 'auto', md: 'visible' }}>
            <Table
              variant="unstyled"
              color="white"
              letterSpacing={{
                base: '0.028125rem',
                sm: '0.03125rem',
                md: '0.0375rem',
              }}
              minW={{ base: '100%', sm: '32.5rem' }}
              fontFamily="'CodeBold'"
            >
              <Thead>
                <Tr
                  fontSize={{
                    base: '0.8125rem',
                    sm: '0.9375rem',
                    md: '1.125rem',
                    lg: '1.25rem',
                  }}
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
                    fontSize={{
                      base: '0.75rem',
                      sm: '0.9375rem',
                      md: '1.25rem',
                      lg: '1.25rem',
                    }}
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
                    fontSize={{
                      base: '0.75rem',
                      sm: '0.9375rem',
                      md: '1.25rem',
                      lg: '1.25rem',
                    }}
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
                    fontSize={{
                      base: '0.75rem',
                      sm: '0.9375rem',
                      md: '1.25rem',
                      lg: '1.25rem',
                    }}
                  >
                    GAME 1
                  </Th>
                  <Th
                    textAlign="center"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    py={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    px={{ base: 2, sm: 3, md: 4 }}
                    fontFamily="'CodeBold'"
                    fontSize={{
                      base: '0.75rem',
                      sm: '0.9375rem',
                      md: '1.25rem',
                      lg: '1.25rem',
                    }}
                  >
                    GAME 2
                  </Th>
                  <Th
                    textAlign="center"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    py={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    px={{ base: 2, sm: 3, md: 4 }}
                    fontFamily="'CodeBold'"
                    fontSize={{
                      base: '0.75rem',
                      sm: '0.9375rem',
                      md: '1.25rem',
                      lg: '1.25rem',
                    }}
                  >
                    GAME 3
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
                      fontSize={{
                        base: '0.8125rem',
                        sm: '0.9375rem',
                        md: '1.0625rem',
                        lg: '1.25rem',
                      }}
                      borderBottom="0.0625rem solid rgba(255, 255, 255, 0.08)"
                      _last={{ borderBottom: 'none' }}
                    >
                      <Td
                        color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                        textAlign="center"
                        whiteSpace="normal"
                        py={{ base: 2, sm: 3, md: 4, lg: 3 }}
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
                        {entry.game1}
                      </Td>
                      <Td
                        textAlign="center"
                        color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                        whiteSpace="normal"
                        py={{ base: 2, sm: 3, md: 4, lg: 3 }}
                        px={{ base: 2, sm: 3, md: 4 }}
                      >
                        {entry.game2}
                      </Td>
                      <Td
                        textAlign="center"
                        color={entry.rank === 1 ? '#FFD75A' : 'inherit'}
                        whiteSpace="normal"
                        py={{ base: 2, sm: 3, md: 4, lg: 3 }}
                        px={{ base: 2, sm: 3, md: 4 }}
                      >
                        {entry.game3}
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
