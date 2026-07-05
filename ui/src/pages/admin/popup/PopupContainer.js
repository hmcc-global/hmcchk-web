import {
  Box,
  Button,
  Link,
  Modal,
  ModalCloseButton,
  Image,
  ModalContent,
  AspectRatio,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const PopupContainer = ({ popupData, isPreviewing, setIsPreviewing }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(isPreviewing);
  }, [isPreviewing]);
  const onClose = () => {
    setIsPreviewing(false);
    setIsOpen(false);
  };
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="20">
        {popupData.image && (
          <AspectRatio mb="5" width="100%" ratio={16 / 9}>
            <Image
              borderTopLeftRadius="20"
              borderTopRightRadius="20"
              src={popupData.image}
              objectFit="cover"
            />
          </AspectRatio>
        )}
        <ModalCloseButton />
        {popupData.title && (
          <ModalHeader
            ml={[0, 16]}
            mr={[0, 16]}
            fontWeight="900"
            fontSize={['2xl', '3xl']}
          >
            {popupData.title}
          </ModalHeader>
        )}
        <ModalBody ml={[0, 16]} mr={[0, 16]}>
          <Box fontSize="sm" mt="5" color="#4C80A5" textAlign="justify">
            <ReactMarkdown
              components={ChakraUIRenderer()}
              children={popupData.description}
              skipHtml
            />
          </Box>
        </ModalBody>
        <ModalFooter ml={[0, 16]} mr={[0, 16]}>
          <ButtonGroup
            size="md"
            flexDirection={['column', 'row']}
            spacing={[0, 0]}
            display={'flex'}
            flexWrap={'wrap'}
            w="100%"
            variant="outline"
            colorScheme="gray"
            alignItems="center"
          >
            {popupData.buttonTexts.length > 0 &&
              popupData.buttonTexts.map((buttonTextItem, i) => (
                <Button
                  my="1"
                  marginRight={['0', '4']}
                  minW={['18em', '10em']}
                  maxW={['30em', '11em']}
                  flex={[false, 1]}
                  as={Link}
                  target="_blank"
                  href={
                    popupData.buttonLinks[i] ? popupData.buttonLinks[i] : null
                  }
                  style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                  colorScheme="teal"
                >
                  {buttonTextItem}
                </Button>
              ))}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default PopupContainer;
