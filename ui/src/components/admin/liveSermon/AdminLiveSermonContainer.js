import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { customAxios as axios } from '../../helpers/customAxios';
import PreviewOnlineSermonContainer from './PreviewOnlineSermonContainer';
import { DateTime } from 'luxon';

export default function AdminLiveSermonContainer(props) {
  const toast = useToast();
  const { user, history } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const [liveSermon, setLiveSermon] = useState();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [sermonDescription, setSermonDescription] = useState('');
  const [streamLink, setStreamLink] = useState('');
  const [sermonNotes, setSermonNotes] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [sermonSeries, setSermonSeries] = useState('');
  const [sermonSeriesUrl, setSermonSeriesUrl] = useState('');
  const [sermonPassage, setSermonPassage] = useState('');
  const [sermonDateTime, setSermonDateTime] = useState('');
  const [streamStartTime, setStreamStartTime] = useState('');
  const [streamEndTime, setStreamEndTime] = useState('');
  const [streamPeriodInvalid, setStreamPeriodInvalid] = useState(false);

  const initLiveSermonValues = (data) => {
    setId(data.id);
    setTitle(data.title);
    setSermonDescription(data.sermonDescription);
    setStreamLink(data.streamLink);
    setSermonNotes(data.sermonNotes);
    setSpeaker(data.speaker);
    setSermonSeries(data.sermonSeries);
    setSermonSeriesUrl(data.sermonSeriesUrl);
    setSermonPassage(data.sermonPassage);
    setSermonDateTime(data.sermonDateTime);
    setStreamStartTime(data.streamStartTime);
    setStreamEndTime(data.streamEndTime);
  };

  const sanityCheckFailed =
    title === '' || sermonDescription === '' || streamPeriodInvalid;

  const createHandler = async () => {
    try {
      const res = await axios.post('/api/live-sermon/create-live-sermon', {
        title,
        sermonDescription,
        streamLink,
        sermonNotes,
        speaker,
        sermonSeries,
        sermonSeriesUrl,
        sermonPassage,
        sermonDateTime,
        streamStartTime,
        streamEndTime,
      });

      if (res.status === 200) {
        const { data } = res;
        setId(data.Id);
        return true;
      }
    } catch (err) {
      toast({
        description: err,
        status: 'error',
        duration: 5000,
      });
      console.log(err);
      return false;
    }
  };

  const updateHandler = async () => {
    try {
      const res = await axios.put('/api/live-sermon/update-live-sermon', {
        id,
        title,
        sermonDescription,
        streamLink,
        sermonNotes,
        speaker,
        sermonSeries,
        sermonSeriesUrl,
        sermonPassage,
        sermonDateTime,
        streamStartTime,
        streamEndTime,
      });
      if (res.status === 200) return true;
    } catch (err) {
      toast({
        description: err,
        status: 'error',
        duration: 5000,
      });
      console.log(err);
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (sanityCheckFailed) {
      toast({
        description: 'Some fields are not valid, please check again.',
        status: 'error',
        duration: 5000,
      });
      return;
    }

    setIsSaving(true);
    let success = false;
    if (id && id !== '') {
      success = await updateHandler();
    } else {
      success = await createHandler();
    }

    if (success) {
      toast({
        description: 'Saved',
        status: 'success',
        duration: 5000,
      });
      setIsLoading(true);
      await getData();
    }
    setIsSaving(false);
  };

  const clearHandler = () => {
    setId('');
    setTitle('');
    setSermonDescription('');
    setStreamLink('');
    setSermonNotes('');
    setSpeaker('');
    setSermonSeries('');
    setSermonSeriesUrl('');
    setSermonPassage('');
    setSermonDateTime('');
    setStreamStartTime('');
    setStreamEndTime('');
    setStreamPeriodInvalid(false);
  };

  const resetHandler = () => {
    if (liveSermon) {
      initLiveSermonValues(liveSermon);
    }
  };

  const previewHandler = useCallback(() => {
    if (sanityCheckFailed) return;

    setIsPreviewing(true);
  }, [sanityCheckFailed]);

  const getData = useCallback(async () => {
    try {
      // Hardcoded to always get the latest sermon if it exists, if not returns empty array for actual database
      const { data } = await axios.get('/api/live-sermon/get-live-sermon', {
        params: {
          sermonId: '635487c446187f591b0fb15a',
        },
      });
      if (data && data[0]) {
        // we only get the latest one to update
        setLiveSermon(data[0]);
        initLiveSermonValues(data[0]);
        setIsPreviewing(true);
      }
    } catch (err) {
      toast({
        description: err,
        status: 'error',
        duration: 5000,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (streamStartTime && streamEndTime) {
      const startTime = DateTime.fromISO(streamStartTime);
      const endTime = DateTime.fromISO(streamEndTime);

      if (startTime >= endTime) {
        setStreamPeriodInvalid(true);
        return;
      }
      setStreamPeriodInvalid(false);
    }
  }, [streamStartTime, streamEndTime]);

  return (
    <Container w="100%" maxW="100%">
      {!isLoading && (
        <>
          <Heading as="h5" mb={5}>
            Live Sermon Manager
          </Heading>
          <Stack direction={['column', 'row']} w="100%">
            <Box w={['100%', '40%']}>
              <form onSubmit={onSubmit}>
                <FormControl isRequired isInvalid={title === ''}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <FormErrorMessage>Sermon Title is required</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={sermonDescription === ''}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={sermonDescription}
                    onChange={(e) => setSermonDescription(e.target.value)}
                  />
                  <FormErrorMessage>Description is required</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={streamLink === ''}>
                  <FormLabel>Stream Link</FormLabel>
                  <Input
                    type="url"
                    value={streamLink}
                    onChange={(e) => setStreamLink(e.target.value)}
                  />
                  <FormErrorMessage>
                    Stream Link is required/invalid
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Sermon Notes</FormLabel>
                  <Input
                    type="url"
                    value={sermonNotes}
                    onChange={(e) => setSermonNotes(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={speaker === ''}>
                  <FormLabel>Speaker</FormLabel>
                  <Input
                    type="text"
                    value={speaker}
                    placeholder="e.g. Pastor Bo Zhu, Pastor Seth S. Kim"
                    onChange={(e) => setSpeaker(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={sermonSeries === ''}>
                  <FormLabel>Series</FormLabel>
                  <Input
                    type="text"
                    value={sermonSeries}
                    onChange={(e) => setSermonSeries(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={sermonSeriesUrl === ''}>
                  <FormLabel>Series Image</FormLabel>
                  <Input
                    type="url"
                    value={sermonSeriesUrl}
                    onChange={(e) => setSermonSeriesUrl(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Sermon Passage</FormLabel>
                  <Input
                    type="text"
                    value={sermonPassage}
                    onChange={(e) => setSermonPassage(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={sermonDateTime === ''}>
                  <FormLabel>Date &#38; Time</FormLabel>
                  <Input
                    type="datetime-local"
                    value={sermonDateTime}
                    onChange={(e) => setSermonDateTime(e.target.value)}
                  />
                </FormControl>
                <FormControl isInvalid={streamPeriodInvalid} isRequired>
                  <FormLabel> Stream Period </FormLabel>
                  <FormErrorMessage>
                    {streamPeriodInvalid &&
                      'Stream Period is invalid, please check again'}
                  </FormErrorMessage>
                  Starting Time
                  <Input
                    type="datetime-local"
                    value={streamStartTime}
                    onChange={(e) => setStreamStartTime(e.target.value)}
                  />
                  Ending Time
                  <Input
                    type="datetime-local"
                    value={streamEndTime}
                    onChange={(e) => setStreamEndTime(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={5}>
                  <Button
                    colorScheme="green"
                    type="submit"
                    w="full"
                    isLoading={isSaving}
                    isDisabled={sanityCheckFailed}
                  >
                    {id && id !== '' ? 'UPDATE' : 'CREATE'}
                  </Button>
                </FormControl>
                <Button
                  colorScheme="red"
                  w="full"
                  mt={5}
                  onClick={resetHandler}
                >
                  RESET
                </Button>
                <Button w="full" mt={5} onClick={clearHandler}>
                  CLEAR
                </Button>
                <Button
                  colorScheme="blue"
                  w="full"
                  mt={5}
                  onClick={previewHandler}
                >
                  PREVIEW
                </Button>
              </form>
            </Box>
            <Box w={['100%', '60%']}>
              <Heading as="h5" size="md" mb={5}>
                PREVIEW
              </Heading>
              <PreviewOnlineSermonContainer
                isPreviewing={isPreviewing}
                user={user}
                history={history}
                setIsPreviewing={setIsPreviewing}
                data={{
                  title,
                  sermonDescription,
                  streamLink,
                  sermonNotes,
                  speaker,
                  sermonSeries,
                  sermonPassage,
                  sermonDateTime,
                }}
              />
            </Box>
          </Stack>
        </>
      )}
    </Container>
  );
}
