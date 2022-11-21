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
  Container,
} from '@chakra-ui/react';

import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay filter="blur(8px)" />
        <ModalContent
          w="370px"
          h="555px"
          borderWidth={14}
          borderColor={color}
          bg="white"
          borderRadius={0}
          justifyContent="center"
          boxShadow="1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000"
        >
          <Box h="527" borderColor="black" borderWidth={1.5}>
            <ModalHeader fontFamily="LettersForLearners" fontSize="27px" p={2}>
              {content.date}
            </ModalHeader>
            <ModalCloseButton />
            <Box>
              <VStack>
                {content.type === 'image' ? (
                  <Box>
                    <HStack w="296px" spacing={5}>
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
                      <Box w="370px">
                        <AspectRatio margin="auto" maxW="206px" ratio={16 / 9}>
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
                  <Box w="370px">
                    <Center mb={2}>
                      <Text
                        fontFamily="LettersForLearners"
                        fontSize="27px"
                        as="u"
                      >
                        {content.title}
                      </Text>
                    </Center>
                    <AspectRatio margin="auto" maxW="285px" borderRadius={12}>
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
                  <Box fontSize="sm" mt={5} color="#4C80A5" textAlign="justify">
                    {/* <ReactMarkdown
                      fontFamily="LettersForLearners"
                      components={ChakraUIRenderer()}
                      children={content.description}
                      skipHtml
                    /> */}
                    <Text fontFamily="LettersForLearners" fontSize="20px">
                      {content.description}
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
              bottom={0}
            >
              <Text
                fontFamily="ElsieSwashCaps-Regular"
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
            w="60px"
            h="100px"
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
            margin="-75% 0 0 50%"
          >
            <Text
              fontSize="5xl"
              color="white"
              fontFamily="ElsieSwashCaps-Regular"
            >
              {date}
            </Text>
          </Center>
        </Box>
      )}
    </>
  );
};

export default AdventCard;
