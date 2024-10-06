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
  Icon,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { useEffect, useState, Fragment } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { MdEmojiFlags, MdSportsEsports, MdArrowBack } from 'react-icons/md';

// import './styles.css';

export default function HarvestGameInstructions() {
  const [selected, setSelected] = useState(0);
  const [game_1pwd, setGame_1pwd] = useState(false);
  const [game_2pwd, setGame_2pwd] = useState(false);
  const [game_3pwd, setGame_3pwd] = useState(false);
  const [inputValue, setInput] = useState('');
  const [error, setError] = useState(false);
  const [gameType, setGameType] = useState([
    {
      game_num: 'Game 1',
      name: 'TIDY-UP',
      imageUrl: [],
      id: 'game_1',
      pwd: game_1pwd,
    },
    {
      game_num: 'Game 2',
      name: 'OFF-ROAD',
      imageUrl: [],
      id: 'game_2',
      pwd: game_2pwd,
    },
    {
      game_num: 'Game 3',
      name: 'MOVING IN',
      imageUrl: [],
      id: 'game_3',
      pwd: game_3pwd,
    },
  ]);

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/hgrankings/get');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    let pwd = inputValue;

    try {
      const { data } = await axios.get('/api/hgrankings/authenticate', {
        params: { gameId: selected, password: pwd },
      });
      // Update imageUrl in the gameType state
      setGameType((prevGameType) => {
        const updatedGameType = [...prevGameType];
        updatedGameType[selected].imageUrl = data.imageLinkData; // Replace the imageUrl
        updatedGameType[selected].pwd = true;
        return updatedGameType;
      });

      setError(false);

      if (selected == 0) {
        setGame_1pwd(pwd);
      } else if (selected == 1) {
        setGame_2pwd(pwd);
      } else if (selected == 2) {
        setGame_3pwd(pwd);
      }
    } catch (err) {
      setError(true);
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

  console.log(gameType[selected].imageUrl);

  return (
    <VStack spacing="0" minHeight="60em">
      <Box
        display="flex"
        borderRadius="8px"
        alignContent="center"
        justifyContent="center"
        width={{ base: '60%', md: '40%' }}
        marginX="auto"
        marginBottom={{ base: '3', md: '7' }}
        border="1px solid #474747;"
        marginTop={{ base: '4' }}
      >
        <Icon
          as={MdSportsEsports}
          boxSize={{ base: 5, md: 10 }}
          color="white"
          marginY="auto"
        />
        <Text
          textColor="white"
          marginY={{ base: '1', md: '4' }}
          paddingLeft={{ base: '2', md: '10' }}
          fontSize={{ base: '4vw', md: '2.5vw' }}
          fontWeight="100"
          fontFamily="FjallaOne-Regular"
        >
          GAME INSTRUCTIONS
        </Text>
      </Box>
      <HStack w="100%">
        <Box w="40%">
          <Text
            textAlign="center"
            color="#E7E7E7"
            letterSpacing={4}
            fontSize={{ sm: '2vh', md: '3vh' }}
            fontWeight="light"
          >
            SELECT GAME:{' '}
          </Text>
        </Box>
        <Box display="flex" justifyContent="center" paddingY="2em" w="40%">
          <Select
            borderWidth="3px"
            w={{ base: '90%', sm: '100%' }}
            h="3em"
            borderRadius="15"
            backgroundColor="#262626"
            borderColor="#262626"
            textAlign="center"
            textColor="white"
            value={selected}
            onChange={(e) => handleChange(e)}
            sx={{
              backgroundColor: '#262626',
              color: 'white',
              '& option': {
                backgroundColor: '#262626',
                color: 'white',
              },
              '&:focus': {
                borderColor: 'white',
              },
            }}
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
      {gameType[selected].pwd ? (
        <Box w="90%">
          {/* <Heading size="xl" textColor="rgba(1, 43, 85, 1)">
            {gameType[selected].game_num}
          </Heading>
          <Heading
            fontSize={{ base: '4vw', md: '2vw' }}
            textColor="rgba(1, 43, 85, 1)"
          >
            {gameType[selected].name}
          </Heading> */}
          {/* <HStack
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
          </HStack> */}
          <VStack alignItems="center" marginX="0" w="100%" paddingBottom="10">
            <Heading
              paddingX="2"
              textColor="white"
              fontSize={{ base: '5vw', md: '3vw', lg: '2.5vw' }}
              fontWeight="light"
            >
              Instructions :
            </Heading>
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
                    textColor="white"
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
        <HStack w="100%" justifyContent="center">
          <VStack
            display="flex"
            w={{ base: '90%', sm: '60%' }}
            fontSize={{ md: '16', lg: '18' }}
            fontWeight="500"
            textColor="white"
            alignItems="center"
            textAlign="center"
            paddingX="5"
            paddingBottom="10"
            spacing="4"
          >
            <label>
              ENTER PASSWORD FOR {gameType[selected].game_num} INSTRUCTIONS
            </label>
            <Input
              id="inputted"
              type="text"
              placeholder="Enter Password"
              sx={{ '::placeholder': { color: '#7E7E7E' } }}
              textAlign="center"
              textColor="#7E7E7E"
              w={{ base: '80%', sm: '60%' }}
              paddingY="7"
              backgroundColor="#000000"
              borderWidth="1px"
              borderColor="#474747"
              value={inputValue}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              bgColor="#60100B"
              textColor="white"
              fontSize="smaller"
              borderRadius="full"
              w={{ base: '100%', sm: 'fit-content' }}
            >
              Submit
            </Button>

            <Text
              display={error ? 'flex' : 'none'}
              textColor="#E7D991"
              textAlign="center"
            >
              Incorrect password. try again!
            </Text>
          </VStack>
        </HStack>
      )}
    </VStack>
  );
}
