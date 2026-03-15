import {
  Modal,
  ModalContent,
  ModalBody,
  Image,
  Button,
  Heading,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { PopupButton } from './styles';

const EInvitePopup = ({ isOpen, onClose }) => {
  const INVITE_LINK =
    'https://drive.google.com/file/d/1hGR992prfRQLLMz0LLryksG01H4xCZCx/view';
  const modalSize = useBreakpointValue({ base: 'full', md: 'full' });

  const handleSaveImage = () => {
    window.open(INVITE_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalContent
        bg="linear-gradient(180deg, #FFF4C4 0%, #FFE4A3 25%, #FFD7A3 50%, #FFABC1 75%, #FF8FB3 100%)"
        borderRadius="0"
        maxH="100vh"
        margin="0"
        height="100vh"
      >
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100vh"
        >
          <Button
            {...PopupButton}
            bg="transparent"
            color="black"
            w="100%"
            mb={{base: 4, md: 8}}
            leftIcon={<ArrowBackIcon />}
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            onClick={onClose}
            justifyContent="flex-start"
          >
            Back
          </Button>
          <VStack spacing={8} align="center" w="full">
            <Heading
              textAlign="center"
              fontSize={{ base: '1.5em', md: '2.5em' }}
              fontFamily="Instrument Serif"
              fontStyle="italic"
              color="#512f00"
              textTransform="uppercase"
              lineHeight="0.97"
            >
              Share an E-Invite to a friend!
            </Heading>
            <Image
              height="488px"
              src={process.env.PUBLIC_URL + '/images/easter/e-invite.jpg'}
              alt="E-Invite Preview"
            />
            <Button
              {...PopupButton}
              bg="#533000"
              color="white"
              _hover={{
                bg: '#6d4000',
              }}
              onClick={handleSaveImage}
            >
              Save Image
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EInvitePopup;
