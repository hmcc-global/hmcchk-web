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
      bgImage="url('/images/harvest-games/harvestgames_bg.jpg')"
      bgSize={{ base: 'cover', sm: 'cover', md: '300%', lg: '100%' }}
      bgPosition="center"
      py={containerPaddingY}
    >
      
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
              w={{ base: '21.875rem', sm: '22.5rem', md: '38.75rem', lg: '64.5625rem' }}
            />

            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2 }}
              gap={{ base: 4, sm: 5, md: 8 }}
              transform={{
                base: 'translateY(-2rem)',
                sm: 'translateY(-3rem)',
                md: 'translateY(-6.25rem)', 
                lg: 'translateY(-11.25rem)',
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
                  maxW={{ base: '100%', sm: '20rem', md: '22.875rem' }}
                  h={{ base: 'auto', sm: '17.5rem', md: '20.125rem' }}
                  bg="rgba(0, 0, 0, 0.55)"
                  borderRadius="2xl"
                  border="0.0625rem solid rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(0.5rem)"
                  transition="all 0.3s ease"
                  cursor="pointer"
                  onClick={() => setActiveView(card.id)}
                  _hover={{
                    transform: 'translateY(-0.375rem)',
                    borderRadius: '1.25rem',
                    border: '0.0625rem solid #474747',
                    bg: 'rgba(0, 0, 0, 0.5)',
                    boxShadow:
                      '0 0.1875rem 1.1875rem -6.4375rem rgba(74, 74, 74, 0.20), -0.1875rem -0.0625rem 1.25rem 0 #FFF, 0.3125rem 0.25rem 1.25rem 0 #FFF',
                  }}
                  _focus={{
                    boxShadow: '0 0 0 0.125rem rgba(255, 215, 142, 0.6)',
                    outline: 'none',
                  }}
                  _active={{
                    transform: 'translateY(-0.125rem)',
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    w="4.5rem"
                    h="4.5rem"
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
                    fontSize={{ base: '1.0625rem', sm: '2xl', lg: '1.875rem' }}
                    textTransform="uppercase"
                    letterSpacing={{ base: '0.031875rem', sm: '0.2em', md: '0.2em', lg: '0.05625rem' }}
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
              fontSize={{ base: '1.625rem', sm: '3rem', md: '3.68125rem' }}
              lineHeight={{ base: '1.625rem', sm: '5.125rem', md: '5.884375rem' }}
              letterSpacing={{ base: '0.1125rem', sm: '0.2578125rem', md: '0.2578125rem' }}
              textTransform="uppercase"
              textShadow="0 0 0.28125rem #FFF769"
              sx={{
                display: 'inline-block',
                backgroundImage:
                  'linear-gradient(90deg, #EBC300 0%, #F8CC30 29.81%, #FFF2B2 47.6%, #DFBC15 100%)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              transform={{
                base: 'translateY(-0.625rem)',
                sm: 'translateY(-1.25rem)',
                md: 'translateY(-3.75rem)', 
                lg: 'translateY(-8.75rem)'
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
