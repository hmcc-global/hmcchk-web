import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import AboutSection from './AboutSection';
import EventsSection from './EventsSection';
import HeroSection from './HeroSection';
import LifeGroupSection from './LifeGroupSection';
import NewHereSection from './NewHereSection';
import PopupContainer from './PopupContainer';
import HelloSermonSection from './HelloSermonSection';
import { customAxios as axios } from '../helpers/customAxios';
import SaturateVisionSection from './SaturateVisionSection';
import VisionMissionSection from './VisionMissionSection';
import VisionMissionSectionMobile from './VisionMissionSectionMobile';

const HomeContainer = (props) => {
  const { user } = props;
  const sermonRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [popupInfo, setPopupInfo] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get('/api/popup/get-published');
      setPopupInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [_isOpen, setIsOpen] = useState(true);
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
    <Flex direction="column" bgColor="#F6FAFF">
      <HeroSection />
      <EventsSection />
      <HelloSermonSection ref={sermonRef} />
      <AboutSection />
      <SaturateVisionSection />

      <LifeGroupSection />
      <NewHereSection />
      {isMobile ? <VisionMissionSectionMobile /> : <VisionMissionSection />}

      {popup.flag && <PopupContainer props={popup} />}
    </Flex>
  );
};

export default HomeContainer;
