import {
  Box,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { RiGamepadLine, RiFlagLine } from 'react-icons/ri';
import HarvestGamesInstructions from './HarvestGamesInstructions';
import HarvestGamesLeaderboard from './HarvestGamesLeaderboard';

const HarvestGamesContainer = () => {
  const cards = useMemo(
    () => [
      {
        id: 'leaderboard',
        title: 'Leaderboard',
        icon: RiFlagLine,
      },
      {
        id: 'instructions',
        title: 'Game Instructions',
        icon: RiGamepadLine,
      },
    ],
    []
  );

  const [activeView, setActiveView] = useState(null);

  const activeContent =
    activeView === 'leaderboard' ? (
      <HarvestGamesLeaderboard onBack={() => setActiveView(null)} />
    ) : activeView === 'instructions' ? (
      <HarvestGamesInstructions onBack={() => setActiveView(null)} />
    ) : null;

  const containerPaddingY = activeContent ? { base: 6, md: 10 } : { base: 10, md: 16 };

  return (
    <Flex
      position="relative"
      minH="calc(100vh - 13vh)"
      align="center"
      justify="center"
      color="white"
      overflow="hidden"
      bg="black"
      py={containerPaddingY}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/images/harvest-games/harvestgames_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundImage="url('/images/harvest-games/harvestgames_bg_shadow.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        pointerEvents="none"
      />

      {activeContent ? (
        <Box position="relative" zIndex={1} w="full" px={{ base: 4, md: 8 }}>
          {activeContent}
        </Box>
      ) : (
        <Flex
          position="relative"
          zIndex={1}
          maxW="960px"
          w="full"
          px={{ base: 6, md: 10 }}
        >
          <VStack
            spacing={{ base: 3, md: 4 }}
            w="full"
            fontFamily="'CodeBold'"
            align="center"
            transform={{ base: 'translateY(-48px)', md: 'translateY(-60px)' }}
          >
            <Image
              src="/images/harvest-games/harvestgames_title.png"
              alt="Harvest Games title graphic"
              mx="auto"
              w={{ base: '280px', sm: '360px', md: '620px', lg: '760px' }}
            />

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 4, md: 6 }}
              w="full"
              transform={{ base: 'translateY(-48px)', md: 'translateY(-120px)' }}
            >
              {cards.map((card) => (
                <VStack
                  key={card.id}
                  as="button"
                  type="button"
                  role="group"
                  spacing={4}
                  align="center"
                  justify="center"
                  p={{ base: 8, md: 14 }}
                  w={{ base: '100%', md: '366px' }}
                  h={{ base: 'auto', md: '322px' }}
                  bg="rgba(0, 0, 0, 0.55)"
                  borderRadius="2xl"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(8px)"
                  transition="all 0.3s ease"
                  cursor="pointer"
                  onClick={() => setActiveView(card.id)}
                  _hover={{
                    transform: 'translateY(-6px)',
                    borderRadius: '20px',
                    border: '1px solid #474747',
                    bg: 'rgba(0, 0, 0, 0.5)',
                    boxShadow:
                      '0 3px 19px -103px rgba(74, 74, 74, 0.20), -3px -1px 20px 0 #FFF, 5px 4px 20px 0 #FFF',
                  }}
                  _focus={{
                    boxShadow: '0 0 0 2px rgba(255, 215, 142, 0.6)',
                    outline: 'none',
                  }}
                  _active={{
                    transform: 'translateY(-2px)',
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    w="72px"
                    h="72px"
                    transition="all 0.3s ease"
                  >
                    <Icon as={card.icon} fontSize="2.25rem" color="white" />
                  </Flex>
                  <Text
                    fontFamily="'CodeBold'"
                    fontSize="2xl"
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                    align="center"
                  >
                    {card.title}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>

            <Text
              textAlign="center"
              fontFamily="'CodeBold'"
              fontWeight="700"
              fontSize="58.929px"
              lineHeight="94.149px"
              letterSpacing="4.125px"
              textTransform="uppercase"
              textShadow="0 0 4.5px #FFF769"
              bgGradient="linear(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)"
              bgClip="text"
              color="transparent"
              sx={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              transform={{ base: 'translateY(-48px)', md: 'translateY(-100px)' }}
            >
              Harvest Games 2025
            </Text>
          </VStack>
        </Flex>
      )}
    </Flex>
  );
};

export default HarvestGamesContainer;
