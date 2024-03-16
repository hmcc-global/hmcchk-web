import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  FormControl,
  Box,
  FormLabel,
  Input,
  FormHelperText,
  Grid,
  Stack,
  Button,
  useToast,
  Select,
} from '@chakra-ui/react';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';

const SermonNotesEditorModal = (props) => {
  const { user } = props;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  // Create a object
  const sermonIdMap = {
    'Sunday Celebration': 'sn',
    Encounter: 'encounter',
  };

  const [title, setTitle] = useState(undefined);
  const [sermondId, setSermonId] = useState(undefined);
  const [subtitle, setSubtitle] = useState(undefined);
  const [speaker, setSpeaker] = useState(undefined);
  const [sermonSeries, setSermonSeries] = useState(undefined);
  const [imageLink, setImageLink] = useState(undefined);
  const [originalContent, setOriginalContent] = useState(undefined);
  const [sermonLink, setSermonLink] = useState(undefined);
  const [serviceType, setServiceType] = useState(undefined);
  const [passage, setPassage] = useState(undefined);
  const [date, setDate] = useState(undefined);
  // This is the state that will hold the number of sermons for a particular date for edge case handling
  const [numberOfSermons, setNumberOfSermons] = useState(0);

  const onSubmit = async (data) => {
    if (data) {
      setValue('title', data.title);
      setValue('subtitle', data.subtitle);
      setValue('speaker', data.speaker);
      setValue('sermonSeries', data.sermonSeries);
      setValue('date', data.date);
      setValue('imageLink', data.imageLink);
      setValue('originalContent', data.originalContent);
      setValue('sermonLink', data.sermonLink);
      setValue('serviceType', data.serviceType);
      setValue('passage', data.passage);

      setTitle(data.title);
      setSubtitle(data.subtitle);
      setSpeaker(data.speaker);
      setSermonSeries(data.sermonSeries);
      setDate(data.date);
      setImageLink(data.imageLink);
      setOriginalContent(data.originalContent);
      setSermonLink(data.sermonLink);
      setServiceType(data.serviceType);
      setPassage(data.passage);
    }
  };

  const formatDate = (date) => {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}${month}${year}`;
  };

  const fetchSermonNotes = async () => {
    try {
      const { data } = await axios.get('/api/sermon-notes-parent/get');
      return data;
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to a t3ch support',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  };

  const onSubmitSermonnotes = async (e) => {
    try {
      const formattedData = formatDate(date);
      const sermonId = `${sermonIdMap[serviceType]}-${formattedData}-${
        numberOfSermons + 1
      }`;
      setSermonId(sermonId);
      setValue('sermonId', sermonId);

      const { status } = await axios.post('/api/sermon-notes-parent/create', {
        sermonId,
        title,
        subtitle,
        speaker,
        sermonSeries,
        date,
        imageLink,
        originalContent,
        sermonLink,
        serviceType,
        passage,
        isPublished: true,
      });
      if (status === 200) {
        toast({
          title: 'Announcement Created',
          description: 'Your announcement has been created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log('Error');
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchSermonNotes();
      const numberOfSermonNotes = result.filter((sermonNote) => {
        return sermonNote.date === date;
      });
      console.log(numberOfSermonNotes);
      if (numberOfSermonNotes.length > 0) {
        setNumberOfSermons(numberOfSermonNotes.length);
      } else {
        setNumberOfSermons(0);
      }
    };

    getData();
  }, [date]);

  return (
    <>
      <Container
        borderColor="#FOF357"
        borderWidth={1}
        maxW="container.xl"
        borderRadius={10}
        p={6}
      >
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={6}>
              <FormControl isRequired>
                <FormLabel color="#656565" fontWeight="bold">
                  Title
                </FormLabel>
                <Input
                  id="title"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormHelperText color="red">Text is required</FormHelperText>
              </FormControl>
              <Grid
                templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                gap={6}
              >
                <FormControl>
                  <FormLabel color="#656565" fontWeight="bold">
                    Subtitle
                  </FormLabel>
                  <Input
                    id="subtitle"
                    {...register('subtitle')}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="#656565" fontWeight="bold">
                    Service Type
                  </FormLabel>
                  <Select
                    value={serviceType}
                    id="serviceType"
                    {...register('serviceType', {
                      required: 'Service type is required',
                    })}
                    onChange={(e) => setServiceType(e.target.value)}
                    placeholder="Select Service Type"
                  >
                    <option value="Sunday Celebration">
                      Sunday Celebration
                    </option>
                    <option value="Vision Sunday">Vision Sunday</option>
                    <option value="Special Events">Special Events</option>
                    <option value="Encounter">Encounter</option>
                  </Select>
                  <FormHelperText color="red">
                    Service type is required
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel color="#656565" fontWeight="bold">
                    Sermon Series
                  </FormLabel>
                  <Input
                    id="sermonSeries"
                    {...register('sermonSeries')}
                    onChange={(e) => setSermonSeries(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="#656565" fontWeight="bold">
                    Service Verse
                  </FormLabel>
                  <Input
                    id="passage"
                    {...register('passage', { required: 'Verse is required' })}
                    onChange={(e) => setPassage(e.target.value)}
                  ></Input>
                  <FormHelperText color="red">Verse is required</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="#656565" fontWeight="bold">
                    Speaker
                  </FormLabel>
                  <Input
                    id="speaker"
                    {...register('speaker', {
                      required: 'Speaker is required',
                    })}
                    onChange={(e) => setSpeaker(e.target.value)}
                  ></Input>
                  <FormHelperText color="red">
                    Speaker is required
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="#656565" fontWeight="bold">
                    Sermon Date
                  </FormLabel>
                  <Input
                    id="date"
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <FormHelperText color="red">
                    Sermon Date is required
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="#656565" fontWeight="bold">
                    Sermon Link
                  </FormLabel>
                  <Input
                    id="sermonLink"
                    {...register('sermonLink')}
                    onChange={(e) => setSermonLink(e.target.value)}
                  />
                  <FormHelperText color="red">
                    Sermon Link is required
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel color="#656565" fontWeight="bold">
                    Image Link
                  </FormLabel>
                  <Input
                    id="imageLink"
                    {...register('imageLink')}
                    onChange={(e) => setImageLink(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <FormControl>
                <FormLabel color="#656565" fontWeight="bold">
                  Rich Text Editor Sermon Notes
                </FormLabel>
                <Input
                  id="originalContent"
                  {...register('originalContent', {
                    required: 'Sermon Notes are required',
                  })}
                  onChange={(e) => setOriginalContent(e.target.value)}
                />
              </FormControl>
              <Stack direction="row" spacing={5}>
                <Button
                  width="13vw"
                  bgColor="#3182CE"
                  color="#FFFFFF"
                  _hover={{ bgColor: '#3D678E' }}
                  type="submit"
                  onClick={onSubmitSermonnotes}
                >
                  Publish
                </Button>
                <Button
                  width="13vw"
                  bgColor="#6C7BFF"
                  color="#FFFFFF"
                  _hover={{ bgColor: '#4F5ABE' }}
                >
                  Preview
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default SermonNotesEditorModal;
