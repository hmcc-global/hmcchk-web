import React, { useEffect } from 'react';
import {
  Container,
  FormControl,
  Box,
  FormLabel,
  Input,
  Grid,
  Stack,
  Button,
  useToast,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';

const SermonNotesEditorModal = (props) => {
  const { editSermonNotesData, actionOnEditor, setIsEditorOpen } = props;
  const { register, handleSubmit, setValue } = useForm();
  const toast = useToast();

  // Create a object
  const sermonIdMap = {
    'Sunday Celebration': 'sn',
    Encounter: 'encounter',
  };

  const [sermondId, setSermonId] = useState('');
  const [sermonNoteData, setSermonNoteData] = useState({
    title: '',
    subtitle: '',
    speaker: '',
    sermonSeries: '',
    imageLink: '',
    originalContent: '',
    sermonLink: '',
    serviceType: '',
    date: '',
    passage: '',
  });

  // This is the state that will hold the number of sermons for a particular date for edge case handling
  const [numberOfSermons, setNumberOfSermons] = useState(0);

  const editorSubmitButton = (actionOnEditor) => {
    switch (actionOnEditor) {
      default:
        return 'Create Sermon Notes';
      case 'edit':
        return 'Update Sermon Notes';
      case 'duplicate':
        return 'Duplicate Sermon Notes';
    }
  };

  const setSermonNotesData = (data) => {
    if (data) setValue('title', data.title);
    setValue('subtitle', data.subtitle);
    setValue('speaker', data.speaker);
    setValue('sermonSeries', data.sermonSeries);
    setValue('date', data.date);
    setValue('imageLink', data.imageLink);
    setValue('originalContent', data.originalContent);
    setValue('sermonLink', data.sermonLink);
    setValue('serviceType', data.serviceType);
    setValue('passage', data.passage);

    setSermonNoteData({
      title: data.title,
      subtitle: data.subtitle,
      speaker: data.speaker,
      sermonSeries: data.sermonSeries,
      imageLink: data.imageLink,
      originalContent: data.originalContent,
      sermonLink: data.sermonLink,
      serviceType: data.serviceType,
      date: data.date,
      passage: data.passage,
    });
  };

  const onSubmit = async (data) => {
    setSermonNotesData(data);
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

  const onSubmitSermonNotes = async (e) => {
    try {
      if (actionOnEditor === 'edit') {
        const { status } = await axios.put('/api/sermon-notes-parent/update', {
          ...sermonNoteData,
          sermonId: editSermonNotesData.sermonId,
        });
        if (status === 200) {
          toast({
            title: 'Announcement Updated',
            description: 'Your announcement has been updated.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
        setIsEditorOpen(false);
      } else {
        // Create Unique Sermon ID
        const formattedData = formatDate(sermonNoteData.date);
        const sermonId = `${
          sermonIdMap[sermonNoteData.serviceType]
        }-${formattedData}-${numberOfSermons + 1}`;
        setSermonId(sermonId);
        setValue('sermonId', sermonId);

        const { status } = await axios.post('/api/sermon-notes-parent/create', {
          ...sermonNoteData,
          isPublished: true,
          sermonId: sermonId,
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
        setIsEditorOpen(false);
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

  const getData = async () => {
    const result = await fetchSermonNotes();
    // Format of Sermon ID: sn-01012021-1 (Service Type - Date - Number of Sermons)
    // Check if there are any sermon notes for the same date. This is so that we can create a unique sermon ID for the sermon notes.
    const numberOfSermonNotes = result.filter((sermonNotes) => {
      return sermonNotes.date === sermonNoteData.date;
    });
    if (numberOfSermonNotes.length > 0) {
      setNumberOfSermons(numberOfSermonNotes.length);
    } else {
      setNumberOfSermons(0);
    }
  };

  useEffect(() => {
    getData();
  }, [sermonNoteData.date]);

  useEffect(() => {
    if (editSermonNotesData !== null) {
      setSermonNotesData(editSermonNotesData);
    }
  }, [editSermonNotesData]);

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
              <FormControl isRequired isInvalid={sermonNoteData.title === ''}>
                <FormLabel color="#656565" fontWeight="bold">
                  Title
                </FormLabel>
                <Input
                  id="title"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  onChange={(e) =>
                    setSermonNoteData({
                      ...sermonNoteData,
                      title: e.target.value,
                    })
                  }
                />
                <FormErrorMessage>Title is required</FormErrorMessage>
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
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        subtitle: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={sermonNoteData.serviceType === ''}
                >
                  <FormLabel color="#656565" fontWeight="bold">
                    Service Type
                  </FormLabel>
                  <Select
                    value={sermonNoteData.serviceType}
                    id="serviceType"
                    {...register('serviceType', {
                      required: 'Service type is required',
                    })}
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        serviceType: e.target.value,
                      })
                    }
                    placeholder="Select Service Type"
                  >
                    <option value="Sunday Celebration">
                      Sunday Celebration
                    </option>
                    <option value="Vision Sunday">Vision Sunday</option>
                    <option value="Special Events">Special Events</option>
                    <option value="Encounter">Encounter</option>
                  </Select>
                  <FormErrorMessage>Service Type is required</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="#656565" fontWeight="bold">
                    Sermon Series
                  </FormLabel>
                  <Input
                    id="sermonSeries"
                    {...register('sermonSeries')}
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        sermonSeries: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={sermonNoteData.passage === ''}
                >
                  <FormLabel color="#656565" fontWeight="bold">
                    Service Verse
                  </FormLabel>
                  <Input
                    id="passage"
                    {...register('passage', { required: 'Verse is required' })}
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        passage: e.target.value,
                      })
                    }
                  ></Input>
                  <FormErrorMessage>Verse is required</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={sermonNoteData.speaker === ''}
                >
                  <FormLabel color="#656565" fontWeight="bold">
                    Speaker
                  </FormLabel>
                  <Input
                    id="speaker"
                    {...register('speaker', {
                      required: 'Speaker is required',
                    })}
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        speaker: e.target.value,
                      })
                    }
                  ></Input>
                  <FormErrorMessage>Speaker is required</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={sermonNoteData.date === ''}>
                  <FormLabel color="#656565" fontWeight="bold">
                    Sermon Date
                  </FormLabel>
                  <Input
                    id="date"
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        date: e.target.value,
                      })
                    }
                  />
                  <FormErrorMessage>Date is required</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={sermonNoteData.sermonLink === ''}
                >
                  <FormLabel color="#656565" fontWeight="bold">
                    Sermon Link
                  </FormLabel>
                  <Input
                    id="sermonLink"
                    {...register('sermonLink')}
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        sermonLink: e.target.value,
                      })
                    }
                  />
                  <FormErrorMessage>Sermon Link is required</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="#656565" fontWeight="bold">
                    Image Link
                  </FormLabel>
                  <Input
                    id="imageLink"
                    {...register('imageLink')}
                    onChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        imageLink: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Grid>
              <FormControl
                isRequired
                isInvalid={sermonNoteData.originalContent === ''}
              >
                <FormLabel color="#656565" fontWeight="bold">
                  Rich Text Editor Sermon Notes
                </FormLabel>
                <Input
                  id="originalContent"
                  {...register('originalContent', {
                    required: 'Sermon Notes are required',
                  })}
                  onChange={(e) =>
                    setSermonNoteData({
                      ...sermonNoteData,
                      originalContent: e.target.value,
                    })
                  }
                />
                <FormErrorMessage>Sermon Notes are required</FormErrorMessage>
              </FormControl>
              <Stack direction="row" spacing={5}>
                <Button
                  bgColor="#3182CE"
                  color="#FFFFFF"
                  _hover={{ bgColor: '#3D678E' }}
                  type="submit"
                  onClick={onSubmitSermonNotes}
                >
                  {editorSubmitButton(actionOnEditor)}
                </Button>
                <Button
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
