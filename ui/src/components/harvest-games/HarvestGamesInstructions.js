import { Fragment, useRef, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';
import './selectOverride.css';
import { customAxios as axios } from '../helpers/customAxios';
import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiGamepadLine,
} from 'react-icons/ri';
import Cookies from 'js-cookie';

const HarvestGamesInstructions = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState('0');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [gameType, setGameType] = useState(() => {
    // Load gameType from cookies if available
    const savedGameType = Cookies.get('gameType');
    return savedGameType
      ? JSON.parse(savedGameType)
      : [
          { imageLinks: [], isAuthenticated: false },
          { imageLinks: [], isAuthenticated: false },
          { imageLinks: [], isAuthenticated: false },
          { googleLinks: '', isAuthenticated: false },
          { googleLinks: '', isAuthenticated: false },
          { googleLinks: '', isAuthenticated: false },
        ];
  });

  const isInDoor = [true, true, true, false, false, false];

  const topRef = useRef(null);

  useEffect(() => {
    Cookies.set('gameType', JSON.stringify(gameType), { expires: 1 });
  }, [gameType]);

  const gameOptions = [
    { value: '0', label: 'InDoor Game 1' },
    { value: '1', label: 'InDoor Game 2' },
    { value: '2', label: 'InDoor Game 3' },
    { value: '3', label: 'OutDoor Game 1' },
    { value: '4', label: 'OutDoor Game 2' },
    { value: '5', label: 'OutDoor Game 3' },
  ];

  const updateGameImage = (index, newImageUrl, isAuthenticated) => {
    setGameType((prevGameTypes) => {
      const newGameTypes = [...prevGameTypes];
      newGameTypes[index] = {
        ...newGameTypes[index],
        imageLinks: newImageUrl,
        isAuthenticated: isAuthenticated,
      };
      return newGameTypes;
    });
  };

  const updateGameLink = (index, newGoogleLink, isAuthenticated) => {
    setGameType((prevGameTypes) => {
      const newGameTypes = [...prevGameTypes];
      newGameTypes[index] = {
        ...newGameTypes[index],
        googleLinks: newGoogleLink,
        isAuthenticated: isAuthenticated,
      };
      return newGameTypes;
    });
  };

  const handleSubmit = async () => {
    if (!selectedGame || !password) {
      setErrorMessage('Please select a game and enter the password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const { data } = await axios.get('/api/hgRankings/authenticate', {
        params: {
          gameId: Number(selectedGame),
          password,
        },
      });

      if (selectedGame > 2) {
        const googleLinkData = data?.googleLinkData ?? '';
        updateGameLink(Number(selectedGame), googleLinkData, true);
      } else {
        const imageLinkData = data?.imageLinkData ?? [];
        updateGameImage(Number(selectedGame), imageLinkData, true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleNextGame = () => {
    const currentGame = Number(selectedGame);
    if (Number.isNaN(currentGame)) return;

    const nextGameId = currentGame + 1;
    if (nextGameId > 5) return;

    setSelectedGame(String(nextGameId));
    setPassword('');
    setErrorMessage('');

    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  return (
    <VStack
      ref={topRef}
      spacing={{ base: 6, sm: 7, md: 8 }}
      w="full"
      fontFamily="'CodeBold'"
      align="center"
      px={{ base: 3, sm: 4, md: 6, lg: 0 }}
      py={{ base: 4, sm: 6, md: 6, lg: 0 }}
      transform={{
        base: 'translateY(-1rem)',
        sm: 'translateY(-1.125rem)',
        md: 'translateY(-1.5rem)',
        lg: 'translateY(-1.875rem)',
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
            base: '6vw',
            sm: '15vw',
            md: '14vw',
            lg: '-15vw',
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
          textAlign="center"
          boxShadow="0 0.1875rem 1.1875rem -6.4375rem rgba(74, 74, 74, 0.20)"
        >
          <Flex align="center" gap={{ base: 2, sm: 3 }} justify="center">
            <Icon
              as={RiGamepadLine}
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
                base: '1.375rem',
                sm: '1.75rem',
                md: '2.25rem',
                lg: '3.125rem',
              }}
              textTransform="uppercase"
              whiteSpace="nowrap"
              letterSpacing="0.09375rem"
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
              fontSize={{ base: '0.875rem', sm: 'md', md: '1.25rem' }}
              textTransform="uppercase"
              letterSpacing={{
                base: '0.02625rem',
                md: '0.0375rem',
                lg: '0.0375rem',
              }}
              minW={{ base: 'auto', sm: '10rem' }}
              flexShrink={0}
              color="#F8CC30"
            >
              Select Game:
            </Text>
            <Menu isLazy matchWidth gutter={4} placement="bottom-start">
              {({ isOpen }) => (
                <Box w="18.75rem">
                  <MenuButton
                    as={Button}
                    w="full"
                    fontFamily="'CodeBold'"
                    fontWeight="700"
                    fontSize={{ base: '1rem', md: 'md', lg: '1.375rem' }}
                    letterSpacing={{
                      base: '0.03rem',
                      md: '0.0375rem',
                      lg: '0.0375rem',
                    }}
                    color="white"
                    bg="#262626"
                    h={{ base: '2.625rem', md: '3rem', lg: '3.4375rem' }}
                    borderRadius="3.75rem"
                    borderColor={isOpen ? '#FFF769' : '#262626'}
                    px={6}
                    _hover={{ bg: '#262626' }}
                    _active={{ bg: '#262626' }}
                    _focus={{ boxShadow: '0 0 0 0.125rem #FFF769' }}
                    rightIcon={<Icon as={RiArrowDownSLine} />}
                  >
                    {gameOptions.find((opt) => opt.value === selectedGame)
                      ?.label ?? 'Select Game'}
                  </MenuButton>
                  <MenuList
                    mt={2}
                    bg="#262626"
                    borderRadius="1.25rem"
                    py={2}
                    px={0}
                    border="0.0625rem solid #262626"
                    overflow="hidden"
                  >
                    {gameOptions.map((option, index) => (
                      <Fragment key={option.value}>
                        <MenuItem
                          onClick={() => {
                            setSelectedGame(option.value);
                            setPassword('');
                            setErrorMessage('');
                          }}
                          borderRadius="0"
                          fontFamily="'CodeBold'"
                          fontWeight="700"
                          fontSize={{ base: '1rem', md: 'md', lg: '1.375rem' }}
                          letterSpacing={{
                            base: '0.03rem',
                            md: '0.0375rem',
                            lg: '0.0375rem',
                          }}
                          color="white"
                          textAlign="center"
                          justifyContent="center"
                          _hover={{ bg: 'rgba(255, 255, 255, 0.12)' }}
                          _focus={{ bg: 'rgba(255, 255, 255, 0.12)' }}
                          px={6}
                          py={{ base: 2, md: 1 }}
                        >
                          {option.label}
                        </MenuItem>
                        {index < gameOptions.length - 1 && (
                          <MenuDivider
                            borderColor="rgba(255,255,255,0.15)"
                            borderBottomWidth="0.0625rem"
                            mx={6}
                          />
                        )}
                      </Fragment>
                    ))}
                  </MenuList>
                </Box>
              )}
            </Menu>
          </Flex>
        </VStack>

        <VStack spacing={{ base: 5, md: 10 }} align="stretch">
          {!gameType[selectedGame].isAuthenticated && (
            <>
              <Flex
                direction="column"
                gap={2}
                align={{ base: 'center', sm: 'center', md: 'center' }}
              >
                <Text
                  fontSize={{ base: 'sm', sm: 'md', md: '1.25rem' }}
                  textTransform="uppercase"
                  marginTop="1.25rem"
                  letterSpacing="0.0375rem"
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
                  border="0.0625rem solid #474747"
                  backgroundColor="rgba(0, 0, 0, 0.45)"
                  color="white"
                  fontFamily="'CodeBold'"
                  fontSize={{ base: 'sm', md: 'md' }}
                  maxW={{
                    base: '15rem',
                    sm: '16.25rem',
                    md: '17.5rem',
                    lg: '21.25rem',
                  }}
                  textAlign="center"
                  h={{ base: '2.625rem', md: '3.4375rem' }}
                  _placeholder={{
                    color: '#7E7E7E',
                    fontSize: '0.875rem',
                    letterSpacing: '0.02625rem',
                    textAlign: 'center',
                    align: 'center',
                  }}
                  boxShadow="0 0.1875rem 1.1875rem -6.4375rem rgba(74, 74, 74, 0.20)"
                  _focus={{
                    borderColor: '#FFF769',
                    boxShadow: '0 0 0 0.0625rem #FFF769',
                  }}
                  _hover={{ borderColor: '#FFF769' }}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Flex>

              <Button
                alignSelf={{ base: 'center', sm: 'center', md: 'center' }}
                bgGradient="linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)"
                color="black"
                fontFamily="'CodeBold'"
                fontSize={{ base: '1rem', md: 'md', lg: '1.375rem' }}
                letterSpacing={{
                  base: '0.16rem',
                  md: '0.22rem',
                  lg: '0.22rem',
                }}
                px={{ base: 10, sm: 12, lg: 14 }}
                py={{ base: 7, sm: 8, lg: 8 }}
                borderRadius="1.875rem"
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
              color="#F9455B"
              fontSize={{ base: 'sm', md: 'md', lg: '0.875rem' }}
              letterSpacing="0.02625rem"
              fontFamily="'Futura'"
              textAlign="center"
              fontStyle="italic"
            >
              {errorMessage}
            </Text>
          ) : null}
          {/* OutDoor Instructions */}
          {gameType[selectedGame].isAuthenticated && isInDoor[selectedGame] && (
            <VStack
              align="center"
              spacing={5}
              mt={2}
              color="white"
              fontSize={{ base: '0.875rem', md: '1.25rem' }}
              letterSpacing={{
                base: '0.02625rem',
                md: '0.0375rem',
                lg: '0.0375rem',
              }}
              w="full"
            >
              <Text textTransform="uppercase" letterSpacing="0.1em">
                Instructions
              </Text>
              {gameType[selectedGame].imageLinks.map((link, index) => (
                <Image
                  key={index}
                  src={link}
                  alt={`Instruction ${index + 1}`}
                  borderRadius="0.75rem"
                  w={{ base: '100%', sm: '90%', md: '80%', lg: '40.625rem' }}
                  maxW={{ base: '100%', md: '40.625rem' }}
                  objectFit="contain"
                  objectPosition="center"
                  border="0.0625rem solid rgba(255, 255, 255, 0.2)"
                  boxShadow="0 0.5rem 1.5rem -0.75rem rgba(0, 0, 0, 0.45)"
                />
              ))}
              {Number(selectedGame) < 5 && (
                <Button
                  mt={4}
                  bgGradient="linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)"
                  color="black"
                  fontFamily="'CodeBold'"
                  fontSize={{ base: '1rem', md: 'md', lg: '1.375rem' }}
                  letterSpacing={{
                    base: '0.16rem',
                    md: '0.22rem',
                    lg: '0.22rem',
                  }}
                  px={{ base: 10, sm: 12, lg: 14 }}
                  py={{ base: 7, sm: 8, lg: 8 }}
                  borderRadius="1.875rem"
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
          {/* InDoor Instructions */}
          {gameType[selectedGame].isAuthenticated && !isInDoor[selectedGame] && (
            <VStack
              align="center"
              spacing={5}
              mt={2}
              color="white"
              fontSize={{ base: '0.875rem', md: '1.25rem' }}
              letterSpacing={{
                base: '0.02625rem',
                md: '0.0375rem',
                lg: '0.0375rem',
              }}
              w="full"
            >
              <Text
                textTransform="uppercase"
                textAlign="center"
                letterSpacing="0.1em"
              >
                Click The Link Below <br /> For Instructions
              </Text>
              <Link href={gameType[selectedGame].googleLinks} isExternal>
                <Text as="u">Game Instruction Link</Text>
              </Link>

              {Number(selectedGame) < 5 && (
                <Button
                  mt={4}
                  bgGradient="linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)"
                  color="black"
                  fontFamily="'CodeBold'"
                  fontSize={{ base: '1rem', md: 'md', lg: '1.375rem' }}
                  letterSpacing={{
                    base: '0.16rem',
                    md: '0.22rem',
                    lg: '0.22rem',
                  }}
                  px={{ base: 10, sm: 12, lg: 14 }}
                  py={{ base: 7, sm: 8, lg: 8 }}
                  borderRadius="1.875rem"
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
