import {
  Flex,
  Text,
  Box,
  Container,
  Heading,
  UnorderedList,
  ListItem,
  Stack,
} from '@chakra-ui/react';

const StrategySection = (props) => {
  const sliderSettings = {
    adaptiveHeight: true,
    arrows: false,
    centerMode: true,
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesPerRow: 1,
    speed: 500,
    swipeToSlide: true,
    variableWidth: true,
  };
  const { title, blurb } = props;
  return (
    <Flex w="100%" direction="column">
      <Box
        borderWidth="2px"
        borderRadius="5"
        shadow="lg"
        bg="#3182CE"
        px={[0, 8]}
        pt={[4, 6]}
        pb={[4, 6]}
        w="100%"
        bgImage={`url('${process.env.PUBLIC_URL}/images/about-us/strategy.png')`}
        bgPosition="center"
        bgSize="cover"
      >
        <Heading
          as="h3"
          fontSize={['4xl', '6xl']}
          fontWeight={700}
          lineHeight={1}
          color="#000000"
          textAlign="center"
          mb={4}
        >
          {title}
        </Heading>
        <Container maxW="container.lg" py={4}>
          <Stack
            direction='row'
            spacing="10px"
            alignItems="center"
          >
            <Flex
              borderWidth="2px"
              borderRadius="5"
              shadow="lg"
              bg="#FFFFFF"
              px={[6, 6]}
              pt={[6, 6]}
              pb={[6, 6]}
              m={0}
              h={['35em', '40em']}
              w={['full', '25em']}
            >
              <Box m="auto">
                <Heading color="#3182CE" textAlign="center">
                  {blurb[0].title}
                </Heading>

                <Text
                  textAlign="center"
                  fontWeight="bold"
                  py="3"
                  color="#000000"
                >
                  {blurb[0].subtitle}
                </Text>
                <Text color="#000000">{blurb[0][0]}</Text>
                <UnorderedList paddingTop="2">
                  <ListItem color="#000000">{blurb[0][1]}</ListItem>
                  <ListItem color="#000000">{blurb[0][2]}</ListItem>
                </UnorderedList>
              </Box>
            </Flex>
            <Flex
              borderWidth="2px"
              borderRadius="5"
              shadow="lg"
              bg="#FFFFFF"
              px={[6, 6]}
              pt={[6, 6]}
              pb={[6, 6]}
              m={0}
              h={['35em', '40em']}
              w={['full', '25em']}
            >
              <Box m="auto">
                <Heading color="#3182CE" textAlign="center">
                  {blurb[1].title}
                </Heading>

                <Text
                  textAlign="center"
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
              borderWidth="2px"
              borderRadius="5"
              shadow="lg"
              bg="#FFFFFF"
              px={[6, 6]}
              pt={[6, 6]}
              pb={[6, 6]}
              m={0}
              h={['35em', '40em']}
              w={['full', '25em']}
            >
              <Box m="auto">
                <Heading color="#3182CE" textAlign="center">
                  {blurb[2].title}
                </Heading>

                <Text
                  textAlign="center"
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
        </Container>
      </Box>
    </Flex>
  );
};

export default StrategySection;
