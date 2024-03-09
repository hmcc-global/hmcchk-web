import React, { useState } from 'react';
import { Container, Heading, Text, Stack, Button, FormLabel, FormControl, Input, ListItem, Flex, Grid, Spacer, List, Box, Image } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import SermonNotesEditorModal from './SermonNotesEditorModal';
import AnnouncementEditorModal from '../announcements/AnnouncementEditorModal';
import { 
  CalendarIcon,
  InfoIcon, 
} from '@chakra-ui/icons';
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { IoPeopleOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function AdminSermonNotesContainer(props) {
  const { user } = props;
  const today = new DateTime.now();

  // This useState is to open the Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [actionOnEditor, setActionOnEditor] = useState('create');

  const [sermonNotesList, setSermonNotesList] = useState([]);
  const [title, Title] = useState('');
  const [sermonSeries, SermonSeries] = useState('');
  const [sermonDateTime, SermonDateTime] = useState('');

//create object

  const sermonNoteItem = [{
    id: "1", 
    title: "eternity", 
    sermonSeries: "eternity", 
    serviceType: "-", 
    sermonDateTime: "-",
    imageAdUrl:"-",
    speaker: "-",
    passage: "John 3:18"
  }]

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
      {!isEditorOpen && 
      (<>
          <Stack direction={['row']} w = "100%" spacing = {5}>
          <form>
            <FormControl isInvalid={title === ''}>
             <FormLabel>Title</FormLabel>
             <Input
              type='text'
              value={title}
              />
            </FormControl>
          </form>
          <form>
            <FormControl isInvalid={sermonSeries === ''}>
             <FormLabel>Sermon Series</FormLabel>
             <Input
              type='Sermon Series'
              value={sermonSeries}
              />
            </FormControl>
          </form>
          <form>
            <FormControl isInvalid={sermonDateTime === ''}>
             <FormLabel>Date &#38; Time</FormLabel>
             <Input
              type='datetime-local'
              value={sermonDateTime}
              />
            </FormControl>
          </form>
          </Stack>
          <List spacing="2" pt={3}>
            {sermonNoteItem.map((sermonNoteItem) => (
              <ListItem key={sermonNoteItem.id}>
                <Box p="3" borderRadius = "lg" borderWidth = "1px">
                  <Flex direction={['column','row']} spacing = {1}>
                    <Box maxW="13rem" pr={6}>
                      <Image
                        src={sermonNoteItem.imageAdUrl}
                        fallbackSrc="https://hongkong.sub.hmcc.net/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png"
                      />
                    </Box>
                    <Stack direction="column" spacing = {1}>
                      <Heading size = "md">{sermonNoteItem.title}</Heading>
                    <Grid
                      templateColumns={['repeat(1,2fr)','repeat(2,2fr)']}
                      gap = {1}
                    >
                      <div style={{display: "flex", justifyContent: "left"}}>
                        <FaRegCalendarAlt /> Date:{' '}
                        {/* {showProperDate(
                          sermonNoteItem.DateTime
                        )} */}
                      </div>
                      <div style={{display: "flex", justifyContent: "left"}}>
                        <MdOutlineVideoLibrary /><span> Sermon Series: {sermonNoteItem.sermonSeries}</span>
                      </div>
                      <div style={{display: "flex", justifyContent: "left"}}>
                        <BiDonateHeart /> Service Type: {sermonNoteItem.serviceType}
                      </div>
                      <div style={{display: "flex", justifyContent: "left"}}>
                        <IoPeopleOutline /> Speaker: {sermonNoteItem.speaker}
                      </div>
                      <div style={{display: "flex", justifyContent: "left"}}>
                        <IoBookOutline /> Passage: {sermonNoteItem.passage}
                      </div>
                      </Grid>
                    </Stack>
                    <Spacer />
                    {/* buttons */}
                    <Stack
                      pt={[3, 0]}
                      spacing={1}
                      direction={['column', 'row']}
                      alignItems="center"
                    >
                      {sermonNoteItem.isInWeb && (
                        <Button>
                          bgColor={
                            sermonNoteItem.isPublishDisabled
                            ? 'grey.800'
                            : 'grey.800'
                          }
                        </Button>
                      )} 
                      <Button
                      colorScheme="blue"
                      value={sermonNoteItem.id}
                      // onClick={onEdit}
                      // isLoading={isLoading}
                      width={['100%', 'auto']}
                      >
                      Edit
                      </Button>
                      <Button
                      colorScheme="blue"
                      value={sermonNoteItem.id}
                      // onClick={onDuplicate}
                      // isLoading={isLoading}
                      // disabled={isCreateDisabled()}
                      actionOnEditor="duplicate"
                      width={['100%', 'auto']}
                      >
                      Duplicate
                      </Button>
                      <Button
                      colorScheme="red"
                      value={sermonNoteItem.id}
                      // onClick={onDelete}
                      disabled={isPublishDisabled()}
                      // isLoading={isLoading}
                      width={['100%', 'auto']}
                    >
                      Delete
                    </Button>
                  </Stack>
                  </Flex>
                </Box>
              </ListItem>
            ))}
          </List>
      </>
      )
      }
      {isEditorOpen && <SermonNotesEditorModal user={user} />}
    </Container>
  );
}
