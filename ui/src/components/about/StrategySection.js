import {
  Flex,
  Text,
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
  Image,
  Container,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const STRATEGY_TITLE = 'The 5Gs';
const STRATEGY_BLURB =
  'Here at HMCC, we believe that each and every single person should engage in these 5Gs to experience life transformation, mature as a disciple, and impact the world for Christ.';

const COLORS = {
  gather: '#64CDB4',
  grow: '#5ECECC',
  give: '#5BBAD7',
  go: '#5185E8',
  generations: '#3771E5',
};

// Constants for sizing
const SIZING = {
  image: { base: '275px', sm: '300px', md: '325px', lg: '400px' },
  topSide: { base: '140px', sm: '180px', md: '220px' },
  middleSide: { base: '130px', sm: '170px', md: '200px' },
  bottom: { base: '160px', sm: '200px', md: '240px' },
};

const DESCRIPTION_POSITIONS = {
  gather: {
    top: { md: '-15%', lg: '-5%' },
    right: { md: '2.5%', lg: '5%' },
  },
  grow: {
    top: { md: '45%', lg: '45%' },
    right: { md: '0%', lg: '5%' },
  },
  give: {
    bottom: { md: '-27.5%', lg: '-20%' },
  },
  go: {
    top: { md: '45%', lg: '45%' },
    left: { md: '0%', lg: '5%' },
  },
  generations: {
    top: { md: '-15%', lg: '-5%' },
    left: { md: '2.5%', lg: '7.5%' },
  },
};

const StrategySection = (props) => {
  // TODO-YY: Remove when confirmed
  // const { title, blurb } = props;

  return (
    <Flex w="100%" direction="column" gap={{ base: '1rem', md: '1.5rem' }}>
      {/* <Box py={[4, 6]} w="100%"> */}
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
      <Flex w="full" px={{ base: 0, md: '5%', lg: '10%' }} mt={'1rem'}>
        <Text
          color="#000000"
          textAlign={'justify'}
          fontSize={{ base: '0.875rem', md: '1rem' }}
        >
          {STRATEGY_BLURB}
        </Text>
      </Flex>
      {/* Gospel Circle Diagram - with proper spacing */}
      <Box
        position="relative"
        w="100%"
        maxW="900px"
        mx="auto"
        mt={{ base: '0', md: '5rem' }}
        mb={{ base: '0', md: '7rem' }}
        px={{ base: 4, md: 0 }}
      >
        {/* Desktop Layout - Positioned around image */}
        <Box
          position="relative"
          display={{ base: 'none', md: 'block' }}
          w="100%"
        >
          {/* Center Image Container */}
          <Box position="relative" w={SIZING.image} h={SIZING.image} mx="auto">
            <Image
              src={`${process.env.PUBLIC_URL}/images/about/strat-5gs.png`}
              alt="The 5Gs"
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>

          {/* GENERATIONS - Top Left */}
          <Box
            position="absolute"
            top={DESCRIPTION_POSITIONS.generations.top}
            left={DESCRIPTION_POSITIONS.generations.left}
            maxW={SIZING.topSide}
          >
            <Heading
              size={{ base: 'sm', md: 'md', lg: 'lg' }}
              color={COLORS.generations}
              mb={2}
            >
              GENERATIONS
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', md: 'sm' }}>
              <ListItem>
                <strong>Receive and invest</strong> as a disciple in
                relationship with others
              </ListItem>
              <ListItem>
                Participate in <strong>OCR</strong> (Operation Campus/City
                Reach)
              </ListItem>
            </UnorderedList>
          </Box>

          {/* GATHER - Top Right */}
          <Box
            position="absolute"
            top={DESCRIPTION_POSITIONS.gather.top}
            right={DESCRIPTION_POSITIONS.gather.right}
            maxW={SIZING.topSide}
          >
            <Heading
              size={{ base: 'sm', md: 'md', lg: 'lg' }}
              color={COLORS.gather}
              mb={2}
            >
              GATHER
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', md: 'sm' }}>
              <ListItem>
                Commit to community in <strong>LIFE Group</strong>
              </ListItem>
              <ListItem>
                <strong>Gather corporately</strong> through{' '}
                <strong>Sunday Celebration</strong>
              </ListItem>
            </UnorderedList>
          </Box>

          {/* GROW - Middle Right */}
          <Box
            position="absolute"
            top={DESCRIPTION_POSITIONS.grow.top}
            right={DESCRIPTION_POSITIONS.grow.right}
            maxW={SIZING.middleSide}
          >
            <Heading
              size={{ base: 'sm', md: 'md', lg: 'lg' }}
              color={COLORS.grow}
              mb={2}
            >
              GROW
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', md: 'sm' }}>
              <ListItem>
                Cultivate a <strong>personal devotional life</strong>
              </ListItem>
              <ListItem>
                Participate in <strong>The Transformed Life Curriculum</strong>
              </ListItem>
            </UnorderedList>
          </Box>

          {/* GIVE - Bottom */}
          <Box
            position="absolute"
            bottom={DESCRIPTION_POSITIONS.give.bottom}
            left="50%"
            transform="translateX(-50%)"
            maxW={SIZING.bottom}
          >
            <Heading
              size={{ base: 'sm', md: 'md', lg: 'lg' }}
              color={COLORS.give}
              mb={2}
              textAlign="center"
            >
              GIVE
            </Heading>
            <UnorderedList
              spacing={1}
              fontSize={{ base: 'xs', md: 'sm' }}
              stylePosition="inside"
              textAlign="center"
            >
              <ListItem>
                <strong>Tithe and give</strong> faithfully
              </ListItem>
              <ListItem>
                <strong>Serve</strong> on a ministry team
              </ListItem>
            </UnorderedList>
          </Box>

          {/* GO - Middle Left */}
          <Box
            position="absolute"
            top={DESCRIPTION_POSITIONS.go.top}
            left={DESCRIPTION_POSITIONS.go.left}
            maxW={SIZING.middleSide}
          >
            <Heading
              size={{ base: 'sm', md: 'md', lg: 'lg' }}
              color={COLORS.go}
              mb={2}
            >
              GO
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', md: 'sm' }}>
              <ListItem>
                Commit to <strong>witness to one pre-Christian</strong>
              </ListItem>
              <ListItem>
                Participate in <strong>Missions/Service projects</strong>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Box>
      {/* Mobile Layout*/}
      <Box display={{ base: 'block', md: 'none' }} w="100%">
        {/* 5Gs Diagram */}
        <Box w={SIZING.image} mx="auto" mb={6}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/about/strat-5gs.png`}
            alt="The 5Gs Gospel Circle - a visual representation of HMCC's discipleship strategy showing Generations, Gather, Grow, Give, and Go"
            w="100%"
            h="100%"
            objectFit="contain"
          />
        </Box>
        {/* Description for each G */}
        <Flex direction="column" gap={4}>
          {/* GATHER */}
          <Box>
            <Heading
              size={{ base: 'sm', sm: 'md' }}
              color={COLORS.gather}
              mb={2}
            >
              GATHER
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', sm: 'sm' }}>
              <ListItem>
                Commit to community in <strong>LIFE Group</strong>
              </ListItem>
              <ListItem>
                <strong>Gather corporately</strong> through{' '}
                <strong>Sunday Celebration</strong>
              </ListItem>
            </UnorderedList>
          </Box>

          {/* GROW */}
          <Box>
            <Heading size={{ base: 'sm', sm: 'md' }} color={COLORS.grow} mb={2}>
              GROW
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', sm: 'sm' }}>
              <ListItem>
                Cultivate a <strong>personal devotional life</strong>
              </ListItem>
              <ListItem>
                Participate in <strong>The Transformed Life Curriculum</strong>
              </ListItem>
            </UnorderedList>
          </Box>

          {/* GIVE */}
          <Box>
            <Heading size={{ base: 'sm', sm: 'md' }} color={COLORS.give} mb={2}>
              GIVE
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', sm: 'sm' }}>
              <ListItem>
                <strong>Tithe and give</strong> faithfully
              </ListItem>
              <ListItem>
                <strong>Serve</strong> on a ministry team
              </ListItem>
            </UnorderedList>
          </Box>

          {/* GO */}
          <Box>
            <Heading size={{ base: 'sm', sm: 'md' }} color={COLORS.go} mb={2}>
              GO
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', sm: 'sm' }}>
              <ListItem>
                Commit to <strong>witness to one pre-Christian</strong>
              </ListItem>
              <ListItem>
                Participate in <strong>Missions/Service projects</strong>
              </ListItem>
            </UnorderedList>
          </Box>
          {/* GENERATIONS */}
          <Box>
            <Heading
              size={{ base: 'sm', sm: 'md' }}
              color={COLORS.generations}
              mb={2}
            >
              GENERATIONS
            </Heading>
            <UnorderedList spacing={1} fontSize={{ base: 'xs', sm: 'sm' }}>
              <ListItem>
                <strong>Receive and invest</strong> as a disciple in
                relationship with others
              </ListItem>
              <ListItem>
                Participate in <strong>OCR</strong> (Operation Campus/City
                Reach)
              </ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Box>
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
      {/* </Box> */}
    </Flex>
  );
};

export default StrategySection;
