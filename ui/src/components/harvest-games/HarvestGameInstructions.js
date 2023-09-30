import {
  Box,
  Select,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  Grid,
  Image,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { useEffect, useState, Fragment } from 'react';
import { customAxios as axios } from '../helpers/customAxios';

import './styles.css';

export default function HarvestGameInstructions() {
  const [selected, setSelected] = useState(0);
  const [game_1pwd, setGame_1pwd] = useState('');
  const [game_2pwd, setGame_2pwd] = useState('');
  const [game_3pwd, setGame_3pwd] = useState('');
  const [pwd, setPassword] = useState('');
  const [inputValue, setInput] = useState('');
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/hgrankings/get');
      const password = data.filter((row) => row.lgName === 'password');
      setGame_1pwd(String(password[0].gameRankings[0]));
      setGame_2pwd(String(password[0].gameRankings[1]));
      setGame_3pwd(String(password[0].gameRankings[2]));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const gameType = [
    {
      game_num: 'Game #1',
      name: 'TIDY-UP',
      round: 3,
      player: 4,
      imageUrl: [
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg1-1' +
          game_1pwd +
          '.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg1-2' +
          game_1pwd +
          '.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg1-3' +
          game_1pwd +
          '.gif',
      ],
      id: 'game_1',
      pwd: game_1pwd,
    },

    {
      game_num: 'Game #2',
      name: 'OFF-ROAD',
      round: 3,
      player: 4,
      imageUrl: [
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg2-1' +
          game_2pwd +
          '.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg2-2' +
          game_2pwd +
          '.gif',
      ],
      id: 'game_2',
      pwd: game_2pwd,
    },

    {
      game_num: 'Game #3',
      name: 'MOVING IN',
      round: 5,
      player: '-',
      imageUrl: [
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg3-1' +
          game_3pwd +
          '.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg3-2' +
          game_3pwd +
          '.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg3-3' +
          game_3pwd +
          '.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg3-4' +
          game_3pwd +
          '.gif',
      ],
      id: 'game_3',
      pwd: game_3pwd,
    },
  ];

  const handleSubmit = () => {
    let pwd = inputValue;
    if (pwd !== String(gameType[selected].pwd)) {
      setError(true);
    } else {
      setError(false);
      setPassword(pwd);
      localStorage.setItem(gameType[selected].id, pwd);
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    setError(false);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <VStack spacing="0" minHeight="60em">
      {/* <Container
          position="start"
          fontWeight="900"
          bgColor="rgba(134, 185, 197, 1)"
          fontSize={{ base: '6vw', sm: '4vw' }}
          textColor="white"
          marginY="0"
          borderTopRadius={7}
          display="flex"
        >
          HG-2022
          <Image
            marginLeft="auto"
            w={{ base: '13vw', sm: '7.5vw' }}
            minW={{ base: '13vw', sm: '7.5vw' }}
            src={process.env.PUBLIC_URL + '/images/ripple.svg'}
            alt="Logo of HMCC"
          />
        </Container> */}
      {/* <Container
          bgColor="rgba(227, 224, 224, 1)"
          textAlign="center"
          textColor="rgba(83, 83, 83, 1)"
          minW="100%"
          fontWeight="500"
          fontSize={{ base: '5vw', sm: '3vw' }}
        >
          Game Manual
        </Container> */}
      <HStack w="100%">
        <Box w="10%">
          <Image
            src={`${process.env.PUBLIC_URL}/images/harvest-games/white-dot.png`}
            objectFit="cover"
            position="center"
            width={{ base: '70%', sm: '35%', md: '30%', lg: '30%', xl: '25%' }}
            marginX="auto"
          />
        </Box>
        <Box display="flex" justifyContent="center" paddingY="2em" w="100%">
          <Select
            borderWidth="3px"
            w={{ base: '90%', sm: '100%' }}
            h="3em"
            borderRadius="15"
            borderColor="#6F75CC"
            textColor="rgba(71, 108, 147, 1)"
            value={selected}
            onChange={(e) => handleChange(e)}
          >
            {gameType &&
              gameType.map((e, i) => {
                return (
                  <option value={i} key={i}>
                    {e.game_num}
                  </option>
                );
              })}
          </Select>
        </Box>
      </HStack>
      {gameType[selected].pwd ===
      localStorage.getItem(gameType[selected].id) ? (
        <Box w="90%">
          <Heading size="xl" textColor="rgba(1, 43, 85, 1)">
            {gameType[selected].game_num}
          </Heading>
          <Heading
            fontSize={{ base: '4vw', md: '2vw' }}
            textColor="rgba(1, 43, 85, 1)"
          >
            {gameType[selected].name}
          </Heading>
          <HStack
            justifyContent={'space-evenly'}
            paddingY="5"
            w="100%"
            display="flex"
          >
            <Box
              borderColor="rgba(8, 86, 131, 1)"
              borderWidth="7px"
              borderRadius="10px"
              fontWeight={500}
              textColor="rgba(151, 149, 149, 1)"
              fontSize="2vw"
              w="35%"
              h={{ base: '15em', sm: '11em', md: '10em', lg: '7em' }}
              marginX="0"
              textAlign="center"
              paddingY={{ base: '2', md: '5', lg: '4' }}
            >
              <Heading
                textColor="rgba(1, 43, 85, 1)"
                fontWeight={500}
                fontSize={{ base: '4xl', md: '5xl' }}
                paddingBottom="1vw"
              >
                {gameType[selected].round}
              </Heading>
              <Heading
                fontSize={{ base: 'sm', md: '2xl' }}
                textColor="rgba(61, 61, 61, 1)"
              >
                Rounds
              </Heading>
            </Box>
            <Box
              borderColor="rgba(8, 86, 131, 1)"
              borderWidth="7px"
              borderRadius="10px"
              fontWeight={500}
              textColor="rgba(151, 149, 149, 1)"
              fontSize="2vw"
              w="35%"
              h={{ base: '15em', sm: '11em', md: '10em', lg: '7em' }}
              marginX="0"
              textAlign="center"
              paddingY={{ base: '2', md: '5', lg: '4' }}
            >
              <Heading
                textColor="rgba(1, 43, 85, 1)"
                fontWeight={500}
                fontSize={{ base: '4xl', md: '5xl' }}
                paddingBottom="1vw"
              >
                {gameType[selected].player}
              </Heading>
              <Heading
                fontSize={{ base: 'sm', md: '2xl' }}
                textColor="rgba(61, 61, 61, 1)"
              >
                Player
              </Heading>
              <Heading fontSize={{ base: '2vw', md: '1.5vw' }}>
                Min player required
              </Heading>
            </Box>
          </HStack>
          <VStack alignItems="start" marginX="0" w="100%" paddingBottom="10">
            <Heading paddingX="2">Instructions :</Heading>
            <Grid
              w="100%"
              mt="12"
              mb="12"
              templateColumns="repeat(1, 1fr)"
              gap="2"
            >
              {gameType[selected].imageUrl.length > 0 &&
                gameType[selected].imageUrl.map((url, i) => (
                  <Box
                    minH={{ base: '60vh', md: '80vh' }}
                    w="full"
                    fontWeight="700"
                    fontSize={{ base: '60', md: '70' }}
                    textColor="rgba(1, 43, 85, 1)"
                    bgImage={url}
                    bgSize="contain"
                    bgRepeat="no-repeat"
                    bgPos="center"
                    marginX="auto"
                    textAlign="end"
                    paddingBottom="8"
                  >
                    {i + 1}
                  </Box>
                ))}
            </Grid>
          </VStack>
        </Box>
      ) : (
        <HStack w="100%">
          <Box w="10%">
            <Image
              src={`${process.env.PUBLIC_URL}/images/harvest-games/blue-dot.png`}
              objectFit="cover"
              position="center"
              width={{
                base: '70%',
                sm: '35%',
                md: '30%',
                lg: '30%',
                xl: '25%',
              }}
              marginX="auto"
            />
          </Box>
          <VStack
            display="flex"
            w={{ base: '90%', sm: '60%' }}
            fontSize={{ md: '16', lg: '18' }}
            fontWeight="500"
            textColor="rgba(83, 83, 83, 1)"
            alignItems={{ base: 'center', sm: 'start' }}
            textAlign={{ base: 'center', sm: 'start' }}
            paddingX="5"
            paddingBottom="10"
            spacing="4"
          >
            <label>
              Please enter the password for {gameType[selected].game_num}{' '}
              instructions
            </label>
            <Input
              id="inputted"
              type="text"
              placeholder="Start typing here"
              w={{ base: '80%', sm: '100%' }}
              backgroundColor="white"
              borderWidth="1px"
              borderColor="gray/300"
              value={inputValue}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              bgColor="#6F75CC"
              textColor="white"
              fontSize="smaller"
              w={{ base: '100%', sm: 'fit-content' }}
            >
              Submit
            </Button>

            <Text
              display={error ? 'flex' : 'none'}
              textColor="rgba(198, 66, 66, 1)"
              textAlign={{ base: 'center', md: 'start' }}
            >
              Password is incorrect!
            </Text>
          </VStack>
        </HStack>
      )}
    </VStack>
  );
}
