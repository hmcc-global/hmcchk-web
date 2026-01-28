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
  Text,
  VStack,
} from '@chakra-ui/react';

const opportunities = [
  {
    title: 'Tai Po Healthcare Outreach',
    date: 'Sunday, Jan 18, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.svg',
        alt: 'Tai Po Healthcare Outreach highlight',
      },
      {
        src: '/images/shine/placeholder-2.svg',
        alt: 'Tai Po Healthcare Outreach team',
      },
      {
        src: '/images/shine/placeholder-3.svg',
        alt: 'Tai Po Healthcare Outreach service moment',
      },
      {
        src: '/images/shine/placeholder-4.svg',
        alt: 'Tai Po Healthcare Outreach activity',
      },
      {
        src: '/images/shine/placeholder-5.svg',
        alt: 'Tai Po Healthcare Outreach volunteers',
      },
    ],
  },
  {
    title: "Mother's Choice Family Fun Fest",
    date: 'Sunday, Jan 25, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.svg',
        alt: "Mother's Choice Family Fun Fest highlight",
      },
      {
        src: '/images/shine/placeholder-2.svg',
        alt: "Mother's Choice Family Fun Fest gathering",
      },
      {
        src: '/images/shine/placeholder-3.svg',
        alt: "Mother's Choice Family Fun Fest activity",
      },
      {
        src: '/images/shine/placeholder-4.svg',
        alt: "Mother's Choice Family Fun Fest volunteers",
      },
      {
        src: '/images/shine/placeholder-5.svg',
        alt: "Mother's Choice Family Fun Fest support",
      },
    ],
  },
  {
    title: 'English Academy Tutoring',
    date: 'Jan-Mar, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.svg',
        alt: 'English Academy Tutoring session',
      },
      {
        src: '/images/shine/placeholder-2.svg',
        alt: 'English Academy Tutoring classroom',
      },
      {
        src: '/images/shine/placeholder-3.svg',
        alt: 'English Academy Tutoring volunteers',
      },
      {
        src: '/images/shine/placeholder-4.svg',
        alt: 'English Academy Tutoring mentorship',
      },
      {
        src: '/images/shine/placeholder-5.svg',
        alt: 'English Academy Tutoring support',
      },
    ],
  },
  {
    title: 'Mei Foo Healthcare Outreach',
    date: 'Sunday, Feb 28, 2026',
    images: [
      {
        src: '/images/shine/placeholder-1.svg',
        alt: 'Mei Foo Healthcare Outreach highlight',
      },
      {
        src: '/images/shine/placeholder-2.svg',
        alt: 'Mei Foo Healthcare Outreach clinic',
      },
      {
        src: '/images/shine/placeholder-3.svg',
        alt: 'Mei Foo Healthcare Outreach care moment',
      },
      {
        src: '/images/shine/placeholder-4.svg',
        alt: 'Mei Foo Healthcare Outreach volunteers',
      },
      {
        src: '/images/shine/placeholder-5.svg',
        alt: 'Mei Foo Healthcare Outreach support',
      },
    ],
  },
];

const PastOpportunitiesPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOpportunity = opportunities[selectedIndex];
  const itemHeight = 56;
  const itemGap = 12;
  const visibleCount = 4;
  const step = itemHeight + itemGap;
  const listHeight = visibleCount * itemHeight + (visibleCount - 1) * itemGap;
  const translateY =
    listHeight / 2 - itemHeight / 2 - selectedIndex * step;

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
                <HStack alignItems="center" spacing={3} w="100%">
                  <Box
                    w="0"
                    h="0"
                    borderTop="7px solid transparent"
                    borderBottom="7px solid transparent"
                    borderLeft="12px solid"
                    borderLeftColor="teal.600"
                    flexShrink={0}
                  />
                  <Box
                    w="100%"
                    h={{ base: 'auto', md: `${listHeight}px` }}
                    overflow={{ base: 'visible', md: 'hidden' }}
                  >
                    <VStack
                      alignItems="start"
                      spacing={`${itemGap}px`}
                      transform={{
                        base: 'none',
                        md: `translateY(${translateY}px)`,
                      }}
                      transition="transform 0.35s ease"
                    >
                      {opportunities.map((opportunity, index) => {
                        const isSelected = index === selectedIndex;

                        return (
                          <Box
                            key={opportunity.title}
                            cursor="pointer"
                            opacity={isSelected ? 1 : 0.5}
                            onClick={() => setSelectedIndex(index)}
                            minH={`${itemHeight}px`}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                          >
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
                        );
                      })}
                    </VStack>
                  </Box>
                </HStack>
              </VStack>

              <Box w={{ base: '100%', md: '65%' }}>
                <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                  templateRows={{ base: 'repeat(5, 160px)', md: 'repeat(2, 170px)' }}
                  templateAreas={{
                    base: `"feature" "rightTop" "bottomLeft" "bottomMid" "rightBottom"`,
                    md: `"feature feature rightTop" "bottomLeft bottomMid rightBottom"`,
                  }}
                  gap={4}
                >
                  <GridItem area="feature">
                    <Fade in key={`${selectedOpportunity.title}-0`}>
                      <Image
                        src={selectedOpportunity.images[0].src}
                        alt={selectedOpportunity.images[0].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </Fade>
                  </GridItem>
                  <GridItem area="rightTop">
                    <Fade in key={`${selectedOpportunity.title}-1`}>
                      <Image
                        src={selectedOpportunity.images[1].src}
                        alt={selectedOpportunity.images[1].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </Fade>
                  </GridItem>
                  <GridItem area="bottomLeft">
                    <Fade in key={`${selectedOpportunity.title}-2`}>
                      <Image
                        src={selectedOpportunity.images[2].src}
                        alt={selectedOpportunity.images[2].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </Fade>
                  </GridItem>
                  <GridItem area="bottomMid">
                    <Fade in key={`${selectedOpportunity.title}-3`}>
                      <Image
                        src={selectedOpportunity.images[3].src}
                        alt={selectedOpportunity.images[3].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </Fade>
                  </GridItem>
                  <GridItem area="rightBottom">
                    <Fade in key={`${selectedOpportunity.title}-4`}>
                      <Image
                        src={selectedOpportunity.images[4].src}
                        alt={selectedOpportunity.images[4].alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                    </Fade>
                  </GridItem>
                </Grid>
              </Box>
            </HStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default PastOpportunitiesPage;
