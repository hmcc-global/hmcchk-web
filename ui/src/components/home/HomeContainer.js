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

import AboutSection from './AboutSection';
import EventsSection from './EventsSection';
import HeroSection from './HeroSection';
import LifeGroupSection from './LifeGroupSection';
import NewHereSection from './NewHereSection';

const HomeContainer = (props) => {
  const { user } = props;
  const [isOpen, setIsOpen] = useState(true);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) setIsOpen(false);
  }, []);

  {
    /* define content of popup here*/
  }
  const popupFlag = true;
  const popupTitle = 'Welcome Home';
  const popupImage =
    process.env.PUBLIC_URL + 'images/modal/welcome-back-modal.png';
  const popupDescription =
    'HMCC With the recent updates regarding Covid-19 restrictions in Hong Kong, \n # hmcc \n we have an update as a church. Click button below to find out more!\n ## markdown is supported';
  const popupButton1Text = 'OUR LATEST COVID-19 POLICY';
  const popupButton1Link =
    'https://hongkong.sub.hmcc.net/urgent-announcements/hmcc-covid-19-safety-precautions/';
  const popupButton1Color = 'teal';
  const popupButton2Text = 'HELLO';
  const popupButton2Link = 'google.com';
  const popupButton2Color = 'gray';
  const popupButton3Text = 'TEST';
  const popupButton3Link = 'facebook.com';
  const popupButton3Color = 'red';

  return (
    <Flex direction="column">
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <LifeGroupSection />
      <NewHereSection />
      {popupFlag && (
        <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent borderRadius="20">
            <AspectRatio mb="5" width="100%" ratio={16 / 9}>
              <Image
                borderTopLeftRadius="20"
                borderTopRightRadius="20"
                src={popupImage}
                objectFit="cover"
              />
            </AspectRatio>
            <ModalCloseButton />
            {popupTitle && (
              <ModalHeader
                ml={[0, 16]}
                mr={[0, 16]}
                fontWeight="900"
                fontSize={['2xl', '3xl']}
              >
                {popupTitle}
              </ModalHeader>
            )}
            <ModalBody ml={[0, 16]} mr={[0, 16]}>
              <Box fontSize="sm" mt="5" color="#4C80A5" textAlign="justify">
                <ReactMarkdown
                  components={ChakraUIRenderer()}
                  children={popupDescription}
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
                {popupButton1Text.length > 0 && (
                  <Button
                    flex={[false, 1]}
                    as={Link}
                    target="_blank"
                    href={popupButton1Link ? popupButton1Link : null}
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                    colorScheme={popupButton1Color}
                  >
                    {popupButton1Text}
                  </Button>
                )}
                {popupButton2Text.length > 0 && (
                  <Button
                    flex={[false, 1]}
                    as={Link}
                    target="_blank"
                    href={popupButton2Link ? popupButton2Link : null}
                    colorScheme={popupButton2Color}
                  >
                    {popupButton2Text}
                  </Button>
                )}
                {popupButton3Text.length > 0 && (
                  <Button
                    flex={[false, 1]}
                    as={Link}
                    target="_blank"
                    href={popupButton3Link ? popupButton3Link : null}
                    colorScheme={popupButton3Color}
                  >
                    {popupButton3Text}
                  </Button>
                )}
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default HomeContainer;
