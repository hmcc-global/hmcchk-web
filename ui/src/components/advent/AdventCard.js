import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Image,
  useDisclosure,
  ModalHeader,
  Box,
  AspectRatio,
  Center,
  Text,
  VStack,
  HStack,
  Link,
  ModalFooter,
  ChakraProvider,
} from '@chakra-ui/react';

import adventTheme from './adventTheme';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import rehypeRaw from 'rehype-raw';

// Replace with actual card data
const CardData = Array.from({ length: 24 }, () => {
  return {
    rotation: Math.random() * 30 - 15,
  };
});

const Background = {
  0: '#143642',
  1: '#FFF689',
  2: '#961D4E',
  3: '#E85F5C',
  4: '#399E5A',
  5: '#226CE0',
  6: '#205A34',
};

const BackgroundColor = () => {
  let num = Math.floor(Math.random() * 10) % 7;
  return Background[num];
};

const AdventCard = (props) => {
  const { isActive, date, content } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const thisCardData = CardData[date - 1];
  console.log(content);
  const color = BackgroundColor();

  return (
    <ChakraProvider theme={adventTheme}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay filter="blur(8px)" />
        <ModalContent
          w="30vw"
          h="100vh"
          borderWidth={14}
          borderColor={color}
          bg="white"
          borderRadius={0}
          justifyContent="center"
          boxShadow="1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000"
        >
          <Box h="100vh" borderColor="black" borderWidth={1.5}>
            <ModalHeader fontFamily="LettersForLearners" fontSize="27px" p={2}>
              {'December ' + date + ', 2022'}
            </ModalHeader>
            <ModalCloseButton />
            <Box>
              <VStack>
                {content.type === 'image' ? (
                  <Box>
                    <HStack w="25vw" spacing={5}>
                      {content.image && (
                        <Image
                          h="50%"
                          w="50%"
                          src={process.env.PUBLIC_URL + content.image}
                        />
                      )}
                      <Text fontFamily="LettersForLearners" fontSize="17px">
                        {content.subtitle}
                      </Text>
                    </HStack>
                    <Center mt={5}>
                      <Text
                        fontFamily="LettersForLearners"
                        fontSize="27px"
                        as="u"
                      >
                        {content.title}
                      </Text>
                    </Center>
                  </Box>
                ) : null}
                {content.type === 'video'
                  ? content.video && (
                      <Box w="30vw">
                        <AspectRatio margin="auto" maxW="20vw" ratio={16 / 9}>
                          <iframe
                            src={content.video}
                            title="Video player"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
                            allowFullScreen
                          ></iframe>
                        </AspectRatio>
                        <Center>
                          <Text
                            mt={5}
                            fontFamily="LettersForLearners"
                            fontSize="27px"
                            as="u"
                          >
                            {content.title}
                          </Text>
                        </Center>
                      </Box>
                    )
                  : null}
                {content.type === 'challenge' ? (
                  <Link
                    margin="auto"
                    mt="50%"
                    as="u"
                    fontFamily="LettersForLearners"
                    fontSize="20px"
                  >
                    Try this challenge out!
                  </Link>
                ) : null}
                {content.type === 'spotify' ? (
                  <Box w="30vw">
                    <Center mb={2}>
                      <Text
                        fontFamily="LettersForLearners"
                        fontSize="27px"
                        as="u"
                      >
                        {content.title}
                      </Text>
                    </Center>
                    <AspectRatio margin="auto" maxW="22vw" borderRadius={12}>
                      <iframe
                        title="spotify playlist"
                        src={content.link}
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </AspectRatio>
                  </Box>
                ) : null}
                {content.type !== 'challenge' ? (
                  <Box w="25vw" mt={5} textAlign="justify">
                    <Text
                      fontFamily="LettersforLearners"
                      fontSize={20}
                      color="black"
                    >
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={ChakraUIRenderer()}
                        children={content.description}
                        skipHtml
                      />
                    </Text>
                  </Box>
                ) : null}
              </VStack>
            </Box>
            <ModalFooter
              color={color}
              p={0}
              position="absolute"
              right={0}
              bottom={-5}
            >
              <Text
                fontFamily="Elsie Swash Caps"
                fontSize="9xl"
                textShadow="1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000"
              >
                {date}
              </Text>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
      {thisCardData && (
        <Box
          // Rotation
          transform={'rotateZ(' + thisCardData.rotation + 'deg)'}
        >
          <Image
            src={process.env.PUBLIC_URL + content.thumbnail}
            w={['14vw', '14vw', '12vw', '12vw', '10vw']}
            h={['15vh', '16vh', '12vh', '13vh', '16vh']}
            position="relative"
            onClick={isActive ? onOpen : null}
            // Centering
            margin="auto"
            // Grayscale filter
            filter={isActive ? 'none' : 'grayscale(100%)'}
            // Hover effect
            _hover={isActive ? { boxShadow: '0px 0px 20px yellow' } : {}}
          />
          <Center
            position="absolute"
            transform="translate(-50%, -50%)"
            margin={[
              '-50% 0 0 50%',
              '-30% 0 0 50%',
              '-75% 0 0 50%',
              '-75% 0 0 50%',
              '-75% 0 0 50%',
            ]}
          >
            <Text
              fontSize={['5xl', '5xl', '4xl', '5xl', '5xl']}
              color="white"
              fontFamily="Elsie Swash Caps"
            >
              {date}
            </Text>
          </Center>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default AdventCard;
