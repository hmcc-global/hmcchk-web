import { Box, Container, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

const ScheduleItem = ({ time, color, description }) => (
  <>
    <GridItem
      colSpan={3}
      display="flex"
      width="100%"
      alignItems="center"
      justifyContent="right"
    >
      <Text
        fontSize={{ base: '0.875rem', lg: '1.25rem' }}
        fontFamily="Manrope"
        fontWeight="700"
      >
        {time}
      </Text>
    </GridItem>
    <GridItem
      colSpan={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="5px"
        height="100%"
        backgroundColor={color}
        borderRadius="0px"
      />
    </GridItem>
    <GridItem
      colSpan={8}
      display="flex"
      alignItems="center"
      justifyContent="left"
      py={{ base: '0.75rem', lg: '1rem' }}
    >
      <Text
        fontSize={{ base: '1rem', lg: '1.75rem' }}
        fontFamily="DMSerifDisplay_Italic"
      >
        {description}
      </Text>
    </GridItem>
  </>
);

const DecorativeSVG = ({ position, pathProps, ...boxProps }) => (
  <Box
    as="svg"
    position="absolute"
    width={{
      base: '6rem',
      sm: '8rem',
      md: '9rem',
      lg: '10rem',
      xl: '11rem',
      '2xl': '12rem',
    }}
    maxWidth="274px"
    height="auto"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    {...boxProps}
  >
    <path {...pathProps} />
  </Box>
);

const BBSchedule = () => {
  const scheduleInformation = [
    {
      time: '10:00 AM',
      color: '#21A0A7',
      description: 'Worship with Parents',
    },
    {
      time: '10:30 AM',
      color: '#EBAC09',
      description: 'Children dismissed to Building Blocks',
    },
    {
      time: '12:00 PM',
      color: '#D46764',
      description: 'Parents pick up children from classroom',
    },
  ];

  return (
    <Container w="100%" maxW="container.xl" minH="100%">
      <Flex
        flexDirection="column"
        minW="100%"
        alignItems="center"
        gap={{ base: '2.25rem', lg: '2.75rem' }}
      >
        <Box
          display="flex"
          w="100%"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          gap={{ base: '0.25rem', lg: '0.5rem' }}
        >
          <Text
            fontFamily="DMSerifDisplay_Italic"
            fontSize={{ base: '2.25rem', lg: '2.625rem' }}
          >
            Schedule Information
          </Text>
          <Text
            fontFamily="Manrope"
            fontSize={{ base: '0.875rem', lg: '1.25rem' }}
          >
            We will have classes every Sunday morning. We have a play area in
            the main congregation for children under age 3.
          </Text>
        </Box>

        <Box
          display="flex"
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          color="#0C0C20"
          position="relative"
          pt="1rem"
          pb={{ base: '6rem', lg: '5rem' }}
        >
          {/* Top-right decorative SVG */}
          <DecorativeSVG
            right={0}
            top={0}
            viewBox="0 0 274 119"
            pathProps={{
              d: 'M2.99984 22.385C2.99984 22.385 49.9898 3.07978 69.036 3.52023C88.0822 3.96067 46.1228 29.1899 71.8956 48.2556C97.6685 67.3213 226.104 -10.0081 242.806 12.5453C259.508 35.0988 217.506 54.6766 221.976 96.7303C226.445 138.784 315.276 98.1878 315.276 98.1878',
              stroke: '#4A6EEB',
              strokeWidth: '6',
              strokeLinecap: 'round',
            }}
          />

          <Grid templateColumns="repeat(12, 1fr)">
            {scheduleInformation.map((item, index) => (
              <ScheduleItem key={index} {...item} />
            ))}
          </Grid>

          {/* Bottom-left decorative SVG */}
          <DecorativeSVG
            left={0}
            bottom={0}
            viewBox="0 0 232 174"
            pathProps={{
              d: 'M228.206 95.7486C228.206 95.7486 147.785 182.035 122.475 169.081C97.1655 156.127 161.966 52.7723 137.593 34.2991C113.22 15.8258 90.498 67.3001 65.5948 74.1335C40.6915 80.9669 80.4856 21.7178 65.7813 6.49221C51.0769 -8.73336 -18.6248 33.8684 -18.6248 33.8684',
              stroke: '#EBBB41',
              strokeWidth: '6',
              strokeLinecap: 'round',
            }}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default BBSchedule;
