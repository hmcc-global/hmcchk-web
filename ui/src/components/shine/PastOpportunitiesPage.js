import { useState } from 'react';
import {
  Box,
  Container,
  Fade,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  keyframes,
  Text,
  VStack,
} from '@chakra-ui/react';

const opportunities = [
  {
    title: 'Tai Po Healthcare Outreach',
    date: 'Sunday, Jan 18, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.jpg',
        alt: 'Tai Po Healthcare Outreach highlight',
      },
      {
        src: '/images/shine/placeholder-2.jpg',
        alt: 'Tai Po Healthcare Outreach team',
      },
      {
        src: '/images/shine/placeholder-3.jpg',
        alt: 'Tai Po Healthcare Outreach service moment',
      },
      {
        src: '/images/shine/placeholder-4.jpg',
        alt: 'Tai Po Healthcare Outreach activity',
      },
      {
        src: '/images/shine/placeholder-5.jpg',
        alt: 'Tai Po Healthcare Outreach volunteers',
      },
    ],
  },
  {
    title: "Mother's Choice Family Fun Fest",
    date: 'Sunday, Jan 25, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.jpg',
        alt: "Mother's Choice Family Fun Fest highlight",
      },
      {
        src: '/images/shine/placeholder-2.jpg',
        alt: "Mother's Choice Family Fun Fest gathering",
      },
      {
        src: '/images/shine/placeholder-3.jpg',
        alt: "Mother's Choice Family Fun Fest activity",
      },
      {
        src: '/images/shine/placeholder-4.jpg',
        alt: "Mother's Choice Family Fun Fest volunteers",
      },
      {
        src: '/images/shine/placeholder-5.jpg',
        alt: "Mother's Choice Family Fun Fest support",
      },
    ],
  },
  {
    title: 'English Academy Tutoring',
    date: 'Jan-Mar, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.jpg',
        alt: 'English Academy Tutoring session',
      },
      {
        src: '/images/shine/placeholder-2.jpg',
        alt: 'English Academy Tutoring classroom',
      },
      {
        src: '/images/shine/placeholder-3.jpg',
        alt: 'English Academy Tutoring volunteers',
      },
      {
        src: '/images/shine/placeholder-4.jpg',
        alt: 'English Academy Tutoring mentorship',
      },
      {
        src: '/images/shine/placeholder-5.jpg',
        alt: 'English Academy Tutoring support',
      },
    ],
  },
  {
    title: 'Mei Foo Healthcare Outreach',
    date: 'Sunday, Feb 28, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.jpg',
        alt: 'Mei Foo Healthcare Outreach highlight',
      },
      {
        src: '/images/shine/placeholder-2.jpg',
        alt: 'Mei Foo Healthcare Outreach clinic',
      },
      {
        src: '/images/shine/placeholder-3.jpg',
        alt: 'Mei Foo Healthcare Outreach care moment',
      },
      {
        src: '/images/shine/placeholder-4.jpg',
        alt: 'Mei Foo Healthcare Outreach volunteers',
      },
      {
        src: '/images/shine/placeholder-5.jpg',
        alt: 'Mei Foo Healthcare Outreach support',
      },
    ],
  },
];

const rollIn = keyframes`
  0% {
    opacity: 0.35;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PastOpportunitiesPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOpportunity = opportunities[selectedIndex];

  return (
    <Container maxW="container.xl">
      <VStack
        alignItems="start"
        justifyContent="space-between"
        h="90%"
        m={{ base: '1', md: '3' }}
        gap={{ base: '3', md: 'none' }}
      >
        <Box w="100%" py={{ base: 8, md: 12 }}>
          <Heading as="h2" size="xl" mb={2}>
            Past Opportunities
          </Heading>
          <Text color="gray.600" mb={{ base: 6, md: 8 }}>
            We hope to accomplish our mission ...
          </Text>

          <Box bg="#B7E0E2" borderRadius="3xl" p={{ base: 5, md: 8 }}>
            <HStack
              alignItems="stretch"
              spacing={{ base: 6, md: 10 }}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <VStack
                alignItems="start"
                spacing={6}
                w={{ base: '100%', md: '35%' }}
                justifyContent="center"
              >
                {opportunities.map((opportunity, index) => {
                  const isSelected = index === selectedIndex;

                  return (
                    <HStack
                      key={opportunity.title}
                      alignItems="start"
                      spacing={3}
                      cursor="pointer"
                      opacity={isSelected ? 1 : 0.5}
                      transition="opacity 0.2s ease"
                      onClick={() => setSelectedIndex(index)}
                      animation={isSelected ? `${rollIn} 0.35s ease` : 'none'}
                    >
                      <Box
                        mt={1}
                        w="0"
                        h="0"
                        borderTop="7px solid transparent"
                        borderBottom="7px solid transparent"
                        borderLeft="12px solid"
                        borderLeftColor={isSelected ? 'teal.600' : 'transparent'}
                      />
                      <Box>
                        <Text
                          fontWeight={isSelected ? '700' : '500'}
                          color={isSelected ? 'gray.800' : 'gray.500'}
                        >
                          {opportunity.title}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={isSelected ? 'gray.700' : 'gray.400'}
                        >
                          {opportunity.date}
                        </Text>
                      </Box>
                    </HStack>
                  );
                })}
              </VStack>

              <Box w={{ base: '100%', md: '65%' }}>
                <Fade in key={selectedOpportunity.title}>
                  <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                    templateRows={{
                      base: 'repeat(5, 160px)',
                      md: 'repeat(2, 160px)',
                    }}
                    gap={4}
                  >
                    <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={1}>
                      <Image
                        src={selectedOpportunity.images[0].src}
                        alt={selectedOpportunity.images[0].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Image
                        src={selectedOpportunity.images[1].src}
                        alt={selectedOpportunity.images[1].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Image
                        src={selectedOpportunity.images[2].src}
                        alt={selectedOpportunity.images[2].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <Image
                        src={selectedOpportunity.images[3].src}
                        alt={selectedOpportunity.images[3].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Image
                        src={selectedOpportunity.images[4].src}
                        alt={selectedOpportunity.images[4].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </GridItem>
                  </Grid>
                </Fade>
              </Box>
            </HStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default PastOpportunitiesPage;
