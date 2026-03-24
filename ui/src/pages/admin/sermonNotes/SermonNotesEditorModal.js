import React, { useEffect, useCallback, useState } from 'react';
import {
  Container,
  Box,
  Input,
  Grid,
  Stack,
  Button,
  NativeSelect,
  Field,
} from '@chakra-ui/react';
import { toaster } from '../../../components/ui/toaster';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../../helpers/customAxios';
import TiptapEditor from '../../helpers/TipTap';
import { Prompt } from 'react-router-dom';

// Create a object
export const sermonIdMap = {
  'Sunday Celebration': 'sn',
  'Vision Sunday': 'vs',
  'Special Events': 'se',
  Encounter: 'en',
};

const SermonNotesEditorModal = (props) => {
  const { editSermonNotesData, actionOnEditor, setIsEditorOpen } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { touchedFields },
  } = useForm();
  const [isDirty, setIsDirty] = useState(false); //indicates unsaved changes

  const [sermonNoteData, setSermonNoteData] = useState({
    sermonId: '',
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
  const [sermonNotes, setSermonNotes] = useState([]);

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

  const onSubmit = async (data) => {
    setSermonNoteData({ ...data });
  };

  const formatDate = (date) => {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}${month}${year}`;
  };

  const onReset = () => {
    setSermonNoteData({
      sermonId: '',
      title: '',
      subtitle: '',
      speaker: '',
      sermonSeries: '',
      imageLink: '',
      originalContent: {},
      sermonLink: '',
      serviceType: '',
      date: '',
      passage: '',
    });
  };

  const fetchSermonNotes = useCallback(
    async ({ includeDeleted = false } = {}) => {
      try {
        const { data } = await axios.get('/api/sermon-notes-parent/get', {
          params: {
            includeDeleted: includeDeleted,
          },
        });
        return data;
      } catch (err) {
        console.log(err);
        toaster.create({
          description:
            'There was an issue with the request, please talk to a t3ch team member.',
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      }
    },
    []
  );

  const checkDuplicateTitleAndSermonLink = async () => {
    try {
      const duplicateTitle = sermonNoteData.title;
      const duplicateSermonLink = sermonNoteData.sermonLink;
      const duplicatedSermonNoteTitle = sermonNotes.filter((sermonNote) => {
        return sermonNote.title === duplicateTitle;
      });
      const duplicatedSermonNoteSermonLink = sermonNotes.filter(
        (sermonNote) => {
          return sermonNote.sermonLink === duplicateSermonLink;
        }
      );
      if (
        duplicatedSermonNoteTitle.length > 0 &&
        duplicatedSermonNoteSermonLink.length > 0
      ) {
        return 'both';
      } else if (duplicatedSermonNoteTitle.length > 0) {
        return 'title';
      } else if (duplicatedSermonNoteSermonLink.length > 0) {
        return 'sermonLink';
      }
    } catch (err) {
      console.log(err);
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
          toaster.create({
            title: 'Sermon Note Updated',
            description: 'Your Sermon Note has been updated.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setIsDirty(false);
        }
      } else {
        const isDuplicate = await checkDuplicateTitleAndSermonLink();
        if (isDuplicate === 'both') {
          toaster.create({
            title: 'Duplicated Sermon Title and Sermon Link',
            description:
              'A sermon note with the same title and sermon link already exists. Please rename the title and sermon link.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        } else if (isDuplicate === 'title') {
          toaster.create({
            title: 'Duplicated Sermon Title',
            description:
              'A sermon note with the same title already exists.Please rename the title.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        } else if (isDuplicate === 'sermonLink') {
          toaster.create({
            title: 'Duplicated Sermon Link',
            description:
              'A sermon note with the same sermon link already exists. Please rename the sermon link.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        // Create Unique Sermon ID
        const formattedData = formatDate(sermonNoteData.date);
        const sermonId = `${
          sermonIdMap[sermonNoteData.serviceType]
        }-${formattedData}-${numberOfSermons + 1}`;
        setValue('sermonId', sermonId);
        const { status } = await axios.post('/api/sermon-notes-parent/create', {
          ...sermonNoteData,
          sermonId: sermonId,
          isPublished: true,
        });
        if (actionOnEditor === 'duplicate') {
          if (status === 200) {
            toaster.create({
              title: 'Sermon Note Duplicated',
              description: 'Your sermon note has been duplicated.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          if (status === 200) {
            toaster.create({
              title: 'Sermon Note Created',
              description: 'Your sermon note has been created.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          }
        }
        setIsEditorOpen(false);
      }
    } catch (err) {
      console.log('Error');
      toaster.create({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getData = useCallback(async () => {
    try {
      const sermonNotesWithDeleted = await fetchSermonNotes({
        includeDeleted: true,
      });
      const sermonNotesResults = await fetchSermonNotes({
        includeDeleted: false,
      });

      setSermonNotes(sermonNotesResults);
      // Format of Sermon ID: sn-01012021-1 (Service Type - Date - Number of Sermons)
      // Check if there are any sermon notes for the same date. This is so that we can create a unique sermon ID for the sermon notes.
      const numberOfSermonNotes = sermonNotesWithDeleted.filter(
        (note) => note.date === sermonNoteData.date
      );

      setNumberOfSermons(numberOfSermonNotes.length);
    } catch (error) {
      console.error('Error fetching sermon notes:', error);
    }
  }, [sermonNoteData.date, fetchSermonNotes, setNumberOfSermons]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (editSermonNotesData !== null) {
      setSermonNoteData({ ...editSermonNotesData });
    }
  }, [editSermonNotesData, setSermonNoteData]);

  useEffect(() => {
    if (actionOnEditor === 'create') onReset();
  }, [actionOnEditor]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        const message =
          'You have unsaved changes. Are you sure you want to leave?';
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
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
              <Field.Root
                required
                invalid={sermonNoteData.title === '' && touchedFields.title}
              >
                <Field.Label color="#656565" fontWeight="bold">
                  Title
                </Field.Label>
                <Input
                  id="title"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  value={sermonNoteData.title}
                  onValueChange={(e) =>
                    setSermonNoteData({
                      ...sermonNoteData,
                      title: e.target.value,
                    })
                  }
                />
                <Field.ErrorText>Title is required</Field.ErrorText>
              </Field.Root>
              <Grid
                templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                gap={6}
              >
                <Field.Root>
                  <Field.Label color="#656565" fontWeight="bold">
                    Subtitle
                  </Field.Label>
                  <Input
                    id="subtitle"
                    value={sermonNoteData.subtitle}
                    {...register('subtitle')}
                    onValueChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        subtitle: e.target.value,
                      })
                    }
                  />
                </Field.Root>
                <Field.Root
                  required
                  invalid={
                    sermonNoteData.serviceType === '' &&
                    touchedFields.serviceType
                  }
                >
                  <Field.Label color="#656565" fontWeight="bold">
                    Service Type
                  </Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={sermonNoteData.serviceType}
                      id="serviceType"
                      {...register('serviceType', {
                        required: 'Service type is required',
                      })}
                      onValueChange={(e) =>
                        setSermonNoteData({
                          ...sermonNoteData,
                          serviceType: e.target.value,
                        })
                      }
                      placeholder="Select Service Type">
                      <option value="Sunday Celebration">
                        Sunday Celebration
                      </option>
                      <option value="Vision Sunday">Vision Sunday</option>
                      <option value="Special Events">Special Events</option>
                      <option value="Encounter">Encounter</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                  <Field.ErrorText>Service Type is required</Field.ErrorText>
                </Field.Root>
                <Field.Root>
                  <Field.Label color="#656565" fontWeight="bold">
                    Sermon Series
                  </Field.Label>
                  <Input
                    id="sermonSeries"
                    value={sermonNoteData.sermonSeries}
                    {...register('sermonSeries')}
                    onValueChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        sermonSeries: e.target.value,
                      })
                    }
                  />
                </Field.Root>
                <Field.Root
                  required
                  invalid={
                    sermonNoteData.passage === '' && touchedFields.passage
                  }
                >
                  <Field.Label color="#656565" fontWeight="bold">
                    Service Verse
                  </Field.Label>
                  <Input
                    id="passage"
                    value={sermonNoteData.passage}
                    {...register('passage', { required: 'Verse is required' })}
                    onValueChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        passage: e.target.value,
                      })
                    }
                  ></Input>
                  <Field.ErrorText>Verse is required</Field.ErrorText>
                </Field.Root>
                <Field.Root
                  required
                  invalid={
                    sermonNoteData.speaker === '' && touchedFields.speaker
                  }
                >
                  <Field.Label color="#656565" fontWeight="bold">
                    Speaker
                  </Field.Label>
                  <Input
                    id="speaker"
                    value={sermonNoteData.speaker}
                    {...register('speaker', {
                      required: 'Speaker is required',
                    })}
                    onValueChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        speaker: e.target.value,
                      })
                    }
                  ></Input>
                  <Field.ErrorText>Speaker is required</Field.ErrorText>
                </Field.Root>
                <Field.Root
                  required
                  invalid={sermonNoteData.date === '' && touchedFields.date}
                >
                  <Field.Label color="#656565" fontWeight="bold">
                    Sermon Date
                  </Field.Label>
                  <Input
                    id="date"
                    value={sermonNoteData.date}
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    onValueChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        date: e.target.value,
                      })
                    }
                  />
                  <Field.ErrorText>Date is required</Field.ErrorText>
                </Field.Root>
                {/* TO-DO: Implement sermon link shortener / custom link */}
                <Field.Root>
                  <Field.Label color="#656565" fontWeight="bold">
                    Sermon Link
                  </Field.Label>
                  <Input
                    id="sermonLink"
                    value={sermonNoteData.sermonLink}
                    {...register('sermonLink')}
                    onValueChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        sermonLink: e.target.value,
                      })
                    }
                  />
                  <Field.HelperText>
                    Please follow the usual format 'sn-jul06'
                  </Field.HelperText>
                </Field.Root>
                <Field.Root>
                  <Field.Label color="#656565" fontWeight="bold">
                    Image Link
                  </Field.Label>
                  <Input
                    id="imageLink"
                    value={sermonNoteData.imageLink}
                    {...register('imageLink')}
                    onValueChange={(e) =>
                      setSermonNoteData({
                        ...sermonNoteData,
                        imageLink: e.target.value,
                      })
                    }
                  />
                </Field.Root>
              </Grid>
              <Field.Root
                required
                invalid={
                  sermonNoteData.originalContent === '' &&
                  touchedFields.originalContent
                }
              >
                <Field.Label color="#656565" fontWeight="bold">
                  Rich Text Editor Sermon Notes
                </Field.Label>
                <TiptapEditor
                  onFocus={() =>
                    setValue(
                      'originalContent',
                      sermonNoteData.originalContent,
                      { shouldTouch: true }
                    )
                  }
                  onEditorChange={(json) => {
                    setSermonNoteData({
                      ...sermonNoteData,
                      originalContent: json,
                    });
                    setIsDirty(true);
                  }}
                  existingContent={sermonNoteData.originalContent}
                  textPassage={sermonNoteData.passage}
                />
                <Field.ErrorText>Sermon Notes are required</Field.ErrorText>
              </Field.Root>
              <Stack direction="row" gap={5}>
                <Button
                  bgColor="#3182CE"
                  color="#FFFFFF"
                  _hover={{ bgColor: '#3D678E' }}
                  type="submit"
                  onClick={onSubmitSermonNotes}
                >
                  {editorSubmitButton(actionOnEditor)}
                </Button>
                <Prompt
                  when={isDirty}
                  message="You have unsaved changes. Are you sure you want to leave?"
                />
                <Button
                  bgColor="#6C7BFF"
                  color="#FFFFFF"
                  _hover={{ bgColor: '#4F5ABE' }}
                  onClick={() =>
                    window.open(
                      `/sermons/notes/${sermonNoteData.sermonId}`,
                      '_blank'
                    )
                  }
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
