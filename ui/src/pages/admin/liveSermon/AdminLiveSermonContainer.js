import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Stack,
  Box,
  Input,
  Textarea,
  Button,
  Field,
} from '@chakra-ui/react';
import { toaster } from '../../../components/ui/toaster';
import { customAxios as axios } from '../../helpers/customAxios';
import PreviewOnlineSermonContainer from './PreviewOnlineSermonContainer';
import { DateTime } from 'luxon';

export default function AdminLiveSermonContainer(props) {
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
      toaster.create({
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
      toaster.create({
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
      toaster.create({
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
      toaster.create({
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
      toaster.create({
        description: err,
        status: 'error',
        duration: 5000,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
                <Field.Root required invalid={title === ''}>
                  <Field.Label>Title</Field.Label>
                  <Input
                    type="text"
                    value={title}
                    onValueChange={(e) => setTitle(e.target.value)}
                  />
                  <Field.ErrorText>Sermon Title is required</Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={sermonDescription === ''}>
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    value={sermonDescription}
                    onValueChange={(e) => setSermonDescription(e.target.value)}
                  />
                  <Field.ErrorText>Description is required</Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={streamLink === ''}>
                  <Field.Label>Stream Link</Field.Label>
                  <Input
                    type="url"
                    value={streamLink}
                    onValueChange={(e) => setStreamLink(e.target.value)}
                  />
                  <Field.ErrorText>
                    Stream Link is required/invalid
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Sermon Notes</Field.Label>
                  <Input
                    type="text"
                    value={sermonNotes}
                    onValueChange={(e) => setSermonNotes(e.target.value)}
                  />
                  <Field.HelperText>
                    /online only works properly if there is only 1 sermon per
                    day. Please input the sermon link if there are more than 1
                    sermon in 1 day.
                  </Field.HelperText>
                </Field.Root>
                <Field.Root required invalid={speaker === ''}>
                  <Field.Label>Speaker</Field.Label>
                  <Input
                    type="text"
                    value={speaker}
                    placeholder="e.g. Pastor Bo Zhu, Pastor Seth S. Kim"
                    onValueChange={(e) => setSpeaker(e.target.value)}
                  />
                </Field.Root>
                <Field.Root required invalid={sermonSeries === ''}>
                  <Field.Label>Series</Field.Label>
                  <Input
                    type="text"
                    value={sermonSeries}
                    onValueChange={(e) => setSermonSeries(e.target.value)}
                  />
                </Field.Root>
                <Field.Root required invalid={sermonSeriesUrl === ''}>
                  <Field.Label>Series Image</Field.Label>
                  <Input
                    type="url"
                    value={sermonSeriesUrl}
                    onValueChange={(e) => setSermonSeriesUrl(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Sermon Passage</Field.Label>
                  <Input
                    type="text"
                    value={sermonPassage}
                    onValueChange={(e) => setSermonPassage(e.target.value)}
                  />
                </Field.Root>
                <Field.Root required invalid={sermonDateTime === ''}>
                  <Field.Label>Date &#38; Time</Field.Label>
                  <Input
                    type="datetime-local"
                    value={sermonDateTime}
                    onValueChange={(e) => setSermonDateTime(e.target.value)}
                  />
                </Field.Root>
                <Field.Root invalid={streamPeriodInvalid} required>
                  <Field.Label> Stream Period </Field.Label>
                  <Field.ErrorText>
                    {streamPeriodInvalid &&
                      'Stream Period is invalid, please check again'}
                  </Field.ErrorText>
                  Starting Time
                  <Input
                    type="datetime-local"
                    value={streamStartTime}
                    onValueChange={(e) => setStreamStartTime(e.target.value)}
                  />
                  Ending Time
                  <Input
                    type="datetime-local"
                    value={streamEndTime}
                    onValueChange={(e) => setStreamEndTime(e.target.value)}
                  />
                </Field.Root>
                <Field.Root mt={5}>
                  <Button
                    colorPalette="green"
                    type="submit"
                    w="full"
                    loading={isSaving}
                    disabled={sanityCheckFailed}
                  >
                    {id && id !== '' ? 'UPDATE' : 'CREATE'}
                  </Button>
                </Field.Root>
                <Button
                  colorPalette="red"
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
                  colorPalette="blue"
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
