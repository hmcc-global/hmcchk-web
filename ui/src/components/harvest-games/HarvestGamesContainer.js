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

  const containerPaddingY = activeContent
    ? { base: 6, sm: 8, md: 10 }
    : { base: 10, sm: 12, md: 16 };

  return (
    <Flex
      position="relative"
      minH="calc(100vh - 13vh)"
      align={{ base: 'flex-start',sm: 'center', md: 'center', lg: 'center' }}
      justify="center"
      color="white"
      overflow="hidden"
      bgImage="url('/images/harvest-games/harvestgames_bg.png')"
      bgSize={{ base: 'fill', sm: '200%', md: '300%', lg: '100%' }}
      bgPosition="center"
      py={containerPaddingY}
    >
      <Box
        position="absolute"
        inset={0}
        bgImage="url('/images/harvest-games/harvestgames_bg_shadow.png')"
        bgSize={{ base: 'auto', md: 'cover', lg: '100%' }}
        bgPosition="center"
        pointerEvents="none"
        zIndex={1}
      />

      {activeContent ? (
        <Box position="relative" zIndex={2} w="full" px={{ base: 3, sm: 6, md: 8 }}>
          {activeContent}
        </Box>
      ) : (
        <Flex
          position="relative"
          zIndex={2}
          maxW="960px"
        >
          <VStack
            spacing={{ base: 3, sm: 4, md: 5, lg: 0 }}
            fontFamily="'CodeBold'"
            align="center"
            transform={{
              base: 'translateY(-32px)',
              sm: 'translateY(-48px)',
              md: 'translateY(-60px)',
              lg: 'translateY(-50px)',
            }}
          >
            <Image
              src="/images/harvest-games/harvestgames_title.png"
              alt="Harvest Games title graphic"
              w={{ base: '350px', sm: '360px', md: '620px', lg: '1033px' }}
            />

            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2 }}
              gap={{ base: 4, sm: 5, md: 8 }}
              transform={{
                base: 'translateY(-32px)',
                sm: 'translateY(-48px)',
                md: 'translateY(-100px)', 
                lg: 'translateY(-180px)',
              }}
            >
              {cards.map((card) => (
                <VStack
                  key={card.id}
                  as="button"
                  type="button"
                  role="group"
                  spacing={{ base: 0, sm: 4, lg: 0 }}
                  align="center"
                  justify="center"
                  p={{ base: 6, sm: 8, md: 14 }}
                  w="full"
                  maxW={{ base: '100%', sm: '320px', md: '366px' }}
                  h={{ base: 'auto', sm: '280px', md: '322px' }}
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
                    <Icon
                      as={card.icon}
                      fontSize={{ base: '1.75rem', sm: '2rem', md: '2.25rem' }}
                      color="white"
                    />
                  </Flex>
                  <Text
                    fontFamily="'CodeBold'"
                    fontSize={{ base: '17px', sm: '2xl', lg: '30px' }}
                    textTransform="uppercase"
                    letterSpacing={{ base: '0.51px', sm: '0.2em', md: '0.2em', lg: '0.9px' }}
                    fontWeight={{ base: '400', sm: '700', md: '700', lg: '700' }}
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
              fontSize={{ base: '26px', sm: '48px', md: '58.9px' }}
              lineHeight={{ base: '26px', sm: '82px', md: '94.149px' }}
              letterSpacing="4.125px"
              textTransform="uppercase"
              textShadow="0 0 4.5px #FFF769"
              bgGradient="linear(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)"
              bgClip="text"
              color="transparent"
              transform={{
                base: 'translateY(-10px)',
                sm: 'translateY(-20px)',
                md: 'translateY(-60px)', 
                lg: 'translateY(-140px)'
              }}
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
