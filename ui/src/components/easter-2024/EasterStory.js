import {
  Box,
  Button,
  Container,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import Stories from 'react-insta-stories';
import { MdOutlinePlayCircleFilled } from 'react-icons/md';
import {
  bentoRadius,
  headingFontSizeDesktop,
  buttonRadius,
  subheadingFontSize,
  bodyFontSizeMobile,
  bodyFontSizeDesktop,
} from './constants';

// need to add the stories later
const stories = [
  {
    content: () => {
      return (
        <>
          <Image
            src={process.env.PUBLIC_URL + '/images/easter-2024/what.svg'}
          />
        </>
      );
    },
  },
  {
    content: () => {
      return (
        <>
          <Image src={process.env.PUBLIC_URL + '/images/easter-2024/why.svg'} />
        </>
      );
    },
  },
  {
    content: () => {
      return (
        <>
          <Image
            src={
              process.env.PUBLIC_URL + '/images/easter-2024/how_it_relates.svg'
            }
          />
        </>
      );
    },
  },
  {
    content: () => {
      return (
        <>
          <Image
            src={
              process.env.PUBLIC_URL +
              '/images/easter-2024/how_to_participate.svg'
            }
          />
        </>
      );
    },
  },
];

const styles = {
  background: '#FB8E4E',
};

const wrapperStyles = {
  background: 'white',
};

export const EasterStory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxW="100%" bg="#A85C58" borderRadius={bentoRadius} id="easter-2024-story">
      <Box
        display="flex"
        padding={4}
        justifyContent="space-between"
        alignItems="center"
        color="white"
        fontWeight={900}
        fontSize={{ base: subheadingFontSize, lg: headingFontSizeDesktop }}
      >
        THE STORY OF PASSION WEEK
        <Button
          onClick={onOpen}
          rightIcon={<MdOutlinePlayCircleFilled />}
          borderRadius={buttonRadius}
          size="sm"
          width={{ base: 40, lg: 60 }}
          border="1px"
          borderColor="black"
          color="black"
        >
          <Text
            as="i"
            fontWeight={700}
            fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
            fontFamily={'Cousine'}
          >
            View
          </Text>
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <Stories
            keyboardNavigation
            stories={stories}
            defaultInterval={3000}
            progressWrapperStyles={wrapperStyles}
            progressStyles={styles}
            // remove this later
            width={{ base: 200, lg: 420 }}
            height={{ base: 300, lg: 650 }}
          />
        </ModalContent>
      </Modal>
    </Container>
  );
};
