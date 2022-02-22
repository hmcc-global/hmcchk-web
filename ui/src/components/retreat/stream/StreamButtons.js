import {
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import '@fontsource/sora';
import '@fontsource/inter';

const StreamButtons = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack direction={['column', 'row']} marginTop={[4, 8]}>
        <Button
          width="100%"
          bg="#6DCED3"
          color="white"
          fontSize={['md', 'xl']}
          as="a"
          href="/with-everything/resources"
          target="_blank"
          padding={[4, 8]}
          borderRadius={17}
          textStyle="sora"
          _hover={{ opacity: '0.9', transform: 'scale(1.0125)' }}
        >
          Other resources
        </Button>
        <Button
          width="100%"
          bg="#FFC632"
          color="white"
          fontSize={['md', 'xl']}
          as="a"
          href="https://hongkong.sub.hmcc.net/wp-content/uploads/booklet.pdf"
          target="_blank"
          padding={[4, 8]}
          borderRadius={17}
          textStyle="sora"
          _hover={{ opacity: '0.9', transform: 'scale(1.0125)' }}
        >
          Download CWC Booklet
        </Button>
      </Stack>
      <Stack
        direction={['column', 'row']}
        marginTop={['0.5em !important', '1em !important']}
      >
        <Button
          width="100%"
          bg="#F39371"
          color="white"
          fontSize={['md', 'xl']}
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
          align="center"
          as="a"
          href="https://bit.ly/hmcc-prayer"
          target="_blank"
          padding={[4, 8]}
          borderRadius={17}
          textStyle="sora"
          _hover={{ opacity: '0.9', transform: 'scale(1.0125)' }}
        >
          Need Prayer?
        </Button>
        <Button
          width="100%"
          fontSize={['md', 'xl']}
          bg="#FFFFFF"
          color="black"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
          onClick={onOpen}
          padding={[4, 8]}
          borderRadius={17}
          textStyle="sora"
          _hover={{ opacity: '0.9', transform: 'scale(1.0125)' }}
        >
          Connection Issues
        </Button>
        <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Connection Issues</ModalHeader>
            <ModalBody>
              In cases where the livestream video is not working, please{' '}
              <u>hard refresh</u> using the following commands: <br />
              <br />
              <b>On a PC:</b> Press CTRL + SHIFT + R <br />
              <b>On a Mac (Chrome):</b> Press CMD + SHIFT + R <br />
              <b>On a Mac (Safari):</b> Press CMD + OPTION + E (afterwards) CMD
              + R
              <br />
              <br />
              This refreshes your browser's content and ensures proper loading
              of up-to-date page content. Alternatively, you can choose to open
              the site through incognito browsing.
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
      </Stack>
    </>
  );
};

export default StreamButtons;
