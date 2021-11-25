import {
  Flex,
  Text,
  Box,
  Container,
  Heading,
  HStack,
  UnorderedList,
  ListItem,
  Center,
  Stack,
} from "@chakra-ui/react";

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
  console.log({ blurb });
  return (
    <Flex direction="column">
      <Box
        borderWidth="2px"
        borderRadius="5"
        shadow="lg"
        bg="#3182CE"
        px={[4, 8]}
        pt={[4, 6]}
        pb={[4, 6]}
        m={4}
        bgImage={`url('${process.env.PUBLIC_URL}/images/about-us/strategy.png')`}
        bgPosition="center"
        bgSize="cover"
      >
        <Heading
          as="h3"
          fontSize={["4xl", "6xl"]}
          fontWeight={700}
          lineHeight={1}
          color="#000000"
          textAlign="center"
          mb={4}
        >
          {title}
        </Heading>
        <Container maxW="container.lg" py={4}>
          <Stack direction={["column", "row"]} spacing="24px">
            <Box
              borderWidth="2px"
              borderRadius="5"
              shadow="lg"
              bg="#FFFFFF"
              px={[4, 8]}
              pt={[4, 6]}
              pb={[4, 6]}
              m={0}
              h={["40em", "40em"]}
              w={["13em", "25em"]}
            >
              <Heading color="#3182CE" textAlign="center">
                {blurb[0].title}
              </Heading>

              <Text alignText="center" fontWeight="bold" py="3" px="6">
                {blurb[0].subtitle}
              </Text>
              <Text>{blurb[0][0]}</Text>
              <UnorderedList>
                <ListItem>{blurb[0][1]}</ListItem>
                <ListItem>{blurb[0][2]}</ListItem>
              </UnorderedList>
            </Box>
            <Box
              borderWidth="2px"
              borderRadius="5"
              shadow="lg"
              bg="#FFFFFF"
              px={[4, 8]}
              pt={[4, 6]}
              pb={[4, 6]}
              m={4}
              h={["50em", "40em"]}
              w={["13em", "25em"]}
            >
              <Heading color="#3182CE" textAlign="center">
                {blurb[1].title}
              </Heading>

              <Text alignText="center" fontWeight="bold" py="3" px="6">
                {blurb[1].subtitle}
              </Text>
              <Text>{blurb[1][0]}</Text>
              <UnorderedList>
                <ListItem>{blurb[1][1]}</ListItem>
                <ListItem>{blurb[1][2]}</ListItem>
              </UnorderedList>
            </Box>
            <Box
              borderWidth="2px"
              borderRadius="5"
              shadow="lg"
              bg="#FFFFFF"
              px={[4, 8]}
              pt={[4, 6]}
              pb={[4, 6]}
              m={4}
              h={["50em", "40em"]}
              w={["13em", "25em"]}
            >
              <Heading color="#3182CE" textAlign="center">
                {blurb[2].title}
              </Heading>

              <Text alignText="center" fontWeight="bold" py="3" px="6">
                {blurb[2].subtitle}
              </Text>
              <Text>{blurb[2][0]}</Text>
              <UnorderedList>
                <ListItem>{blurb[2][1]}</ListItem>
                <ListItem>{blurb[2][2]}</ListItem>
              </UnorderedList>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Flex>
  );
};

export default StrategySection;
