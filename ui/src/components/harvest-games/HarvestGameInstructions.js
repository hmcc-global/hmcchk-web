import {
  Box,
  Container,
  Select,
  Heading,
  Input,
  Button,
  VStack,
  Image,
  HStack,
  Grid,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { useRef, useState, Fragment } from 'react';

import './styles.css';

export default function HarvestGameInstructions() {
  const ref = useRef(null);
  const gameType = [
    {
      game_num: 'Game #1',
      name: 'SMUGGLING THROUGH SECURITY',
      round: 3,
      player: 5,
      materials: [],
      imageUrl: [
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg1_1.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg1_2.gif',
      ],
      id: 'game_1',
      pwd: 'smuggling',
    },

    {
      game_num: 'Game #2',
      name: 'THE PACKING GAME',
      round: 2,
      player: 2,
      materials: [
        '10 Shirts',
        '6  SweatPants',
        '6  Books',
        '6  Hoodies',
        '9  Socks',
        '6  Shoes',
        '8  Hats',
        '6  Water bottles',
      ],
      imageUrl: [
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg2_1.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg2_2.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg2_3.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg2_4.gif',
      ],
      id: 'game_2',
      pwd: 'packing',
    },

    {
      game_num: 'Game #3',
      name: 'THE AIRPLANE RELAY RACE',
      round: 4,
      player: 5,
      materials: [],
      imageUrl: [
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg3_1.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg3_2.gif',
        'https://hongkong.sub.hmcc.net/wp-content/uploads/hg3_3.gif',
      ],
      id: 'game_3',
      pwd: 'airplane',
    },
  ];

  const [selected, setSelected] = useState(0);
  const [password, setPassword] = useState('');
  const [inputValue, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    let pwd = inputValue.toLowerCase();
    pwd = pwd.replace(/\s+/g, '');
    if (pwd !== gameType[selected].pwd) {
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
    <VStack bgColor="rgba(228, 241, 244, 1)" spacing="0">
      <Container
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
      </Container>
      <Container
        bgColor="rgba(227, 224, 224, 1)"
        textAlign="center"
        textColor="rgba(83, 83, 83, 1)"
        minW="100%"
        fontWeight="500"
        fontSize={{ base: '5vw', sm: '3vw' }}
      >
        Game Manual
      </Container>
      <Box display="flex" justifyContent="center" paddingY="2em" w="100%">
        <Select
          ref={ref}
          borderWidth="2px"
          w="80%"
          h="3em"
          borderRadius="15"
          borderColor="rgba(71, 108, 147, 1)"
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
              borderWidth="4px"
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
                {selected === 0 ? 'Rounds' : 'Sections'}
              </Heading>
            </Box>
            <Box
              display={selected === 0 ? 'block' : 'none'}
              borderColor="rgba(8, 86, 131, 1)"
              borderWidth="4px"
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
            <Box
              display={gameType[selected].id === 'game_2' ? 'block' : 'none '}
              borderColor="rgba(8, 86, 131, 1)"
              borderWidth="7px"
              borderRadius="10px"
              fontWeight={500}
              fontSize={{ base: '5vw', md: '2.5vw' }}
              textColor="rgba(61, 61, 61, 1)"
              w="100%"
              marginX="0"
              marginY="5"
              textAlign="start"
              paddingY="5"
              paddingX="9"
            >
              Materials :
              <VStack justifyContent="space-evenly" alignItems="start">
                {gameType[selected].materials.length > 0 &&
                  gameType[selected].materials.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <Text
                          color="rgba(1, 43, 85, 1)"
                          fontWeight={400}
                          textDecoration="none"
                          fontSize={{ base: '4vw', md: '2vw' }}
                        >
                          {e}
                        </Text>
                      </Fragment>
                    );
                  })}
              </VStack>
            </Box>
            <Heading paddingX="2">Instructions :</Heading>
            <Grid w="100%" mt="12" mb="12" templateColumns="repeat(1, 1fr)">
              {gameType[selected].imageUrl.length > 0 &&
                gameType[selected].imageUrl.map((url, i) => (
                  <Box
                    minH={{ base: '60vh', md: '80vh' }}
                    w="full"
                    fontWeight="700"
                    fontSize={{ base: '60', md: '70' }}
                    textColor="rgba(1, 43, 85, 1)"
                    bgImage={url}
                    bgSize={{ base: 'cover', md: 'contain' }}
                    bgRepeat="no-repeat"
                    bgPos="center"
                    marginX="auto"
                    textAlign="end"
                  ></Box>
                ))}
            </Grid>
          </VStack>
        </Box>
      ) : (
        <VStack
          display="flex"
          w="100%"
          fontSize={{ md: '16', lg: '18' }}
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
            w={{ base: '100%', sm: '50%' }}
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
            bgColor="rgba(83, 157, 196, 1)"
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
      )}
      <Image
        height={{ base: '20vw', md: '9vw', lg: '5vw' }}
        position="sticky"
        bottom="2"
        paddingBottom="7"
        display={
          gameType[selected].pwd === localStorage.getItem(gameType[selected].id)
            ? 'flex'
            : 'none'
        }
        src={process.env.PUBLIC_URL + '/images/harvest-games/ArrowUp.svg'}
        style={{ cursor: 'pointer' }}
        onClick={() =>
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })
        }
      />
    </VStack>
  );
}
