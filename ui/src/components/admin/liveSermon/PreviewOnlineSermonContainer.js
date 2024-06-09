import React, { useEffect, useState } from 'react';
import {
  HStack,
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Link,
  Text,
  Container,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import OnlinePageButtons from '../../sermons/OnlinePageButtons';
import OnlinePageTabs from '../../sermons/OnlinePageTabs';
import { DateTime } from 'luxon';

const PreviewOnlineSermonContainer = (props) => {
  const { isPreviewing, setIsPreviewing, data, user, history } = props;

  const [title, setTitle] = useState('');
  const [sermonDescription, setSermonDescription] = useState('');
  const [streamLink, setStreamLink] = useState('');
  const [sermonNotes, setSermonNotes] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [sermonSeries, setSermonSeries] = useState('');
  const [sermonPassage, setSermonPassage] = useState('');
  const [sermonDateTime, setSermonDateTime] = useState('');

  useEffect(() => {
    if (isPreviewing) {
      setTitle(data.title);
      setSermonDescription(data.sermonDescription);
      setStreamLink(data.streamLink);
      setSermonNotes(data.sermonNotes);
      setSpeaker(data.speaker);
      setSermonSeries(data.sermonSeries);
      setSermonPassage(data.sermonPassage);
      setSermonDateTime(data.sermonDateTime);
    }

    setIsPreviewing(false);
  }, [data, isPreviewing, setIsPreviewing]);

  const getSermonDate = () => {
    if (sermonDateTime) {
      return DateTime.fromISO(sermonDateTime).toFormat('dd MMM yyyy');
    }
  };

  const getSermonTime = () => {
    if (sermonDateTime) {
      return DateTime.fromISO(sermonDateTime).toFormat('hh:mm a');
    }
  };

  return (
    <Container maxW={{ base: '100%', lg: '85%' }}>
      <VStack>
        <Link alignSelf="baseline">
          <Button
            variant="link"
            fontSize="lg"
            color="black"
            justifyContent="left"
            leftIcon={<ChevronLeftIcon />}
            display={{ base: 'none', md: 'flex' }}
          >
            See all past sermons
          </Button>
        </Link>
        <Box
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'center', lg: 'unset' }}
          w="100%"
        >
          <Box mb="20px" w={{ base: '100%', lg: '50%' }}>
            <VStack alignItems="left" alignContent="left">
              <AspectRatio
                mb="5"
                width="100%"
                ratio={16 / 9}
                backgroundColor="#F1F1F3"
              >
                <iframe
                  width="560"
                  height="315"
                  src={streamLink}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
                  allowFullScreen
                ></iframe>
              </AspectRatio>

              <Text fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }}>
                {title}
              </Text>
              <Stack spacing={8}>
                <Box>
                  <Stack
                    spacing={{ base: 'normal', md: 'auto' }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <HStack>
                      <Text fontWeight="bold">Speaker:</Text>
                      <Text>{speaker}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Date: </Text>
                      <Text>{getSermonDate()}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Time: </Text>
                      <Text>{getSermonTime()}</Text>
                    </HStack>
                  </Stack>
                  <Stack
                    spacing={{ base: 'normal', md: 'auto' }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <HStack>
                      <Text fontWeight="bold">Series: </Text>
                      <Text>{sermonSeries}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Passage:</Text>
                      <Text>{sermonPassage}</Text>
                    </HStack>
                  </Stack>
                </Box>
                <OnlinePageButtons />
                <Box bgColor="#F1F1F3" p={5} borderRadius={15}>
                  <Text fontWeight="bold" color="#0628A3" fontSize="md">
                    Description:
                  </Text>
                  <Text>{sermonDescription}</Text>
                </Box>
              </Stack>
            </VStack>
          </Box>
          <Box
            ml={{ base: '0px', lg: '20px' }}
            mb="20px"
            w={{ base: '100%', lg: '50%' }}
            overflowY="auto"
            position="relative"
            borderRadius={10}
            boxShadow="0px 4px 18px rgba(0, 0, 0, 0.25)"
          >
            <Box
              position={{ base: 'unset', lg: 'absolute ' }}
              top={{ base: 'unset', lg: 0 }}
              left={{ base: 'unset', lg: 0 }}
              w="100%"
              h="100%"
            >
              <OnlinePageTabs
                sermonNotes={sermonNotes}
                user={user}
                history={history}
              />
            </Box>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default PreviewOnlineSermonContainer;
