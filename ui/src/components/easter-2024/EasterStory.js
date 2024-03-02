import {
  Box,
  Button,
  Container,
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

const stories = [
  {
    content: ({ action }) => {
      return (
        <>
          <img
            alt="story1"
            onClick={() => {
              action('next');
            }}
            src={process.env.PUBLIC_URL + '/images/easter-2024/story1.png'}
          />
        </>
      );
    },
  },
  {
    content: () => {
      return (
        <>
          <img
            alt="story2"
            src={process.env.PUBLIC_URL + '/images/easter-2024/story2.png'}
          />
        </>
      );
    },
  },
  {
    content: () => {
      return (
        <>
          <img
            alt="story3"
            src={process.env.PUBLIC_URL + '/images/easter-2024/story3.png'}
          />
        </>
      );
    },
  },
  {
    content: () => {
      return (
        <>
          <img
            alt="story4"
            src={process.env.PUBLIC_URL + '/images/easter-2024/story4.png'}
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
    <Container
      maxW="100%"
      bg="#A85C58"
      borderRadius={bentoRadius}
      id="easter-2024-story"
    >
      <Box
        display="flex"
        flexDir={'row'}
        py={'15px'}
        px={'10px'}
        justifyContent="space-between"
        alignItems="center"
        color="white"
        fontWeight={900}
        fontSize={{ base: subheadingFontSize, lg: headingFontSizeDesktop }}
      >
        <Text>THE STORY OF PASSION WEEK</Text>

        <Button
          onClick={onOpen}
          rightIcon={<MdOutlinePlayCircleFilled />}
          borderRadius={buttonRadius}
          width={{ base: 40, lg: 60 }}
          border="1px solid #000000"
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

      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <Stories
            preloadCount={4}
            keyboardNavigation
            stories={stories}
            defaultInterval={3500}
            progressWrapperStyles={wrapperStyles}
            progressStyles={styles}
            width={320}
            height={470}
          />
        </ModalContent>
      </Modal>
    </Container>
  );
};
