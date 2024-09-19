import {
  Box,
  Flex,
  Heading,
  Stack,
  VStack,
  Text,
  Container,
  HStack,
} from '@chakra-ui/react';

const Picture = ({ image, year, text }) => {
  return (
    <VStack h="100%" px={{ md: 1, lg: 2 }} py={3}>
      <Box
        w="100%"
        h="5em"
        bgImage={image}
        bgPos="center"
        bgSize="contain"
        bgRepeat="no-repeat"
      ></Box>
      <Text
        color="black"
        fontWeight={600}
        textAlign="center"
        px={{ base: 5, sm: 4, md: 7, lg: 7 }}
      >
        {year}
      </Text>
      <Text
        color="black"
        fontFamily="DMSerifDisplay_Italic"
        fontWeight={400}
        textAlign="center"
        fontSize={{ base: 'smaller', md: 'md' }}
      >
        {text}
      </Text>
    </VStack>
  );
};

const MissionSection = (props) => {
  const { title, blurb } = props;
  return (
    <Flex maxW="container.lg">
      <VStack justifyContent="space-around" spacing="2em">
        <Box>
          <Heading
            textAlign="center"
            textColor="#0628A3"
            fontSize={['3xl', '5xl']}
            fontWeight={700}
            fontFamily="DMSerifDisplay_Italic"
            paddingBottom={2}
            id="our-heart-for-missions"
          >
            {title}
          </Heading>
          <Text textAlign="center" px="1em" fontFamily="DMSerifDisplay_Regular">
            {blurb.blurb[1]}
          </Text>
        </Box>
        <Container
          backgroundColor="rgba(238, 250, 255, 1)"
          maxW="container.lg"
          borderRadius="7"
        >
          <Box backgroundColor="rgba(238, 250, 255, 1)" px={{ base: 1, md: 3 }}>
            <Heading
              textAlign="left"
              fontFamily="DMSerifDisplay_Italic"
              textColor="#0628A3"
              fontSize={['xl', '3xl']}
              fontWeight={700}
              paddingTop="1em"
            >
              {blurb.title[2]}
            </Heading>
            <Text paddingBottom="2em" textAlign="justify">
              {blurb.blurb[2]}
            </Text>
          </Box>
        </Container>
        <Container
          backgroundColor="rgba(243, 243, 243, 1)"
          maxW="container.lg"
          borderRadius="7"
        >
          <Box px={{ base: 1, md: 3 }}>
            <Heading
              fontFamily="DMSerifDisplay_Italic"
              textAlign="left"
              textColor="#0628A3"
              fontSize={['xl', '3xl']}
              fontWeight={700}
              pt="1em"
            >
              {blurb.title[3]}
            </Heading>
            <Text
              fontWeight={700}
              fontSize={['md', 'xl']}
              pb={{ base: 1 }}
              fontFamily="DMSerifDisplay_Regular"
            >
              {blurb.heading[1]}
            </Text>
            <Text paddingBottom="2em" textAlign="justify">
              {blurb.blurb[3]}
            </Text>
            <Text>{blurb.blurb[4]}</Text>
          </Box>
          <Stack
            direction="row"
            display={{ base: 'none', sm: 'none', md: 'flex' }}
            justify="space-around"
            marginX={[5]}
          >
            <Picture
              image={`/images/about/send_me.svg`}
              year="2016"
              text="Send me"
            ></Picture>
            <Picture
              image={`/images/about/transformasphere.svg`}
              year="2017"
              text="Transformasphere"
            ></Picture>
            <Picture
              image={`/images/about/chosen_gen.svg`}
              year="2018"
              text="Chosen Generation"
            ></Picture>
            <Picture
              image={`/images/about/just_one.svg`}
              year="2019"
              text="Just One"
            ></Picture>
            <Picture
              image={`/images/about/upside_down.svg`}
              year="2020"
              text="Upside Down"
            ></Picture>
            <Picture
              image={`/images/about/living_edge.png`}
              year="2021"
              text="Living on the Edge"
            ></Picture>
            <Picture
              image={`/images/about/no_other_name.svg`}
              year="2022"
              text="No Other Name"
            ></Picture>
            <Picture
              image={`/images/about/to_the_ends_of_the_earth.svg`}
              year="2023"
              text="To the Ends of the Earth"
            ></Picture>
          </Stack>

          <VStack display={{ sm: 'flex', md: 'none' }}>
            <HStack w="100%" justify="space-around">
              <Picture
                image={`/images/about/send_me.svg`}
                year="2016"
                text="Send me"
              ></Picture>
              <Picture
                image={`/images/about/transformasphere.svg`}
                year="2017"
                text="Transformasphere"
              ></Picture>
              <Picture
                image={`/images/about/chosen_gen.svg`}
                year="2018"
                text="Chosen Generation"
              ></Picture>
              <Picture
                image={`/images/about/just_one.svg`}
                year="2019"
                text="Just One"
              ></Picture>
            </HStack>
            <HStack w="100%" justify="space-around">
              <Picture
                image={`/images/about/upside_down.svg`}
                year="2020"
                text="Upside Down"
              ></Picture>
              <Picture
                image={`/images/about/living_edge.png`}
                year="2021"
                text="Living on the Edge"
              ></Picture>
              <Picture
                image={`/images/about/no_other_name.svg`}
                year="2022"
                text="No Other Name"
              ></Picture>
              <Picture
                image={`/images/about/to_the_ends_of_the_earth.svg`}
                year="2023"
                text="To the Ends of the Earth"
              ></Picture>
            </HStack>
          </VStack>
          <Box px={{ base: 1, md: 3 }}>
            <Text
              fontWeight={700}
              fontSize={['md', 'xl']}
              marginTop={5}
              fontFamily="DMSerifDisplay_Regular"
              pb={{ base: 1 }}
            >
              {blurb.heading[2]}
            </Text>
            <Text>
              {blurb.blurb[5]} <strong>{blurb.blurb[5.5]}</strong>
            </Text>
          </Box>
          <Box
            maxW="100%"
            backgroundImage={process.env.PUBLIC_URL + 'images/about/ignite.svg'}
            bgPos="center"
            bgSize="cover"
            h={{ base: '4em', sm: '6em', md: '10em' }}
            mx={{ base: 1, md: 3 }}
            my={5}
          ></Box>
          <Box px={{ base: 1, md: 3 }}>
            <Text
              fontWeight={700}
              pb={{ base: 1 }}
              fontFamily="DMSerifDisplay_Regular"
            >
              <em>{blurb.heading[3]}</em>
            </Text>
            <Text marginBottom={7}>{blurb.blurb[6]}</Text>
            <Text my={7}>
              {blurb.blurb[7]} <strong>{blurb.blurb[7.5]}</strong>
            </Text>
            <Text marginBottom={7}>{blurb.blurb[8]}</Text>
          </Box>
        </Container>
      </VStack>
    </Flex>
  );
};

export default MissionSection;
