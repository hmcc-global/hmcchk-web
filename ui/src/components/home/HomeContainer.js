import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import AboutSection from './AboutSection';
import EventsSection from './EventsSection';
import HeroSection from './HeroSection';
import LifeGroupSection from './LifeGroupSection';
import NewHereSection from './NewHereSection';
import PopupContainer from './PopupContainer';
import { customAxios as axios } from '../helpers/customAxios';

const HomeContainer = (props) => {
  const { user } = props;
  const [popupInfo, setPopupInfo] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get('/api/popup/get');
      setPopupInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (Object.keys(user).length !== 0) setIsOpen(false);
    getData();
  }, []);

  const popup = {
    flag: popupInfo.isPublished,
    title: popupInfo.title,
    image: popupInfo.imageLink,
    description: popupInfo.description,
    buttonText: popupInfo.buttonTexts,
    buttonLink: popupInfo.buttonLinks,
    buttonColor: 'teal',
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
