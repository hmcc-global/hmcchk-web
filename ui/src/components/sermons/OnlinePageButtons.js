import {
  Button,
  Stack,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const OnlinePageButtons = (props) => {
  const { isGoodFri } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const GFConnectionButton = () => {
    return (
      <Button
        variant="outline"
        bg="white"
        color="#935963"
        width={['100%', '25%']}
        fontSize={['sm', 'md']}
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
        onClick={onOpen}
        flex="auto"
        textStyle="Quicksand"
      >
        Connection Issues
      </Button>
    )
  }

  const GFPrayerButton = () => {
    return (
      <Button
        bg="white"
        variant="outline"
        width={['100%', '25%']}
        fontSize={['sm', 'md']}
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
        align="center"
        as="a"
        href="https://bit.ly/hmcc-prayer"
        target="_blank"
        flex="auto"
        color="#935963"
        textStyle="Quicksand"
      >
        Need Prayer?
      </Button>
    );
  }


  return (
    <Stack direction={['column', 'row']}>
      { isGoodFri ? (
        <GFConnectionButton />
      ) : (
        <Button
          width={['100%', '25%']}
          fontSize={['sm', 'md']}
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
          onClick={onOpen}
        >
          Connection Issues
        </Button>
      )}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Connection Issues</ModalHeader>
          <ModalBody>
            In cases where the livestream video is not working or sermon notes
            are not up to date, please <u>hard refresh</u> using the following
            commands: <br />
            <br />
            <b>On a PC:</b> Press CTRL + SHIFT + R <br />
            <b>On a Mac (Chrome):</b> Press CMD + SHIFT + R <br />
            <b>On a Mac (Safari):</b> Press CMD + OPTION + E (afterwards) CMD +
            R
            <br />
            <br />
            This refreshes your browser's content and ensures proper loading of
            up-to-date page content. Alternatively, you can choose to open the
            site through incognito browsing.
            <br />
            <br />
            If you have issues loading the video stream on this site, please try
            and access the stream at{' '}
            <Link
              href="https://youtube.com/c/hmcchk"
              fontStyle="italic"
              color="blue"
              target="_blank"
            >
              https://youtube.com/c/hmcchk
            </Link>{' '}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      { isGoodFri ? (
        <GFPrayerButton />
      ) : (
        <Button
          variant="outline"
          width={['100%', '25%']}
          fontSize={['sm', 'md']}
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
          align="center"
          as="a"
          href="https://bit.ly/hmcc-prayer"
          target="_blank"
        >
          Need Prayer?
        </Button>
      )}
      { isGoodFri ? (
        <Button
          variant="outline"
          width={['100%', '25%']}
          color="#935963"
          fontSize={['sm', 'md']}
          as="a"
          // TODO-aparedan: Put link to response form
          href="/give"
          target="_blank"
          flex="auto"
          textStyle="Quicksand"
          bg="white"
        >
          Response Card
        </Button>
      ) : (
        <>
          <Button
            width={['100%', '25%']}
            bg="#0628A3"
            color="white"
            fontSize={['sm', 'md']}
            as="a"
            href="/give"
            target="_blank"
          >
            Giving
          </Button>
          <Button
            width={['100%', '25%']}
            color="#0628A3"
            fontSize={['sm', 'md']}
            as="a"
            href="/events"
            target="_blank"
            isTruncated
          >
            Events
          </Button>
        </>
      )}
    </Stack>
  );
};

export default OnlinePageButtons;
