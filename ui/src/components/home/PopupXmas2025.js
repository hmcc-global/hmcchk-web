import {
  Box,
  Modal,
  ModalCloseButton,
  Image,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const PopupXmas2025 = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose} p={0}>
      <ModalOverlay />
      <ModalContent
        borderRadius="20"
        alignItems={'center'}
        backgroundImage={
          process.env.PUBLIC_URL + '/images/home/xmas-2025-bg.svg'
        }
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        p={0}
        position="relative"
      >
        <ModalHeader position="relative" py={{ base: 10, lg: 5 }}>
          {/* Overlaid GIF - covers entire header */}
          <Image
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            src={process.env.PUBLIC_URL + '/images/home/snowflakes.gif'}
            objectFit="cover"
            borderTopLeftRadius="20"
            borderTopRightRadius="20"
            pointerEvents="none"
            opacity="0.1"
            zIndex="1"
          />

          {/* Content with higher z-index */}
          <Box position="relative" zIndex="2">
            <Image
              width="100%"
              height="100%"
              src={process.env.PUBLIC_URL + '/images/home/xmas-2025-header.svg'}
              objectFit="cover"
              pointerEvents="none"
            />
          </Box>
        </ModalHeader>
        <ModalCloseButton color={'#FFFFFF'} />
        <ModalBody
          px={[8, 16]}
          fontSize={{ base: '0.875rem', lg: '1rem' }}
          display="flex"
          flexDirection="column"
          rowGap="4"
          bgGradient="linear(to-b, rgba(193, 222, 255, 0.9) 0%, rgba(70, 98, 130, 0.95) 80%)"
          pt="6"
          pb="6"
          borderBottomLeftRadius="20"
          borderBottomRightRadius="20"
        >
          {/* Title */}
          <Text
            fontWeight="900"
            fontSize={{ base: '1.4375rem', lg: '1.6875rem' }}
            color={'#0A2677'}
            fontFamily="DMSerifDisplay_Regular"
            textAlign="center"
            textShadow="0px 0px 10px rgba(255, 255, 255, 0.9)"
          >
            You are Invited to the Night of Christmas!
          </Text>
          {/* Description */}
          <Box color="#0A2677" textAlign="justify" fontFamily="Manrope">
            <ReactMarkdown
              components={ChakraUIRenderer()}
              children={`Come join us as we anticipate the arrival of our Savior, Jesus! We would love to have you as we worship and reflect on the hope of Jesus' birth.`}
              skipHtml
            />
          </Box>
          {/* Event Details */}
          <Box
            color="#DEF1F5"
            textAlign="center"
            fontFamily="Manrope"
            textShadow="0px 0px 10px rgba(255, 255, 255, 0.5)"
          >
            <ReactMarkdown
              components={ChakraUIRenderer()}
              children={`When: **December 24, Evening** \ 
                Where: **Transformation Center**`}
              skipHtml
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PopupXmas2025;
