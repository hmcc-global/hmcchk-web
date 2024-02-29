import React, { useState } from 'react';
import { Container, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import SermonNotesEditorModal from './SermonNotesEditorModal';

export default function AdminSermonNotesContainer(props) {
  const { user } = props;
  const today = new DateTime.now();

  // This useState is to open the Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [actionOnEditor, setActionOnEditor] = useState('create');
  const [sermonNotesList, setSermonNotesList] = useState([]);

  const isPublishDisabled = () => {
    const aboveT3chPrivs = ['t3ch', 'admin', 'stewardship'];
    if (aboveT3chPrivs.includes(user.accessType)) {
      return false;
    }
    return true;
  };

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" pb={3}>
        Sermon Notes Manager
      </Heading>
      <Stack direction="row" mb={5}>
        <Button
          colorScheme="blue"
          variant={isEditorOpen ? 'solid' : 'outline'}
          borderColor="#3182CE"
          borderWidth={3}
          size="lg"
          disabled={isPublishDisabled}
          onClick={() => setIsEditorOpen(true)}
        >
          Add New
        </Button>
        <Button
          colorScheme="blue"
          variant={isEditorOpen ? 'outline' : 'solid'}
          borderColor="#3182CE"
          borderWidth={3}
          size="lg"
          onClick={() => setIsEditorOpen(false)}
        >
          Past Sermons
        </Button>
      </Stack>
      {!isEditorOpen && <Heading>Donna should work here!!</Heading>}
      {isEditorOpen && <SermonNotesEditorModal user={user} />}
    </Container>
  );
}
