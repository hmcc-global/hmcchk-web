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
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
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
        <div>
          <img
            alt="img"
            src="https://img.freepik.com/free-photo/nature-journey-travel-trekking-summertime-concept-vertical-shot-pathway-park-leading-forested-area-outdoor-view-wooden-boardwalk-along-tall-pine-trees-morning-forest_343059-3064.jpg"
          />
        </div>
      );
    },
  },
  {
    content: () => {
      return (
        <div>
          <img
            alt="img"
            src="https://img.freepik.com/free-photo/vertical-shot-path-leading-waterfall-blue-cloudy-sky_181624-52369.jpg"
          />
        </div>
      );
    },
  },
  {
    content: () => {
      return (
        <div>
          <img
            alt="img"
            src="https://img.freepik.com/free-photo/nature-journey-travel-trekking-summertime-concept-vertical-shot-pathway-park-leading-forested-area-outdoor-view-wooden-boardwalk-along-tall-pine-trees-morning-forest_343059-3064.jpg"
          />
        </div>
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
    <Container maxW="100%" bg="#A85C58" borderRadius={bentoRadius}>
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
          rightIcon={<PlayCircleIcon />}
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
