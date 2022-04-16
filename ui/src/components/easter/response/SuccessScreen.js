import {
  Box,
  Container,
  VStack,
  Image,
  Text,
  Button,
  Link,
  Divider,
} from '@chakra-ui/react';

const verseGeneratorData = [
  {
    verse:
      "“Endurance produces character, and character produces hope. This hope doesn't put us to shame, BECAUSE the love of God has been poured out in our hearts through the Holy Spirit, who has been given to us.” — Romans 5:4-5",
    image: '2.jpg',
  },
  {
    verse:
      "“The person who doesn't love does not know God, BECAUSE God is love. This is how the love of God is revealed to us: God has sent his only Son into the world so that we can live through him.” — 1 John 4:8-9",
    image: '1.jpg',
  },
  {
    verse:
      "“Be strong! Be fearless! Don't be afraid and don't be scared by your enemies, BECAUSE the Lord your God is the one who marches with you. He won't let you down, and he won't abandon you.” — Deuteronomy 31:6",
    image: '3.jpg',
  },
  {
    verse:
      'BECAUSE the Lord your God is going with you to fight your enemies for you and to save you.” — Deuteronomy 20:4',
    image: '4.jpg',
  },
  {
    verse:
      "“I've commanded you to be brave and strong, haven't I? Don't be alarmed or terrified, BECAUSE the Lord your God is with you wherever you go.” — Joshua 1:9",
    image: '5.jpg',
  },
  {
    verse:
      "“He said to me, 'My grace is enough for you, BECAUSE power is made perfect in weakness.' So I'll gladly spend my time bragging about my weaknesses so that Christ's power can rest on me.” — 2 Corinthians 12:9",
    image: '6.jpg',
  },
  {
    verse:
      "“It's impossible to please God without faith BECAUSE the one who draws near to God must believe that he exists and that he rewards people who try to find him” — Hebrews 11:6",
    image: '7.jpg',
  },
  {
    verse:
      '“Happy are people who are hopeless, BECAUSE the kingdom of heaven is theirs. Happy are people who grieve, BECAUSE they will be made glad. Happy are people who are humble, BECAUSE they will inherit the earth.” — Matthew 5:3-5',
    image: '8.jpg',
  },
  {
    verse:
      '“Humble yourselves, therefore, under the mighty hand of God so that at the proper time He may exalt you, casting all your anxieties on Him, BECAUSE He cares for you.”  — 1 Peter 5:6-7',
    image: '9.jpg',
  },
  {
    verse:
      "“Examine me, Lord; put me to the test! Purify my mind and my heart. BECAUSE your faithful love is right in front of me — I walk in your truth! I don't spend time with people up to no good; I don't keep company with liars.” — Psalm 26:2-4",
    image: '10.jpg',
  },
  {
    verse:
      '“Enter his gates with thanks; enter his courtyards with praise! Thank him! Bless his name! BECAUSE the Lord is good, his loyal love lasts forever; his faithfulness lasts generation after generation.”  — Psalm 100:4-5',
    image: '11.jpg',
  },
];

const SuccessScreen = () => {
  const randomizedVerse = verseGeneratorData[Math.floor(Math.random() * 11)];

  return (
    <Box
      w="100%"
      background={`url('${process.env.PUBLIC_URL}/images/easter/response/form-background.svg')`}
      bgPos="top"
      minH="100vh"
      pt="8vh"
      pb="8vh"
    >
      <Container maxW="container.lg">
        <VStack spacing="7">
          <VStack>
            <Box
              fontSize={'2xl'}
              textAlign="center"
              color="#538EC7"
              textStyle="NextSoutherlandSerif"
              fontWeight="700"
            >
              HERE IS A BIBLE VERSE FOR YOU!
            </Box>
            <Box
              fontSize={'md'}
              textAlign="center"
              color="#538EC7"
              textStyle="Quicksand_bolder"
            >
              Scroll down to continue the response time.
            </Box>
          </VStack>
          <VStack w={['100%', '80%']}>
            <Image
              key="formImage"
              boxSize="100%"
              height="auto"
              objectFit="cover"
              mb=""
              src={`${process.env.PUBLIC_URL}/images/easter/response/desktop/${randomizedVerse.image}`}
              display={['none', 'block']}
            />
            <Image
              key="formImage"
              boxSize={['100%', '90%']}
              objectFit="cover"
              mb=""
              src={`${process.env.PUBLIC_URL}/images/easter/response/mobile/${randomizedVerse.image}`}
              display={['block', 'none']}
            />
            <Text
              textStyle="Quicksand_bolder"
              color="#538EC7"
              display={['none', 'block']}
              textAlign="center"
            >
              Right-click and save this image to set it as your wallpaper as a
              personal reminder!
            </Text>
            <Text
              textStyle="Quicksand_bolder"
              color="#538EC7"
              display={['block', 'none']}
              textAlign="center"
            >
              Press and hold this image to save and set it as your wallpaper as
              a personal reminder!
            </Text>
          </VStack>
          <Box
            w={['100%', '66%']}
            fontSize="2xl"
            textAlign="center"
            textStyle="Quicksand_bolder"
            color="#538EC7"
          >
            {randomizedVerse.verse}
          </Box>
          <Divider colorScheme="#538EC7" />
          <VStack>
            <Text
              textStyle="Quicksand_bolder"
              color="#538EC7"
              display={['block']}
              textAlign="center"
              fontSize="2xl"
            >
              Please follow the instructions from the pastor for the next part:
            </Text>
            <Text
              textStyle="Quicksand_bolder"
              color="#538EC7"
              display={['block', 'none']}
              textAlign="center"
            >
              Press and hold this button to open in a new tab
            </Text>
            <Button
              px="10%"
              py="3%"
              border="1px solid #6E7F98"
              bg="#E0EDFF"
              as="a"
              href="https://www.google.com/maps/d/u/0/edit?hl=en&hl=en&mid=1EY4YEOU3Kcmz5kEHlcjLkh3fUSiBY7Qd&ll=22.368791195813237%2C114.1568863064498&z=11"
              target="_blank"
              textStyle="NextSoutherlandSerif"
              _hover={{
                bg: '#004B81',
                border: '1px solid #E0EDFF',
                color: 'white',
              }}
            >
              Google Map
            </Button>
            <Text
              textStyle="Quicksand_bolder"
              color="#538EC7"
              display={['block']}
              textAlign="center"
            >
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSf0w_SAPIujq-s0PYq1tZUjWJgGzhRmjLpQfhFmm6zheJhW9A/viewform?hl=en"
                isExternal
              >
                <br />
                <u>Click here if you cannot edit the Google Map</u>
              </Link>
            </Text>
            <Image
              key="responseImage"
              boxSize="100%"
              height="auto"
              objectFit="cover"
              mb=""
              src={`${process.env.PUBLIC_URL}/images/easter/response/easter_response_desktop.png`}
              display={['none', 'block']}
            />
            <Image
              key="responseImage"
              boxSize="100%"
              height="auto"
              objectFit="cover"
              mb=""
              src={`${process.env.PUBLIC_URL}/images/easter/response/easter_response_mobile.png`}
              display={['block', 'none']}
            />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default SuccessScreen;
