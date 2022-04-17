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

const PopUp = () => {
  const [displayModal, setDisplayModal] = useState('none');
  useEffect(() => {
    setTimeout(() => {
      setDisplayModal('unset');
    }, 2000);
  }, []);

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
        maxW="30%"
        textAlign="center"
        width={{ base: 'none', md: '200' }}
        background="#FFFFFF"
        boxShadow="0px 3px 4px 2px rgba(0, 0, 0, 0.3)"
        borderRadius="20px"
        display={{ base: 'none', md: displayModal }}
        px={[2, 4]}
        py={[2, 4]}
        zIndex="sticky"
      >
        <Box w="100%" mb={5}>
          <CloseButton float="right" onClick={closeModal} size="sm" />
        </Box>
        <Stack w="100%" direction="column">
          <Stack direction="row" spacing="auto">
            <Text fontSize="lg" textStyle="Quicksand_bold" color="#642444">
              The online Good Friday stream is now{' '}
              <Text
                fontSize="lg"
                textStyle="Quicksand_bolder"
                textDecorationLine="underline"
                background="none"
                as="span"
              >
                LIVE
              </Text>
            </Text>
          </Stack>
          <Button
            alignSelf="center"
            height="auto"
            as={Link}
            px={4}
            py={2}
            background="#E79CA6"
            color="#ffffff"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            href="/online"
          >
            <Text fontSize="md" textStyle="Quicksand_bold">
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
        p="4"
        zIndex="sticky"
        boxShadow="0px 3px 4px 2px rgba(0, 0, 0, 0.3)"
        borderRadius="20px"
      >
        <Stack direction="column">
          <Stack direction="column" spacing={1}>
            <CloseButton onClick={closeModal} size="md" alignSelf="flex-end" />
            <Text
              fontSize="lg"
              textStyle="Quicksand_bold"
              color="#642444"
              justifyContent={'center'}
              textAlign="center"
              lineHeight="2em"
            >
              The online Good Friday stream is now{' '}
              <Text
                fontSize="lg"
                textStyle="Quicksand_bolder"
                textDecorationLine="underline"
                display="inline"
                color="#642444"
                as="span"
              >
                LIVE
              </Text>
            </Text>
          </Stack>
          <Center w="100%">
            <Button
              as={Link}
              py="2"
              px="8"
              background="#E79CA6"
              color="#ffffff"
              backdropFilter="blur(6px)"
              borderRadius="10px"
              href="/online"
            >
              <Text fontSize="md" textStyle="Quicksand_bold">
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
        maxW="30%"
        textAlign="center"
        width={{ base: 'none', md: '200' }}
        background="#FFFFFF"
        boxShadow="0px 3px 4px 2px rgba(0, 0, 0, 0.3)"
        borderRadius="20px"
        display={{ base: 'none', md: displayModal }}
        px={[2, 4]}
        py={[2, 4]}
        zIndex="sticky"
      >
        <Box w="100%" mb={5}>
          <CloseButton float="right" onClick={closeModal} size="sm" />
        </Box>
        <Stack w="100%" direction="column">
          <Stack direction="row" spacing="auto">
            <Text fontSize="lg" textStyle="Quicksand_bold" color="#003984">
              The online Easter Celebration stream is now{' '}
              <Text
                fontSize="md"
                textStyle="Quicksand_bolder"
                textDecorationLine="underline"
                background="none"
                as="span"
              >
                LIVE
              </Text>
            </Text>
          </Stack>
          <Button
            alignSelf="center"
            height="auto"
            as={Link}
            px={4}
            py={2}
            background="#537893"
            color="#ffffff"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            href="/online"
          >
            <Text fontSize="md" textStyle="Quicksand_bold">
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
        p="4"
        zIndex="sticky"
        boxShadow="0px 3px 4px 2px rgba(0, 0, 0, 0.3)"
        borderRadius="20px"
      >
        <Stack direction="column">
          <Stack direction="column" spacing={1}>
            <CloseButton onClick={closeModal} size="md" alignSelf="flex-end" />
            <Text
              fontSize="lg"
              textStyle="Quicksand_bold"
              color="#003984"
              justifyContent={'center'}
              textAlign="center"
            >
              The online Easter Celebration stream is now{' '}
              <Text
                fontSize="lg"
                textStyle="Quicksand_bolder"
                textDecorationLine="underline"
                display="inline"
                color="#003984"
                as="span"
              >
                LIVE
              </Text>
            </Text>
          </Stack>
          <Center w="100%">
            <Button
              as={Link}
              py="2"
              px="8"
              background="#537893"
              color="#ffffff"
              backdropFilter="blur(6px)"
              borderRadius="10px"
              href="/online"
            >
              <Text fontSize="md" textStyle="Quicksand_bold">
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
  const goodFriday = new Date('15 Apr 2022 11:25:00 UTC'); //11:30 am UTC is 19:30 PM HKT
  const goodFridayEnd = new Date('15 Apr 2022 15:30:00 UTC');
  const easterSunday = new Date('17 Apr 2022 01:55:00 UTC'); //2:30 am UTC is 10:00 AM HKT
  const easterSundayEnd = new Date('17 Apr 2022 05:00:00 UTC');
  return (
    <>
      {currDate >= goodFriday && currDate <= goodFridayEnd ? (
        <>
          <WebViewFriday />
          <MobileViewFriday />
        </>
      ) : null}
      {currDate >= easterSunday && currDate <= easterSundayEnd ? (
        <>
          <WebViewSunday />
          <MobileViewSunday />
        </>
      ) : null}
    </>
  );
};

export default PopUp;
