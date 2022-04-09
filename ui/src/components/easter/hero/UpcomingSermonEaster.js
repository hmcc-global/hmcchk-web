import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CloseButton,
  Stack,
  Center,
  Link,
  Text,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';

const UpcomingSermonEaster = ({ upcoming }) => {
  const [displayModal, setDisplayModal] = useState('none');
  let upcomingSeries = 'Series';
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

  const WebViewFriday = () => {
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
              color="#642444"
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
          <Stack direction="row"></Stack>
          <Button
            alignSelf="center"
            height="auto"
            as={Link}
            p="2"
            background="#E79CA6"
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

  const MobileViewFriday = () => {
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
              color="#642444"
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
                color="#642444"
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
              background="#E79CA6"
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

  const WebViewSunday = () => {
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

  const MobileViewSunday = () => {
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
  // let currDate = new Date('17 Apr 2022 02:30:00 UTC');
  let currDate = new Date();
  const goodFriday = new Date('15 Apr 2022 11:30:00 UTC'); //11:30 am UTC is 19:30 PM HKT
  const goodFridayEnd = new Date ('15 Apr 2022 15:30:00 UTC');
  const easterSunday = new Date('17 Apr 2022 02:00:00 UTC'); //2:30 am UTC is 10:00 AM HKT
  const easterSundayEnd = new Date('17 Apr 2022 05:00:00 UTC');
  return (
    <>
      {(currDate >= goodFriday && currDate <= goodFridayEnd) ? <WebViewFriday /> : null}
      {(currDate >= goodFriday && currDate <= goodFridayEnd) ? <MobileViewFriday /> : null}
      {(currDate >= easterSunday && currDate <= easterSundayEnd) ? <WebViewSunday /> : null}
      {(currDate >= easterSunday && currDate <= easterSundayEnd) ? <MobileViewSunday /> : null}
    </>
  );
};

export default UpcomingSermonEaster;
