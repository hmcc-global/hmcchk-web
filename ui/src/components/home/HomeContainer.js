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
import PopupContainer from './PopupContainer';

const HomeContainer = (props) => {
  const { user } = props;

  //TODO: edit the useEffect to fetch API, pass info to popupcontainer compononent
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (Object.keys(user).length !== 0) setIsOpen(false);
  }, []);

  //For testing purpose
  const popup = {
    flag: true,
    title: 'Welcome Home',
    image: process.env.PUBLIC_URL + 'images/modal/welcome-back-modal.png',
    description:
      'HMCC With the recent updates regarding Covid-19 restrictions in Hong Kong, \n # hmcc \n we have an update as a church. Click button below to find out more!\n ## markdown is supported',
    button1Text: 'OUR LATEST COVID-19 POLICY',
    button1Link:
      'https://hongkong.sub.hmcc.net/urgent-announcements/hmcc-covid-19-safety-precautions/',
    button1Color: 'teal',
    button2Text: 'HELLO',
    button2Link: 'google.com',
    button2Color: 'gray',
    button3Text: 'TEST',
    button3Link: 'facebook.com',
    button3Color: 'red',
  };

  return (
    <Flex direction="column">
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <LifeGroupSection />
      <NewHereSection />
      {popup.flag && <PopupContainer props={popup} />}
    </Flex>
  );
};

export default HomeContainer;
