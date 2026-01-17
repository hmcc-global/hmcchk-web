import {
  Flex,
  Text,
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
  Image,
} from '@chakra-ui/react';

const StrategySection = (props) => {
  // TODO-YY: Remove when confirmed
  // const { title, blurb } = props;
  const STRATEGY_TITLE = 'The 5Gs';
  const STRATEGY_BLURB =
    'Here at HMCC, we believe that each and every single person should engage in these 5Gs to experience life transformation, mature as a disciple, and impact the world for Christ.';
  return (
    <Flex w="100%" direction="column">
      <Box py={[4, 6]} w="100%">
        <Heading
          as="h3"
          fontSize={['3xl', '5xl']}
          fontWeight={700}
          lineHeight={1}
          color="#0628A3"
          textAlign="center"
          fontFamily="DMSerifDisplay_Italic"
          id="strategy"
        >
          {STRATEGY_TITLE}
        </Heading>
        {/* <Stack
          direction={{ base: 'column', lg: 'column' }}
          spacing="10px"
          alignItems="center"
        > */}
        <Flex
          w="full"
          flexDir={'column'}
          rowGap={{ base: '1rem', md: '1.5rem' }}
          px={{ base: 0, md: '5%', lg: '10%' }}
          mt={'1rem'}
        >
          <Image
            w={{ base: '80%', sm: '60%', md: '40%' }}
            src={`${process.env.PUBLIC_URL}/images/about/strat-5gs.png`}
            marginX="auto"
            display={'flex'}
          />
          <Text
            color="#000000"
            textAlign={'justify'}
            fontSize={{ base: '0.875rem', md: '1rem' }}
          >
            {STRATEGY_BLURB}
          </Text>
        </Flex>
        {/* TODO-YY: Remove when confirmed */}
        {/* <Flex
            borderRadius="7"
            shadow="lg"
            px={[9, '13.3%']}
            py={[9, 6]}
            m={0}
            minH={['25em', '18em']}
            w={['full']}
            bgImage={`${process.env.PUBLIC_URL}/images/about/strat-gather.jpeg`}
            bgPos="center"
            bgSize="cover"
          >
            <Box m="auto">
              <Heading
                color="#0628A3"
                fontWeight="bold"
                textAlign="center"
                fontFamily="DMSerifDisplay_Italic"
              >
                {blurb[0].title}
              </Heading>

              <Heading
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                py="3"
                color="#000000"
                fontFamily="DMSerifDisplay_Italic"
              >
                {blurb[0].subtitle}
              </Heading>
              <Text color="#000000">{blurb[0][0]}</Text>
              <UnorderedList paddingTop="2">
                <ListItem color="#000000">{blurb[0][1]}</ListItem>
                <ListItem color="#000000">{blurb[0][2]}</ListItem>
              </UnorderedList>
            </Box>
          </Flex>
          <Flex
            borderRadius="7"
            shadow="lg"
            px={[9, '13.3%']}
            py={[9, 6]}
            m={0}
            minH={['25em', '23em']}
            w={['full']}
            bgImage={`${process.env.PUBLIC_URL}/images/about/strat-grow.jpeg`}
            bgPos="center"
            bgSize="cover"
          >
            <Box m="auto">
              <Heading
                color="#0628A3"
                fontWeight="bold"
                textAlign="center"
                fontFamily="DMSerifDisplay_Italic"
              >
                {blurb[1].title}
              </Heading>

              <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                py="3"
                fontFamily="DMSerifDisplay_Italic"
                color="#000000"
              >
                {blurb[1].subtitle}
              </Text>
              <Text color="#000000">{blurb[1][0]}</Text>
              <UnorderedList paddingTop="2">
                <ListItem color="#000000">{blurb[1][1]}</ListItem>
                <ListItem color="#000000">{blurb[1][2]}</ListItem>
              </UnorderedList>
            </Box>
          </Flex>
          <Flex
            borderRadius="7"
            shadow="lg"
            px={[9, '13.3%']}
            py={[9, 6]}
            m={0}
            minH={['25em', '23em']}
            w={['full']}
            bgImage={`${process.env.PUBLIC_URL}/images/about/strat-go.jpeg`}
            bgPos="center"
            bgSize="cover"
          >
            <Box m="auto">
              <Heading
                color="#0628A3"
                fontWeight="bold"
                textAlign="center"
                fontFamily="DMSerifDisplay_Italic"
              >
                {blurb[2].title}
              </Heading>

              <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                py="3"
                color="#000000"
                fontFamily="DMSerifDisplay_Italic"
              >
                {blurb[2].subtitle}
              </Text>
              <Text color="#000000">{blurb[2][0]}</Text>
              <UnorderedList paddingTop="2">
                <ListItem color="#000000">{blurb[2][1]}</ListItem>
                <ListItem color="#000000">{blurb[2][2]}</ListItem>
              </UnorderedList>
            </Box>
          </Flex> */}
        {/* </Stack> */}
      </Box>
    </Flex>
  );
};

export default StrategySection;
