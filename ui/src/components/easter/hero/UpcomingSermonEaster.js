import React, { useState, useEffect } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  CloseButton,
  Stack,
  Center,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';

const UpcomingSermonEaster = ({ upcoming }) => {
  const [displayModal, setDisplayModal] = useState('none');
  let today = DateTime.now();

  //let goodFriday = DateTime("04/15/2022 19:25 AM")
  let upcomingSeries = 'Series';
  let sermonImage = 'Image';
  let sermonDesc = 'Desc';
  let sermonTitle = 'Title';
  if (upcoming != null) {
    // upcomingSeries = upcoming.filter((event) => {
    //   if (
    //     event.time == "10:00 AM" &&
    //     event.title.replace(/ .*/, "") == "Sunday"
    //   )
    //     return event;
    // })[0];
    // if (upcomingSeries != null) {
    // //   sermonImage = upcomingSeries.imageUrl;
    // //   sermonDesc = upcomingSeries.description;
    // //   sermonTitle = upcomingSeries.title;
    // }
  }

  useEffect(() => {
    //set display to none if date +7 from start date
    setTimeout(() => {
      if (upcoming != null && upcomingSeries != null) {
        let upcomingSermonDateT7 = DateTime.fromISO(
          upcomingSeries.startDate
        ).plus({ days: 7 });
        let today = DateTime.now();
        setDisplayModal(today >= upcomingSermonDateT7 ? 'none' : 'unset');
      } else {
        setDisplayModal('none');
      }
    }, 2000); //time in ms
  }, [upcoming, upcomingSeries]);

  const closeModal = () => {
    setDisplayModal('none');
  };

  const WebView = () => {
    return (
      <Box
        position="absolute"
        right="25px"
        top="10px"
        height="auto"
        maxW="85%"
        width={{ base: 'none', md: '200' }}
        background="#FFFFFF"
        boxShadow="0px 3px 4px 2px rgba(0, 0, 0, 0.3)"
        borderRadius="20px"
        display={{ base: 'none', md: displayModal }}
        px={[2, 4]}
        py={[2, 4]}
        zIndex="sticky"
      >
        <Stack direction="column">
          <Stack direction="row" spacing="auto">
            <Text
              fontSize="30"
              marginTop="10px"
              textStyle="Quicksand_bold"
              color="#003984"
            >
              The online Passion Experience page is now
              <Text
                fontSize="40"
                textStyle="Quicksand_bolder"
                textDecorationLine="underline"
                background="none"
                paddingLeft="45%"
              >
                LIVE
              </Text>
            </Text>
            <CloseButton onClick={closeModal} size="sm" />
          </Stack>
          {/* <Text color="#0628A3">{sermonTitle}</Text> */}
          <Stack direction="row"></Stack>
          <Button
            alignSelf="center"
            height="auto"
            as={Link}
            p="2"
            background="#537893"
            color="#ffffff"
            width="30%"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            href="/online"
          >
            <Text fontSize="20" textStyle="Quicksand_bold">
              Check it out!
            </Text>
          </Button>
        </Stack>
      </Box>
    );
  };

  const MobileView = () => {
    return (
      <Box
        position="absolute"
        right="10px"
        minH="fit"
        height="fit-content"
        width="90vw"
        background="#FFFFFF"
        display={{ base: displayModal, md: 'none' }}
        p="6"
        zIndex="sticky"
        boxShadow="0px 3px 4px 2px rgba(0, 0, 0, 0.3)"
        borderRadius="20px"
      >
        <Stack direction="column">
          <Stack direction="column" spacing={0}>
            <CloseButton onClick={closeModal} size="lg" alignSelf="flex-end" />
            <Text
              fontSize="25"
              marginTop="10px"
              textStyle="Quicksand_bold"
              color="#003984"
              justifyContent={'center'}
              textAlign="center"
            >
              The online Passion Experience page is now{' '}
              <Text
                fontSize="40"
                //paddingLeft = "35%"
                textStyle="Quicksand_bolder"
                textDecorationLine="underline"
                display="inline"
                color="#003984"
              >
                LIVE
              </Text>
            </Text>
          </Stack>
          <Center>
            <Button
              alignSelf="center"
              height="auto"
              as={Link}
              p="2"
              background="#537893"
              top="2"
              color="#ffffff"
              width="80%"
              backdropFilter="blur(6px)"
              borderRadius="10px"
              href="/online"
            >
              <Text fontSize="20" textStyle="Quicksand_bold">
                Check it out!
              </Text>
            </Button>
          </Center>
        </Stack>
      </Box>
    );
  };

  let currDate = new Date('10 Apr 2022 11:30:00 UTC');
  const goodFriday = new Date('9 Apr 2022 11:30:00 UTC'); //11:30 am UTC is 19:30 PM HKT
  const easterSunday = new Date('17 Apr 2022 02:00:00 UTC'); //2:30 am UTC is 10:00 AM HKT

  return (
    <>
      {currDate >= goodFriday ? <WebView /> : null}
      {currDate >= goodFriday ? <MobileView /> : null}
    </>
  );
};

export default UpcomingSermonEaster;
