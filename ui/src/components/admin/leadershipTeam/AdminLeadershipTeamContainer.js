import { customAxios as axios } from '../../helpers/customAxios';
import {
  Heading,
  Box,
  useToast,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useState, useCallback, useEffect, useRef } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import LeadershipTeamGrid from './LeadershipTeamGrid.js';
import { AddIcon, EditIcon } from '@chakra-ui/icons';

export default function AdminLeadershipTeamContainer(props) {
  const toast = useToast();

  // states
  const [teams, setTeams] = useState([]);
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState('');
  const [seasonFrom, setSeasonFrom] = useState('');
  const [seasonTo, setSeasonTo] = useState('');
  const [campus, setCampus] = useState('');
  const [lifestage, setLifestage] = useState('');
  const [lifeGroup, setLifeGroup] = useState('');
  const [leaderEmails, setLeaderEmailsStr] = useState('');
  const [deleted, setDeleted] = useState(false);

  const setLeaderEmails = useCallback((v) => {
    if (v && Array.isArray(v)) {
      setLeaderEmailsStr(v.join(','));
      return;
    }

    setLeaderEmailsStr('');
  }, []);

  // get data for Ag-Grid table
  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/leadership-team/get');
      if (data) setTeams(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (selected) {
      setId(selected.id);
      setSeasonFrom(selected.seasonFrom);
      setSeasonTo(selected.seasonTo);
      setCampus(selected.campus);
      setLifestage(selected.lifestage);
      setLifeGroup(selected.lifeGroup);
      setLeaderEmails(selected.leaderEmails);
      setDeleted(selected.isDeleted);
    }
  }, [selected, setLeaderEmails]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const createHandler = async () => {
    try {
      const leaderEmailsArr = leaderEmails && leaderEmails.length > 0 && leaderEmails.split(',');
      const cleanLeaderEmailsArr = leaderEmailsArr.map((x) => x.trim());

      const res = await axios.post('/api/leadership-team/create', {
        seasonFrom,
        seasonTo,
        campus,
        lifestage,
        lifeGroup,
        leaderEmails: cleanLeaderEmailsArr,
        isDeleted: deleted,
      });

      if (res.status === 200) return true;
    } catch (e) {
      console.log(e.response);
      toast({
        description: e.response.data,
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const updateHandler = async () => {
    try {
      const leaderEmailsArr = leaderEmails && leaderEmails.length > 0 && leaderEmails.split(',');
      const cleanLeaderEmailssArr = leaderEmailsArr.map((x) => x.trim());

      const res = await axios.put('/api/leadership-team/update', {
        id,
        seasonFrom,
        seasonTo,
        campus,
        lifestage,
        lifeGroup,
        leaderEmails: cleanLeaderEmailssArr,
        isDeleted: deleted,
      });

      if (res.status === 200) return true;
    } catch (e) {
      console.log(e.response);
      toast({
        description: e.response.data,
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const duplicateHandler = async (e) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get('/api/leadership-team/get', {
        params: { id: e.target.value },
      });

      if (status !== 200) {
        toast({
          description:
            'There was an issue with the request, please talk to a t3ch support',
          status: 'warning',
          duration: 8000,
          isClosable: true,
        });
      }

      setId('');
      setSeasonFrom(data[0].seasonFrom);
      setSeasonTo(data[0].seasonTo);
      setCampus(data[0].campus);
      setLifestage(data[0].lifestage);
      setLifeGroup(data[0].lifeGroup);
      setLeaderEmails(data[0].leaderEmails);
      setDeleted(data[0].isDeleted);

      setIsLoading(false);
    } catch (err) {
      console.log(err);

      toast({
        description:
          'There was an issue with the request, please talk to a t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const unselectHandler = () => {
    setId('');
    setSeasonFrom('');
    setSeasonTo('');
    setCampus('');
    setLifestage('');
    setLifeGroup('');
    setLeaderEmails('');
    setDeleted(false);
    setSelected();
    setIsLoading(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!lifeGroup || lifeGroup.length === 0) return;

    setIsLoading(true);
    let success = false;

    if (id && id.length > 0) {
      success = await updateHandler();
    } else {
      success = await createHandler();
    }

    if (success) {
      toast({
        description: 'Saved!',
        status: 'success',
        duration: 5000,
      });
      await getData();
    }
    unselectHandler();
    onClose();
  };

  return (
    <Container maxW="100%">
      <Flex>
        <Heading as={'h3'} mb={5}>
          Leadership Team Manager
        </Heading>

        <Spacer />

        <Box
          position="absolute"
          right={['2rem', '3rem']}
          overflow="hidden"
          zIndex={999}
        >
          <Stack direction={['column', 'row']}>
            <Button
              colorScheme="blue"
              onClick={unselectHandler}
              mr={['0', '2']}
              isDisabled={id === ''}
            >
              UNSELECT
            </Button>
            <Button
              leftIcon={id !== '' ? <EditIcon /> : <AddIcon />}
              colorScheme="teal"
              onClick={onOpen}
            >
              {id !== '' ? 'EDIT' : 'ADD'}
            </Button>
          </Stack>
        </Box>
      </Flex>

      <Stack direction={['column']} w="100%">
        <Box w={['100%']}>
          <LeadershipTeamGrid teams={teams} setSelected={setSelected} />
        </Box>

        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          initialFocusRef={firstField}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader></DrawerHeader>

            <DrawerBody>
              <form id="lt-form" onSubmit={onSubmit}>
                <FormControl>
                  <FormLabel>Season From</FormLabel>
                  <Input
                    ref={firstField}
                    type="date"
                    value={seasonFrom}
                    onChange={(e) => setSeasonFrom(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Season To</FormLabel>
                  <Input
                    type="date"
                    value={seasonTo}
                    onChange={(e) => setSeasonTo(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Campus</FormLabel>
                  <Input
                    type="text"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Lifestage</FormLabel>
                  <Input
                    type="text"
                    value={lifestage}
                    onChange={(e) => setLifestage(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>LIFE Group</FormLabel>
                  <Input
                    type="text"
                    value={lifeGroup}
                    onChange={(e) => setLifeGroup(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Leader Emails</FormLabel>
                  <Input
                    type="text"
                    value={leaderEmails}
                    onChange={(e) => setLeaderEmailsStr(e.target.value)}
                  />
                </FormControl>

                <FormControl w="auto">
                  <Checkbox
                    isChecked={deleted}
                    onChange={(e) => setDeleted(e.target.checked)}
                  >
                    Delete?
                  </Checkbox>
                </FormControl>
              </form>
            </DrawerBody>

            <DrawerFooter>
              <Stack w="full" direction={['column', 'row']} spacing={2}>
                <Button
                  w={['100%', '50%']}
                  form="lt-form"
                  type="submit"
                  isLoading={isLoading}
                >
                  {id && id.length > 0 ? 'UPDATE' : 'SAVE'}
                </Button>
                <Button
                  w={['100%', '50%']}
                  colorScheme="blue"
                  value={id}
                  onClick={duplicateHandler}
                  isDisabled={!id && id.length === 0}
                >
                  DUPLICATE
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Stack>
    </Container>
  );
}
