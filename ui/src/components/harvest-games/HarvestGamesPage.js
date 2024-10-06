import {
  Box,
  Container,
  Image,
  Text,
  HStack,
  VStack,
  Button,
  Icon,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import HarvestGamesLeaderboard from './HarvestGamesLeaderboard';
import HarvestGameInstructions from './HarvestGameInstructions';
import { MdEmojiFlags, MdSportsEsports, MdArrowBack } from 'react-icons/md';

const HarvestGames = (props) => {
  const [page, setPage] = useState('homepage');

  const buttonDirection = () => {
    return (
      <HStack
        h={{ base: '40vh', sm: '40vh', md: '65vh', lg: '75vh' }}
        w="100%"
        justifyContent="space-around"
        alignItems={{ base: 'flex-start', sm: 'flex-end', md: 'center' }}
        paddingY={{ base: '5', sm: '4', md: '10' }}
        marginBottom={{ sm: '10' }}
      >
        <Button
          flexDirection="column"
          borderRadius="5%"
          border="1px solid #474747;"
          background="linear-gradient(0deg, #000 0%, #000 100%), #000;"
          _hover="#474747"
          textColor="#E7E7E7"
          h={{ base: '45%', sm: '40%', md: '30%', lg: '40%' }}
          w={{ base: '45%', sm: '35%', md: '25%', lg: '20%' }}
          onClick={() => setPage('leaderboard')}
        >
          <Icon as={MdEmojiFlags} boxSize={8} />
          <Text
            marginTop="3"
            fontFamily="FjallaOne-Regular"
            letterSpacing="0.1em"
            fontSize={{ base: '3.5vw', sm: '3vw', mid: '2.5vh' }}
            fontWeight="medium"
          >
            LEADERBOARD
          </Text>
        </Button>
        <Button
          flexDirection="column"
          borderRadius="5%"
          border="1px solid #474747;"
          background="linear-gradient(0deg, #000 0%, #000 100%), #000;"
          _hover="#474747"
          textColor="#E7E7E7"
          h={{ base: '45%', sm: '40%', md: '30%', lg: '40%' }}
          w={{ base: '45%', sm: '35%', md: '25%', lg: '20%' }}
          onClick={() => setPage('instructions')}
        >
          <Icon as={MdSportsEsports} boxSize={7} />
          <Text
            marginTop="3"
            fontFamily="FjallaOne-Regular"
            letterSpacing="0.1em"
            fontSize={{ base: '3.5vw', sm: '3vw', mid: '2.5vh' }}
            fontWeight="medium"
          >
            GAME <br /> INSTRUCTIONS
          </Text>
        </Button>
      </HStack>
    );
  };

  return (
    <>
      <Container
        bgColor="#000000"
        bgSize="cover"
        backgroundRepeat="no-repeat"
        bgImage={[
          `${process.env.PUBLIC_URL}/images/harvest-games/hg_page_mobile_bg.svg`,
          `${process.env.PUBLIC_URL}/images/harvest-games/hg_page_desktop_bg.svg`,
        ]}
        minW="100%"
        maxH="max-content"
        minH="100vh"
      >
        {page === 'homepage' && (
          <Box paddingTop="10" minH="100vh">
            {/* Desktop */}
            <Container
              display={['none', 'block']}
              maxW="100%"
              bgSize={{ base: '80%', md: '50%', lg: '50%', xl: '40%' }}
              alignContent="center"
              backgroundRepeat="no-repeat"
              bgPos="top"
              bgImage={`${process.env.PUBLIC_URL}/images/harvest-games/hg_page_trophy.svg`}
            >
              {buttonDirection()}
              <Text
                textAlign="center"
                color="#E7E7E7"
                letterSpacing={4}
                fontSize={{ sm: '2vh', md: '3vh' }}
                fontWeight="light"
              >
                HARVEST GAMES 2024
              </Text>
            </Container>
            {/* Mobile */}
            <VStack display={['flex', 'none']}>
              <Image
                src={`${process.env.PUBLIC_URL}/images/harvest-games/hg_page_trophy.svg`}
                alignSelf="center"
                w="70%"
              />
              <Text
                textAlign="center"
                color="#E7E7E7"
                letterSpacing={4}
                fontSize="3vw"
                fontWeight="light"
                marginTop={5}
              >
                HARVEST GAMES 2024
              </Text>
              {buttonDirection()}
            </VStack>
          </Box>
        )}
        {page === 'leaderboard' && (
          <>
            <HStack justifyContent="left" paddingTop={{ base: '5', md: '10' }}>
              <Button
                bgColor="transparent"
                h="1vw"
                w={{ base: '7.5em', md: '14vw' }}
                onClick={() => {
                  setPage('homepage');
                }}
              >
                <Icon
                  as={MdArrowBack}
                  boxSize={{ base: 5, md: 10 }}
                  color="white"
                />
                <Image
                  src={`${process.env.PUBLIC_URL}/images/harvest-games/hg_back.svg`}
                />
              </Button>
            </HStack>
            <HarvestGamesLeaderboard />
          </>
        )}
        {page === 'instructions' && (
          <>
            <HStack justifyContent="left" paddingTop={{ base: '5', md: '10' }}>
              <Button
                bgColor="transparent"
                h="1vw"
                w={{ base: '7.5em', md: '14vw' }}
                onClick={() => {
                  setPage('homepage');
                }}
              >
                <Icon
                  as={MdArrowBack}
                  boxSize={{ base: 5, md: 10 }}
                  color="white"
                />
                <Image
                  src={`${process.env.PUBLIC_URL}/images/harvest-games/hg_back.svg`}
                />
              </Button>
            </HStack>
            <HarvestGameInstructions />
          </>
        )}
      </Container>
    </>
  );
};

export default HarvestGames;
