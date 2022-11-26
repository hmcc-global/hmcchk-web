import { Flex } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import AboutSection from './AboutSection';
import EventsSection from './EventsSection';
import HeroSection from './HeroSection';
import LifeGroupSection from './LifeGroupSection';
import NewHereSection from './NewHereSection';
import PopupContainer from './PopupContainer';
import HelloSermonSection from './HelloSermonSection';
import { customAxios as axios } from '../helpers/customAxios';
import WitnessSection from '../witness/WitnessSection';
import MailingListForm from './MailingListForm';
import { DateTime } from 'luxon';

const HomeContainer = (props) => {
  const { user } = props;
  const sermonRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState([]);
  const [userSignedUp, setUserSignedUp] = useState(false);
  const getData = async () => {
    try {
      const { data } = await axios.get('/api/popup/get-published');
      setPopupInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMailingList = async (user) => {
    try {
      const { data } = await axios.get('/api/mailingList/get', {
        params: {
          email: user.email,
          category: 'advent',
        },
      });
      setUserSignedUp(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (Object.keys(user).length !== 0) setIsOpen(false);
    getData();
    props.user.email && getMailingList(props.user);
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
      <HeroSection anchorTarget={sermonRef} />
      <HelloSermonSection ref={sermonRef} />
      <WitnessSection />
      <AboutSection />
      <EventsSection />
      <LifeGroupSection />
      <NewHereSection />
      {popup.flag && <PopupContainer props={popup} />}
      {!popup.flag && !userSignedUp && DateTime.now().ts < 1670169599000 && (
        <MailingListForm props={user} />
      )}
    </Flex>
  );
};

export default HomeContainer;
