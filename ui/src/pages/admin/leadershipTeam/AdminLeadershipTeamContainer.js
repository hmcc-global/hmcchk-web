import { customAxios as axios } from '../../helpers/customAxios';
import {
  Heading,
  Box,
  Container,
  Stack,
  Input,
  Button,
  Checkbox,
  Drawer,
  useDisclosure,
  Flex,
  Spacer,
  Portal,
  Field,
} from '@chakra-ui/react';
import { toaster } from '../../../components/ui/toaster';
import { useState, useCallback, useEffect, useRef } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import LeadershipTeamGrid from './LeadershipTeamGrid.js';
import { LuPencil, LuPlus } from 'react-icons/lu';

export default function AdminLeadershipTeamContainer(props) {
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

  const { open, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const createHandler = async () => {
    try {
      const leaderEmailsArr =
        (leaderEmails && leaderEmails.length > 0 && leaderEmails.split(',')) ||
        '';
      const cleanLeaderEmailsArr =
        (leaderEmailsArr && leaderEmailsArr.map((x) => x.trim())) || '';

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
      toaster.create({
        description: e.response.data,
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const updateHandler = async () => {
    try {
      const leaderEmailsArr =
        (leaderEmails && leaderEmails.length > 0 && leaderEmails.split(',')) ||
        '';
      const cleanLeaderEmailsArr =
        (leaderEmailsArr && leaderEmailsArr.map((x) => x.trim())) || '';

      const res = await axios.put('/api/leadership-team/update', {
        id,
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
      toaster.create({
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
        toaster.create({
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

      toaster.create({
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
      toaster.create({
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
              colorPalette="blue"
              onClick={unselectHandler}
              mr={['0', '2']}
              disabled={id === ''}
            >
              UNSELECT
            </Button>
            <Button colorPalette="teal" onClick={onOpen}>{id !== '' ? <LuPencil /> : <LuPlus />}{id !== '' ? 'EDIT' : 'ADD'}</Button>
          </Stack>
        </Box>
      </Flex>
      <Stack direction={['column']} w="100%">
        <Box w={['100%']}>
          <LeadershipTeamGrid teams={teams} setSelected={setSelected} />
        </Box>

        <Drawer.Root
          open={open}
          placement='end'
          initialFocusEl={() => firstField.current}
          size='lg'
          onOpenChange={e => {
            if (!e.open) {
              onClose();
            }
          }}
        >
          <Portal>

            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.CloseTrigger />
                <Drawer.Header></Drawer.Header>
                <Drawer.Body>
                  <form id="lt-form" onSubmit={onSubmit}>
                    <Field.Root required>
                      <Field.Label>Season From</Field.Label>
                      <Input
                        ref={firstField}
                        type="date"
                        value={seasonFrom}
                        onValueChange={(e) => setSeasonFrom(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Season To</Field.Label>
                      <Input
                        type="date"
                        value={seasonTo}
                        onValueChange={(e) => setSeasonTo(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Campus</Field.Label>
                      <Input
                        type="text"
                        value={campus}
                        onValueChange={(e) => setCampus(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Lifestage</Field.Label>
                      <Input
                        type="text"
                        value={lifestage}
                        onValueChange={(e) => setLifestage(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>LIFE Group</Field.Label>
                      <Input
                        type="text"
                        value={lifeGroup}
                        onValueChange={(e) => setLifeGroup(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Leader Emails</Field.Label>
                      <Input
                        type="text"
                        value={leaderEmails}
                        onValueChange={(e) => setLeaderEmailsStr(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root w="auto">
                      <Checkbox.Root
                        onCheckedChange={(e) => setDeleted(e.target.checked)}
                        checked={deleted}
                      ><Checkbox.HiddenInput /><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Checkbox.Label>Delete?
                                            </Checkbox.Label></Checkbox.Root>
                    </Field.Root>
                  </form>
                </Drawer.Body>
                <Drawer.Footer>
                  <Stack w="full" direction={['column', 'row']} gap={2}>
                    <Button
                      w={['100%', '50%']}
                      form="lt-form"
                      type="submit"
                      loading={isLoading}
                    >
                      {id && id.length > 0 ? 'UPDATE' : 'SAVE'}
                    </Button>
                    <Button
                      w={['100%', '50%']}
                      colorPalette="blue"
                      value={id}
                      onClick={duplicateHandler}
                      disabled={!id && id.length === 0}
                    >
                      DUPLICATE
                    </Button>
                  </Stack>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>

          </Portal>
        </Drawer.Root>
      </Stack>
    </Container>
  );
}
