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
  OrderedList,
  ListItem,
  HStack,
  Image,
  useMediaQuery
} from '@chakra-ui/react';

const OnlinePageButtons = (props) => {
  const { isGoodFri, isEaster } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDesktopMode] = useMediaQuery('(min-width:992px)');

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

  const GFResponseCardButton = () => {
    const { isOpen: isGFResponseOpen, onOpen: onGFResponseOpen, onClose: onGFResponseClose } = useDisclosure();
    return (
      <>
      <Modal size="4xl" isOpen={isGFResponseOpen} onClose={onGFResponseClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textStyle="Quicksand">Good Friday: Response Time Instructions</ModalHeader>
          <ModalBody textStyle="Quicksand">
            In this response time, we will be using Miro - an online collaborative whiteboard platform!
            <br/>

            { !isDesktopMode && (
              <span><b>NOTICE: </b> this response time is best experienced over a desktop!<br/></span>
            )}

            <br/>
            <OrderedList>
              <ListItem>
                <b>Please read this after the pastors give instructions.</b> In the meantime, enjoy the Good Friday Service.
              </ListItem>
              <ListItem>
                As we are going to the response time, <b>please listen carefully to the stream</b> for the instructions on how to 
                <b> access the Miro board in your LIFE Group Gather</b> and <b>what you will be doing on Miro.</b>
              </ListItem>
              <ListItem>
                <b>Here are some tips on how to navigate Miro:</b> 
                <OrderedList listStyleType="circle">
                  <ListItem>
                    To <b>zoom in/out</b> on the board, pinch your <b>trackpad</b> OR scroll on your <b>mouse.</b>
                  </ListItem>
                  <ListItem>
                    To <b>move around</b> on the board, hold the <b>spacebar</b> and <b>drag your cursor</b> around.
                  </ListItem>
                  <ListItem>
                    Press <b>N</b> to get a <b>Sticky Note.</b>
                  </ListItem>
                  <ListItem>
                    Pick a <b>color</b> and <b>click on the board</b> to paste the sticky note.
                  </ListItem>
                </OrderedList>
              </ListItem>
            </OrderedList>

            <br/>
            { isDesktopMode && (
              <HStack justifyContent="space-evenly">
                <Image src={`${process.env.PUBLIC_URL}/images/easter/response/1.png`} width="20em" height="auto" />
                <Image src={`${process.env.PUBLIC_URL}/images/easter/response/2.png`} width="20em" height="auto" />
              </HStack>
            )}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <Button
          variant="outline"
          width={['100%', '25%']}
          color="#935963"
          fontSize={['sm', 'md']}
          onClick={onGFResponseOpen}
          flex="auto"
          textStyle="Quicksand"
          bg="white"
        >
          Response Card
      </Button>
      </>
    )
  }

  const EasterConnectionButton = () => {
    return (
      <Button
        variant="outline"
        bg="white"
        color="#538EC7"
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

  const EasterPrayerButton = () => {
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
        color="#538EC7"
        textStyle="Quicksand"
      >
        Need Prayer?
      </Button>
    );
  }

  const EasterResponseCardButton = () => {
    return (
      <Button
          variant="outline"
          width={['100%', '25%']}
          color="#538EC7"
          fontSize={['sm', 'md']}
          as="a"
          href="/forms/625237b6f9f5d31b6a9ad9e4"
          target="_blank"
          flex="auto"
          textStyle="Quicksand"
          bg="white"
        >
          Response Card
      </Button>
    )
  }

  const renderConnectionButton = () => {
    if (isGoodFri) {
      return <GFConnectionButton />;
    } else if (isEaster) {
      return <EasterConnectionButton />;
    } else {
      return (
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
      )
    }
  }

  const renderPrayerButton = () => {
    if (isGoodFri) {
      return <GFPrayerButton />;
    } else if (isEaster) {
      return <EasterPrayerButton />;
    } else {
      return (
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
      )
    }
  }

  const renderResponseCard = () => {
    if (isGoodFri) {
      return <GFResponseCardButton />;
    } else if (isEaster) {
      return <EasterResponseCardButton />;
    }
  }

  return (
    <Stack direction={['column', 'row']}>
      {renderConnectionButton()}
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
      {renderPrayerButton()}
      { isEaster && 
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
      }
      { (isGoodFri || isEaster) ?
        renderResponseCard()
      : (
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
