import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const CountdownTimer = (props) => {
  const { accentColor, remainingTime } = props;
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!remainingTime) return;

    // Parse the remainingTime string format "hh:mm:ss"
    const parseTimeString = (timeStr) => {
      const parts = timeStr.split(':');
      if (parts.length === 3) {
        return {
          hours: parseInt(parts[0], 10) || 0,
          minutes: parseInt(parts[1], 10) || 0,
          seconds: parseInt(parts[2], 10) || 0,
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    const parsedTime = parseTimeString(remainingTime);
    setTimeLeft(parsedTime);
  }, [remainingTime]);

  const TimeUnit = ({ value, label }) => (
    <VStack spacing={2}>
      <Box
        borderRadius="xl"
        px={[4, 6]}
        py={[3, 4]}
        w={['70px', '90px', '100px']}
        h={['60px', '70px', '80px']}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Text
          fontSize={['36', '70']}
          fontWeight="extrabold"
          color="#4A90E2"
          fontFamily="Manrope"
          lineHeight="1"
        >
          {value.toString().padStart(2, '0')}
        </Text>
      </Box>
      <Text
        fontSize={['xs', 'sm']}
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="wider"
        fontFamily="Manrope"
      >
        {label}
      </Text>
    </VStack>
  );

  return (
    <Center py={6} w="100%">
      <VStack spacing={6} w="100%">
        <Text
          fontSize={['26', '40']}
          fontWeight="bold"
          color={accentColor}
          textAlign="center"
          fontFamily="DMserifText"
        >
          Time Left to Give:
        </Text>

        <Box
          bg="#DFE7FF"
          borderRadius="2xl"
          p={[4, 6, 8]}
          border="1px solid"
          borderColor="#DFE7FF"
          w={['100%', '60%']}
        >
          <HStack spacing={[2, 4, 6]} justify="center">
            <TimeUnit value={timeLeft.hours} label="HOURS" />

            <Box
              display="flex"
              alignItems="flex-start"
              h={['60px', '70px', '80px']}
            >
              <Text
                fontSize={['2xl', '3xl', '4xl']}
                fontWeight="bold"
                color="#4A90E2"
              >
                :
              </Text>
            </Box>

            <TimeUnit value={timeLeft.minutes} label="MINUTES" />

            <Box
              display="flex"
              alignItems="flex-start"
              h={['60px', '70px', '80px']}
            >
              <Text
                fontSize={['2xl', '3xl', '4xl']}
                fontWeight="bold"
                color="#4A90E2"
              >
                :
              </Text>
            </Box>

            <TimeUnit value={timeLeft.seconds} label="SECONDS" />
          </HStack>
        </Box>
      </VStack>
    </Center>
  );
};

export default CountdownTimer;
