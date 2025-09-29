import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import './selectOverride.css';
import { customAxios as axios } from '../helpers/customAxios';
import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiGamepadLine,
} from 'react-icons/ri';

const HarvestGamesInstructions = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState('0');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);

  const handleSubmit = async () => {
    if (!selectedGame || !password) {
      setErrorMessage('Please select a game and enter the password.');
      setIsAuthenticated(false);
      setImageLinks([]);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setIsAuthenticated(false);
    setImageLinks([]);

    try {
      const { data } = await axios.get('/api/hgRankings/authenticate', {
        params: {
          gameId: Number(selectedGame),
          password,
        },
      });

      const imageLinkData = data?.imageLinkData ?? [];

      if (Array.isArray(imageLinkData) && imageLinkData.length > 0) {
        setImageLinks(imageLinkData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      const responseMessage = err?.response?.data;
      const isInvalidPassword =
        err?.response?.status === 401 ||
        (typeof responseMessage === 'string' &&
          responseMessage.toLowerCase().includes('invalid password'));

      if (isInvalidPassword) {
        setErrorMessage('Incorrect password, try again!');
      } else {
        setErrorMessage(
          'Unable to verify password right now. Please try again later.'
        );
      }
      setIsAuthenticated(false);
      setImageLinks([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextGame = () => {
    const currentGame = Number(selectedGame);
    if (Number.isNaN(currentGame)) return;

    const nextGameId = currentGame + 1;
    if (nextGameId > 2) return;

    setSelectedGame(String(nextGameId));
    setPassword('');
    setIsAuthenticated(false);
    setErrorMessage('');
    setImageLinks([]);
  };

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
      <Box w="full" maxW="720px">
        <Flex
          align="center"
          gap={{ base: 3, sm: 4 }}
          cursor="pointer"
          color="white"
          onClick={onBack}
          _hover={{ color: '#FFF769' }}
          justify="flex-start"
          wrap="wrap"
          transform={{
            base: 'none',
            sm: 'translateX(-200px)',
            md: 'translateX(-200px)',
            lg: 'translateX(-270px)',
          }}
        >
          <Flex
            w={{ base: '40px', sm: '44px', md: '48px' }}
            h={{ base: '40px', sm: '44px', md: '48px' }}
            borderRadius="full"
            border="1px solid rgba(255, 255, 255, 0.35)"
            bg="rgba(0, 0, 0, 0.55)"
            align="center"
            justify="center"
          >
            <Icon
              as={RiArrowLeftLine}
              fontSize={{ base: 'lg', sm: 'xl', md: 'xl' }}
            />
          </Flex>
          <Image
            src="/images/harvest-games/harvestgames_title.png"
            alt="Harvest Games Title"
            h={{ base: '60px', sm: '70px', md: '90px', lg: '120px' }}
            maxW={{
              base: 'calc(100% - 64px)',
              sm: 'calc(100% - 76px)',
              md: '420px',
              lg: '100%',
            }}
            objectFit="contain"
          />
        </Flex>
      </Box>

      <VStack
        spacing={{ base: 4, sm: 5, md: 6, lg: 8 }}
        w="full"
        maxW="720px"
        transform={{
          base: 'translateY(-10px)',
          sm: 'translateY(-14px)',
          md: 'translateY(-28px)',
          lg: 'translateY(-40px)',
        }}
      >
        <Box
          bg="rgba(0, 0, 0, 0.65)"
          border="1px solid #474747"
          borderRadius="8px"
          px={{ base: 5, sm: 6, md: 8, lg: 8 }}
          py={{ base: 5, sm: 6, md: 7, lg: 4 }}
          color="white"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          w="full"
          textAlign="center"
          boxShadow="0 3px 19px -103px rgba(74, 74, 74, 0.20)"
        >
          <Flex align="center" gap={{ base: 2, sm: 3 }} justify="center">
            <Icon
              as={RiGamepadLine}
              fontSize={{ base: '22px', sm: '28px', md: '36px', lg: '50px' }}
              color="white"
            />
            <Text
              fontSize={{ base: '22px', sm: '28px', md: '36px', lg: '50px' }}
              textTransform="uppercase"
              whiteSpace="nowrap"
              letterSpacing="1.5px"
            >
              Game Instructions
            </Text>
          </Flex>
        </Box>

        <VStack spacing={{ base: 5, md: 6 }} align="stretch">
          <Flex
            align={{ base: 'center', sm: 'center' }}
            gap={{ base: 3, sm: 4 }}
            flexDir={{ base: 'column', sm: 'row' }}
            w="full"
          >
            <Text
              fontSize={{ base: 'sm', sm: 'md', md: '20px' }}
              textTransform="uppercase"
              letterSpacing="0.18em"
              minW={{ base: 'auto', sm: '160px' }}
              flexShrink={0}
              color="#F8CC30"
            >
              Select Game
            </Text>
            <Select
              value={selectedGame}
              onChange={(event) => {
                setSelectedGame(event.target.value);
                setPassword('');
                setIsAuthenticated(false);
                setImageLinks([]);
                setErrorMessage('');
              }}
              bg="#262626"
              border="1px solid rgba(255, 255, 255, 0.2)"
              borderRadius="60px"
              color="white"
              fontFamily="'CodeBold'"
              fontSize={{ base: 'sm', md: 'md', lg: '20px' }}
              fontWeight="700"
              w={{ base: '100%', sm: '340px' }}
              maxW={{ base: '100%', sm: '340px', md: '360px' }}
              flex={{ base: 'none', sm: 1 }}
              h={{ base: '42px', md: '48px' }}
              px={{ base: 4, md: 6 }}
              pr={{ base: 10, md: 12 }}
              className="hg-select"
              icon={<Icon as={RiArrowDownSLine} />}
              iconColor="white"
              iconSize="1.1rem"
              _focus={{
                borderColor: '#FFF769',
                boxShadow: '0 0 0 1px rgba(255, 247, 105, 0.6)',
              }}
              _hover={{ borderColor: '#FFF769' }}
              _expanded={{ borderColor: '#FFF769' }}
            >
              <option value="" disabled>
                Select a game
              </option>
              <option value="0">Game 1</option>
              <option value="1">Game 2</option>
              <option value="2">Game 3</option>
            </Select>
          </Flex>
        </VStack>

        <VStack spacing={{ base: 5, md: 10 }} align="stretch">
          {!isAuthenticated && (
            <>
              <Flex
                direction="column"
                gap={2}
                align={{ base: 'center', sm: 'center', md: 'center' }}
              >
                <Text
                  fontSize={{ base: 'sm', sm: 'md', md: '20px' }}
                  textTransform="uppercase"
                  letterSpacing="0.14em"
                  textAlign={{ base: 'center', sm: 'center' }}
                >
                  Enter password for game instructions
                </Text>
                <Input
                  type="text"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  bg="rgba(0, 0, 0, 0.45)"
                  border="1px solid #262626"
                  color="white"
                  fontFamily="'CodeBold'"
                  fontSize={{ base: 'sm', md: 'md' }}
                  maxW={{ base: '240px', sm: '260px', md: '280px' }}
                  _placeholder={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  _focus={{
                    borderColor: '#FFF769',
                    boxShadow: '0 0 0 1px #FFF769',
                  }}
                  _hover={{ borderColor: '#FFF769' }}
                />
              </Flex>

              <Button
                alignSelf={{ base: 'center', sm: 'center', md: 'center' }}
                bgGradient="linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)"
                color="black"
                fontFamily="'CodeBold'"
                fontSize={{ base: 'sm', md: 'md' }}
                px={{ base: 10, sm: 12 }}
                py={{ base: 3, sm: 3 }}
                borderRadius="30px"
                _hover={{
                  bgGradient:
                    'linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)',
                }}
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Checking..."
              >
                Submit
              </Button>
            </>
          )}
          {errorMessage ? (
            <Text
              color="red.300"
              fontSize={{ base: 'sm', md: 'md' }}
              textAlign="center"
            >
              {errorMessage}
            </Text>
          ) : null}
          {isAuthenticated && (
            <VStack
              align="center"
              spacing={5}
              mt={2}
              color="white"
              fontSize={{ base: 'sm', md: '20px' }}
              w="full"
            >
              <Text textTransform="uppercase" letterSpacing="0.1em">
                Instructions
              </Text>
              {imageLinks.length > 0 ? (
                imageLinks.map((link, index) => (
                  <Image
                    key={index}
                    src={link}
                    alt={`Instruction ${index + 1}`}
                    borderRadius="12px"
                    w={{ base: '100%', sm: '90%', md: '80%', lg: '650px' }}
                    maxW={{ base: '100%', md: '650px' }}
                    objectFit="contain"
                    objectPosition="center"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 24px -12px rgba(0, 0, 0, 0.45)"
                  />
                ))
              ) : (
                <Text color="rgba(255,255,255,0.7)">
                  Instructions will appear here once available.
                </Text>
              )}
              {Number(selectedGame) < 2 && (
                <Button
                  mt={4}
                  bgGradient="linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)"
                  color="black"
                  fontFamily="'CodeBold'"
                  fontSize={{ base: 'sm', md: 'md' }}
                  px={{ base: 10, sm: 12 }}
                  py={{ base: 3, sm: 3 }}
                  borderRadius="30px"
                  _hover={{
                    bgGradient:
                      'linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)',
                  }}
                  onClick={handleNextGame}
                >
                  Next Game →
                </Button>
              )}
            </VStack>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default HarvestGamesInstructions;
