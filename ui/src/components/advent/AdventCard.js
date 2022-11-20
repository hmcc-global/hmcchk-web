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
} from '@chakra-ui/react';

import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

// Replace with actual card data
const CardData = Array.from({ length: 24 }, () => {
  return {
    rotation: Math.random() * 30 - 15,
  };
});

const AdventCard = (props) => {
  const { isActive, date, content } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const thisCardData = CardData[date - 1];
  console.log(content);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay filter="blur(8px)" />
        <ModalContent>
          <ModalHeader>{content.date}</ModalHeader>
          <Box>
            <VStack>
              <Box w="14em">
                {content.image && (
                  <Image
                    src={process.env.PUBLIC_URL + content.image}
                    w="100%"
                    margin="auto"
                  />
                )}
                {content.video && (
                  <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                    <iframe
                      width="560"
                      height="315"
                      src={content.video}
                      title="Video player"
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
                      allowFullScreen
                    ></iframe>
                  </AspectRatio>
                )}
              </Box>
              <Box>
                <Center>
                  <Text>{content.title}</Text>
                </Center>
              </Box>
              <Box fontSize="sm" mt="5" color="#4C80A5" textAlign="justify">
                <ReactMarkdown
                  components={ChakraUIRenderer()}
                  children={content.description}
                  skipHtml
                />
              </Box>
            </VStack>
          </Box>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
      {thisCardData && (
        <Image
          src={process.env.PUBLIC_URL + content.thumbnail}
          w="90%"
          position="relative"
          onClick={isActive ? onOpen : null}
          // Rotation
          transform={'rotateZ(' + thisCardData.rotation + 'deg)'}
          // Centering
          margin="auto"
          // Grayscale filter
          filter={isActive ? 'none' : 'grayscale(100%)'}
          // Hover effect
          _hover={isActive ? { boxShadow: '0px 0px 20px #fff' } : {}}
        />
      )}
    </>
  );
};

export default AdventCard;
