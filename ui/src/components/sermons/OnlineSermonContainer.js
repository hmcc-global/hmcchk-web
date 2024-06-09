import { useCallback, useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
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
import { DateTime } from 'luxon';
import OnlinePageButtons from './OnlinePageButtons';
import OnlinePageTabs from './OnlinePageTabs';

const OnlineSermonContainer = (props) => {
  const { user, history } = props;
  const [onlineSermon, setOnlineSermon] = useState();
  const getOnlineSermon = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        '/api/live-sermon/get-live-sermon'
      );
      if (status === 200) {
        const current = data && data[0];
        if (current && current.streamLink) {
          setOnlineSermon(current);
        } else {
          history.push(`/sermons/`);
        }
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
      history.push(`/sermons/`);
    }
  }, [history]);

  useEffect(() => {
    (async () => {
      await getOnlineSermon();
    })();
  }, [getOnlineSermon]);

  const getSermonDate = () => {
    if (onlineSermon.sermonDateTime) {
      return DateTime.fromISO(onlineSermon.sermonDateTime).toFormat(
        'dd MMM yyyy'
      );
    }
  };

  const getSermonTime = () => {
    if (onlineSermon.sermonDateTime) {
      return DateTime.fromISO(onlineSermon.sermonDateTime).toFormat('hh:mm a');
    }
  };

  return (
    <>
      {onlineSermon && (
        <Container maxW={{ base: '100%', lg: '85%' }}>
          <VStack>
            <Link href="/sermons" alignSelf="baseline">
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
              <Box mb="20px" w={{ base: '100%', lg: '60%' }}>
                <VStack alignItems="left" alignContent="left">
                  <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                    <iframe
                      width="560"
                      height="315"
                      src={onlineSermon.streamLink}
                      title="Video player"
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
                      allowFullScreen
                    ></iframe>
                  </AspectRatio>

                  <Text fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }}>
                    {onlineSermon.title}
                  </Text>
                  <Stack spacing={8}>
                    <Box>
                      <Stack
                        spacing={{ base: 'normal', md: 'auto' }}
                        direction={{ base: 'column', md: 'row' }}
                      >
                        <HStack>
                          <Text fontWeight="bold">Speaker:</Text>
                          <Text>{onlineSermon.speaker}</Text>
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
                          <Text>{onlineSermon.sermonSeries}</Text>
                        </HStack>
                        <HStack>
                          <Text fontWeight="bold">Passage:</Text>
                          <Text>{onlineSermon.sermonPassage}</Text>
                        </HStack>
                      </Stack>
                    </Box>
                    <OnlinePageButtons />
                    <Box bgColor="#F1F1F3" p={5} borderRadius={15}>
                      <Text fontWeight="bold" color="#0628A3" fontSize="md">
                        Description:
                      </Text>
                      <Text>{onlineSermon.sermonDescription}</Text>
                    </Box>
                  </Stack>
                </VStack>
              </Box>
              <Box
                ml={{ base: '0px', lg: '20px' }}
                mb="20px"
                w={{ base: '100%', lg: '40%' }}
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
                    sermonNotes={onlineSermon.sermonNotes}
                    user={user}
                    history={history}
                  />
                </Box>
              </Box>
            </Box>
          </VStack>
        </Container>
      )}
    </>
  );
};

export default OnlineSermonContainer;
