import {
  HStack,
  Text,
  Container,
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  VStack,
} from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
const VisionMissionSectionMobile = () => {
  return (
    <Container
      maxW="container.lg"
      py={10}
      bgImage={`url('${process.env.PUBLIC_URL}/images/home/hk-green.png')`}
      bgPos="center right"
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <VStack>
        <Box w="100%" alignItems="flex-start" py="1em">
          <Box position="relative">
            <Box
              w="100%"
              position="absolute"
              h="122%"
              bgPos="60% 100%"
              bgSize="70%"
              bgRepeat="no-repeat"
              bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-green-3.svg')`}
            ></Box>
            <Heading
              color="#0C0C20"
              fontFamily="'DM Serif Display', serif"
              fontStyle="italic"
              fontWeight="400"
              lineHeight="1"
              wordBreak="break-word"
              fontSize="36px"
            >
              Our Vision & Mission
            </Heading>
          </Box>
        </Box>
        <VStack
          borderRadius="0.5rem"
          border="1px solid"
          borderColor="green.400"
          p="1em"
        >
          <Box borderRadius="1.875em" bgColor="white" m="auto" px="1em">
            <Text
              color="#0C0C20"
              fontSize="16px"
              fontFamily="'Manrope', sans-serif"
              fontWeight="700"
              textTransform="uppercase"
              lineHeight="16px"
              letterSpacing="4px"
              wordBreak="break-word"
            >
              VISION
            </Text>
          </Box>
          <Box textAlign="center">
            <Text>
              <Text display="inline">
                <Text
                  color="#4A6EEB"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontStyle="italic"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  Multiplying
                </Text>{' '}
                <Text
                  color="#141419"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  churches in
                </Text>{' '}
                <Text
                  color="#141419"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontStyle="italic"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  campuses and cities
                </Text>{' '}
                <Text
                  color="#141419"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  to
                </Text>{' '}
                <Text
                  color="#4A6EEB"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontStyle="italic"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  transform
                </Text>{' '}
                <Text
                  color="#141419"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  the
                </Text>{' '}
                <Text
                  color="#141419"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontStyle="italic"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  next generation
                </Text>{' '}
                <Text
                  color="#141419"
                  fontSize="20px"
                  fontFamily="'DM Serif Display', serif"
                  fontWeight="400"
                  lineHeight="28.84px"
                  wordBreak="break-word"
                  display="inline"
                >
                  among the nations.
                </Text>
              </Text>
            </Text>
          </Box>
        </VStack>
        <VStack
          borderRadius="0.5rem"
          border="1px solid"
          borderColor="green.400"
          p="1em"
        >
          <Box
            borderRadius="1.875em"
            bgColor="white"
            m="auto"
            px="1em"
            textAlign="center"
          >
            <Text
              color="#0C0C20"
              fontSize="16px"
              fontFamily="'Manrope', sans-serif"
              fontWeight="700"
              textTransform="uppercase"
              lineHeight="16px"
              letterSpacing="4px"
              wordBreak="break-word"
            >
              MISSION
            </Text>
          </Box>
          <Box textAlign="center">
            <Text display="inline">
              <Text
                color="#141419"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                To
              </Text>{' '}
              <Text
                color="#4A6EEB"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontStyle="italic"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                transform
              </Text>{' '}
              <Text
                color="#141419"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                lost people into
              </Text>{' '}
              <Text
                color="#141419"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontStyle="italic"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                Christ's disciples
              </Text>{' '}
              <Text
                color="#141419"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                who will then
              </Text>{' '}
              <Text
                color="#4A6EEB"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontStyle="italic"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                transform
              </Text>{' '}
              <Text
                color="#141419"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                the
              </Text>{' '}
              <Text
                color="#141419"
                fontSize="20px"
                fontFamily="'DM Serif Display', serif"
                fontStyle="italic"
                fontWeight="400"
                lineHeight="28.84px"
                wordWrap="break-word"
                display="inline"
              >
                world.
              </Text>
            </Text>
          </Box>
        </VStack>
        <VStack>
          <VStack
            borderRadius="0.5rem"
            border="1px solid"
            borderColor="green.400"
            p="1em"
          >
            <Box>
              <Text
                color="#0C0C20"
                fontSize="14px"
                fontFamily="'Manrope', sans-serif"
                fontWeight="500"
                wordBreak="break-word"
                textAlign="center"
              >
                From January 2024 through December 2029, our church will journey
                together to fulfil God’s calling for us through the Saturate
                Vision in Hong Kong.
              </Text>
            </Box>
            <Box w="100%" p="1em" bgColor="white">
              <Text
                color="#4A6EEB"
                fontSize="16px"
                fontFamily="'Manrope', sans-serif"
                fontWeight="700"
                textTransform="uppercase"
                lineHeight="16px"
                letterSpacing="4px"
                wordBreak="break-word"
                textAlign="center"
              >
                SATURATE VISION
              </Text>
            </Box>
            <Text
              color="#0C0C20"
              fontSize="20px"
              fontFamily="'DM Serif Display', serif"
              fontStyle="italic"
              fontWeight="400"
              lineHeight="21.26px"
              wordBreak="break-word"
              textAlign="center"
            >
              To saturate Hong Kong with the knowledge of God's glory by living
              out the Kingdom lifestyle and proclaiming the Gospel, so that we
              can make more disciples of all nations, locally, regionally, and
              globally for the spread of Jesus's fame.
            </Text>
          </VStack>
        </VStack>
        <Button my="auto" borderRadius="2.75rem" w="100%" bgColor="#77C2C6">
          <Text
            fontSize="14px"
            fontFamily="'Manrope', sans-serif"
            fontWeight="700"
            wordBreak="break-word"
            mx="1em"
          >
            About Us
          </Text>
          <ArrowForwardIcon
            color="black"
            transform="rotate(315deg)"
            boxSize="30px"
          />
        </Button>
      </VStack>
    </Container>
  );
};
export default VisionMissionSectionMobile;
