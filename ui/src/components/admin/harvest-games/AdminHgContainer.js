import React, { useEffect, useState, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Container,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  Text,
} from '@chakra-ui/react';
import HarvestGamesGrid from './HarvestGamesGrid';

export default function AdminHgContainer(props) {
  const toast = useToast();
  const [hgRankings, setHgRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState('');
  const [lgName, setLgName] = useState('');
  const [gameCount, setGameCount] = useState('');
  const [overallRanking, setOverallRanking] = useState('');

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/hgRankings/get');
      console.log(data);
      if (data) setHgRankings(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const createHandler = async () => {
    try {
      const gameRankingsArr = Array(gameCount).fill(0);

      const res = await axios.post('/api/hgRankings/create', {
        lgName: lgName,
        gameCount: gameRankingsArr,
        overallRanking: Number(overallRanking),
      });

      if (res.status === 200) {
        const { data } = res;
        setId(data.id);
        return true;
      }
    } catch (e) {
      console.log(e.response);
      toast({
        description: e.response.data,
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!lgName || lgName.length === 0 || nameCheck()) return;

    setIsLoading(true);

    let success = await createHandler();

    if (success) {
      toast({
        description: 'Created',
        status: 'success',
        duration: 5000,
      });
      await getData();
    }

    setIsLoading(false);
  };

  const resetHandler = () => {
    setId('');
    setLgName('');
    setGameCount('');
    setOverallRanking('');
  };

  const nameCheck = () => {
    if (
      hgRankings &&
      hgRankings.some((i) => i.id !== id && i.lgName === lgName)
    )
      return true;

    return false;
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        Harvest Games Ranking Manager
      </Heading>
      <Stack direction={['column', 'row']} w="100%">
        <Box w={['100%', '30%']}>
          <Text fontSize="2xl" fontWeight="700" mb={5}>
            Create LIFE Group Ranking
          </Text>
          <form onSubmit={onSubmit}>
            <FormControl isRequired isInvalid={nameCheck()}>
              <FormLabel>LIFE Group Name</FormLabel>
              <Input
                type="text"
                value={lgName}
                onChange={(e) => setLgName(e.target.value)}
              />
              <FormErrorMessage>
                Another ranking with the same LG name already exists
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>No. of Games</FormLabel>
              <Input
                type="number"
                value={gameCount}
                onChange={(e) => setGameCount(e.target.value)}
              />
            </FormControl>
            <Text fontSize="sm" as="i" mb={5}>
              Enter number of games to be played.
            </Text>

            <FormControl mt={5}>
              <FormLabel>Overall Ranking</FormLabel>
              <Input
                type="number"
                value={overallRanking}
                onChange={(e) => setOverallRanking(e.target.value)}
              />
            </FormControl>

            <FormControl mt={10}>
              <Button type="submit" w="full" isLoading={isLoading}>
                CREATE
              </Button>
            </FormControl>
            <Button colorScheme="green" w="full" mt={5} onClick={resetHandler}>
              RESET
            </Button>
          </form>
        </Box>
        <Box w={['100%', '70%']}>
          <HarvestGamesGrid hgRankings={hgRankings} />
        </Box>
      </Stack>
    </Container>
  );
}
