import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
} from '@chakra-ui/react';
import StaffMember from './StaffMember';

const LANDSCAPE_RATIO = 3484 / 2853;

const TierHeading = ({ children, id }) => (
  <Heading
    as="h3"
    fontSize={['2xl', '3xl', '4xl']}
    fontFamily="DMSerifDisplay_Italic"
    fontWeight={700}
    lineHeight={1}
    textAlign="left"
    color="#0628A3"
    w="full"
    mb={[3, 5]}
    mt={[6, 10]}
    id={id}
  >
    {children}
  </Heading>
);

const TwoColumnGrid = ({ children }) => (
  <Grid templateColumns="repeat(2, 1fr)" gap={[2, 6, 8]}>
    {children}
  </Grid>
);

const StaffSection = ({ title, blurb }) => {
  const { pastor, executiveDirector, ministryDirectors, executiveTeam } = blurb;

  const sortedExecTeam = [...(executiveTeam || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Flex direction="column" w="full">
      <Center padding="5">
        <Heading
          as="h2"
          fontSize={['4xl', '6xl']}
          fontFamily="DMSerifDisplay"
          fontWeight={700}
          lineHeight={1}
          textAlign="center"
          color="#0628A3"
          mb={5}
          id="staff"
        >
          {title}
        </Heading>
      </Center>

      <VStack w="full" spacing={[4, 8]}>
        {(pastor || executiveDirector) && (
          <Box w="full">
            <TwoColumnGrid>
              {pastor && (
                <GridItem>
                  <StaffMember
                    name={pastor.name}
                    title={pastor.title}
                    photo={pastor.photo}
                    aspectRatio={LANDSCAPE_RATIO}
                  />
                </GridItem>
              )}
              {executiveDirector && (
                <GridItem>
                  <StaffMember
                    name={executiveDirector.name}
                    title={executiveDirector.title}
                    photo={executiveDirector.photo}
                    aspectRatio={LANDSCAPE_RATIO}
                  />
                </GridItem>
              )}
            </TwoColumnGrid>
          </Box>
        )}

        {ministryDirectors && ministryDirectors.length > 0 && (
          <Box w="full">
            <TierHeading id="ministry-directors">Ministry Directors</TierHeading>
            <TwoColumnGrid>
              {ministryDirectors.map((m, i) => (
                <GridItem key={`director-${i}`}>
                  <StaffMember
                    name={m.name}
                    title={m.title}
                    photo={m.photo}
                    aspectRatio={LANDSCAPE_RATIO}
                  />
                </GridItem>
              ))}
            </TwoColumnGrid>
          </Box>
        )}

        {sortedExecTeam.length > 0 && (
          <Box w="full">
            <TierHeading id="executive-team">Executive Team</TierHeading>
            <TwoColumnGrid>
              {sortedExecTeam.map((m, i) => (
                <GridItem key={`exec-${i}`}>
                  <StaffMember
                    name={m.name}
                    title={m.title}
                    photo={m.photo}
                  />
                </GridItem>
              ))}
            </TwoColumnGrid>
          </Box>
        )}
      </VStack>
    </Flex>
  );
};

export default StaffSection;
