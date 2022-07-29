import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalCloseButton,
  Image,
  ModalContent,
  AspectRatio,
  ModalOverlay,
  useBreakpointValue,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const PopupContainer = ({ props }) => {
  const popupData = props;
  console.log(popupData);
  console.log(popupData.button1Text.length);

  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="20">
        <AspectRatio mb="5" width="100%" ratio={16 / 9}>
          <Image
            borderTopLeftRadius="20"
            borderTopRightRadius="20"
            src={popupData.image}
            objectFit="cover"
          />
        </AspectRatio>
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
            spacing={[0, 2]}
            w="100%"
            variant="outline"
            colorScheme="gray"
          >
            {popupData.button1Text.length > 0 && (
              <Button
                flex={[false, 1]}
                as={Link}
                target="_blank"
                href={popupData.button1Link ? popupData.button1Link : null}
                style={{
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                }}
                colorScheme={popupData.button1Color}
              >
                {popupData.button1Text}
              </Button>
            )}
            {popupData.button2Text.length > 0 && (
              <Button
                flex={[false, 1]}
                as={Link}
                target="_blank"
                href={popupData.button2Link ? popupData.button2Link : null}
                colorScheme={popupData.button2Color}
              >
                {popupData.button2Text}
              </Button>
            )}
            {popupData.button3Text.length > 0 && (
              <Button
                flex={[false, 1]}
                as={Link}
                target="_blank"
                href={popupData.button3Link ? popupData.button3Link : null}
                colorScheme={popupData.button3Color}
              >
                {popupData.button3Text}
              </Button>
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default PopupContainer;
