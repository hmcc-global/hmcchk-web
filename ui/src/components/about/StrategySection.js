import {
  Flex,
  Text,
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
} from '@chakra-ui/react';

const StrategySection = (props) => {
  const { title, blurb } = props;
  return (
    <Flex w="100%" direction="column">
      <Box pt={[4, 6]} pb={[4, 6]} w="100%">
        <Heading
          as="h3"
          fontSize={['3xl', '5xl']}
          fontWeight={700}
          lineHeight={1}
          color="#0628A3"
          textAlign="center"
          mb={4}
        >
          {title}
        </Heading>
        <Stack
          direction={{ base: 'column', lg: 'column' }}
          spacing="10px"
          alignItems="center"
        >
          <Flex
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
              <Heading color="#0628A3" fontWeight="bold" textAlign="center">
                {blurb[0].title}
              </Heading>

              <Heading
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                py="3"
                color="#000000"
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
              <Heading color="#0628A3" fontWeight="bold" textAlign="center">
                {blurb[1].title}
              </Heading>

              <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                py="3"
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
              <Heading color="#0628A3" fontWeight="bold" textAlign="center">
                {blurb[2].title}
              </Heading>

              <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                py="3"
                color="#000000"
              >
                {blurb[2].subtitle}
              </Text>
              <Text color="#000000">{blurb[2][0]}</Text>
              <UnorderedList paddingTop="2">
                <ListItem color="#000000">{blurb[2][1]}</ListItem>
                <ListItem color="#000000">{blurb[2][2]}</ListItem>
              </UnorderedList>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default StrategySection;
