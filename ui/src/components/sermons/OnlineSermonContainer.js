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
import { SocialIcon } from 'react-social-icons';
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
          <VStack mb="4">
            <Text
              alignSelf={{ base: 'center', md: 'self-start' }}
              fontFamily="DMSerifDisplay_Italic"
              fontSize={{ base: '2rem', md: '3.75rem' }}
            >
              {onlineSermon.sermonSeries}
            </Text>
            <Box
              display="flex"
              flexDirection={{ base: 'column', lg: 'row' }}
              alignItems={{ base: 'center', lg: 'unset' }}
              w="100%"
            >
              <Box mb="20px" w={{ base: '100%', lg: '60%' }}>
                <VStack alignItems="left" alignContent="left">
                  <AspectRatio mb="0" width="100%" ratio={16 / 9}>
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

                  <Text
                    fontWeight="400"
                    fontSize={{ base: '1.125rem', md: '2rem' }}
                    fontFamily="DMSerifDisplay_Italic"
                  >
                    {onlineSermon.title}
                  </Text>
                  <Stack spacing={{ base: '2', md: '8' }}>
                    <Box>
                      <Stack
                        spacing={{ base: '1', md: '3' }}
                        direction="row"
                        mb="3"
                        fontSize={{ base: '0.625rem', md: '0.75rem' }}
                      >
                        <HStack spacing="1">
                          <Text>Date:</Text>
                          <Text>{getSermonDate()}</Text>
                        </HStack>
                        <Text>|</Text>
                        <HStack spacing="1">
                          <Text>Speaker: </Text>
                          <Text>{onlineSermon.speaker}</Text>
                        </HStack>
                        <Text>|</Text>
                        <HStack spacing="1">
                          <Text>Passage: </Text>
                          <Text>{onlineSermon.sermonPassage}</Text>
                        </HStack>
                      </Stack>
                      <Text
                        fontFamily="Manrope"
                        fontSize={{ base: '0.75rem', md: '0.875rem' }}
                        fontWeight="500"
                        color="black"
                      >
                        {onlineSermon.sermonDescription}
                      </Text>
                    </Box>
                    <HStack
                      textColor="#4A6EEB"
                      fontFamily="Manrope"
                      fontSize="1rem"
                      gap={{ base: '0', md: '10' }}
                      fontWeight="700"
                      justifyContent={{ base: 'center', md: 'flex-start' }}
                    >
                      <Link
                        target="_blank"
                        href="https://open.spotify.com/user/hmccofhk?si=bd64100596904a95"
                      >
                        <HStack>
                          <Box
                            height={{ base: '4.5em', md: '2.5em' }}
                            width={{ base: '4.5em', md: '2.5em' }}
                          >
                            <SocialIcon
                              target="_blank"
                              bgColor="transparent"
                              fgColor="#4A6EEB"
                              style={{ height: '100%', width: '100%' }}
                              url="https://open.spotify.com/user/hmccofhk?si=bd64100596904a95"
                            />
                          </Box>
                          <Text
                            fontWeight="700"
                            borderBottomWidth="2px"
                            borderColor=" #4A6EEB"
                            display={{ base: 'none', md: 'block' }}
                          >
                            Listen on Spotify
                          </Text>
                        </HStack>
                      </Link>

                      <Link
                        target="_blank"
                        href="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
                      >
                        <HStack>
                          <Box
                            height={{ base: '5em', md: '2.5em' }}
                            width={{ base: '5em', md: '2.5em' }}
                          >
                            <SocialIcon
                              target="_blank"
                              bgColor="transparent"
                              fgColor="#4A6EEB"
                              style={{ height: '100%', width: '100%' }}
                              url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
                            />
                          </Box>
                          <Text
                            fontWeight="700"
                            borderBottomWidth="2px"
                            borderColor="#4A6EEB"
                            display={{ base: 'none', md: 'block' }}
                          >
                            Watch on Youtube
                          </Text>
                        </HStack>
                      </Link>
                    </HStack>
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
                boxShadow={{
                  base: 'none',
                  sm: '0px 4px 18px rgba(0, 0, 0, 0.25)',
                }}
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
          <Text
            fontFamily="DMSerifDisplay_Italic"
            fontSize="2rem"
            display={{ base: 'none', sm: 'block' }}
          >
            Check Out More!
          </Text>
          <OnlinePageButtons
            fontSize="2rem"
            display={{ base: 'none', sm: 'block' }}
          />
        </Container>
      )}
    </>
  );
};

export default OnlineSermonContainer;
