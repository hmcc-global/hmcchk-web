import React, { useEffect, useState, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import AdminFundraiseGrid from './AdminFundraiseGrid';
import {
  Container,
  Heading,
  Stack,
  Box,
  Input,
  Flex,
  VStack,
  Checkbox,
  Spacer,
  Button,
  Field,
  List,
} from '@chakra-ui/react';
import { toaster } from '../../../components/ui/toaster';

export default function FundraiseContainer() {
  const [fundraises, setFundraises] = useState([]);
  const [selected, setSelected] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryKey, setCategoryKey] = useState('');
  const [amount, setAmount] = useState('');
  const [givers, setGivers] = useState('');
  const [deleted, setDeleted] = useState(false);

  const [milestones, setMilestones] = useState([]);
  const [milestoneName, setMilestoneName] = useState('');
  const [milestoneAmount, setMilestoneAmount] = useState('');
  const [milestoneDeadline, setMilestoneDeadline] = useState('');

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/fundraise/admin-get');
      if (data) setFundraises(data);
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
      setCampaignName(selected.campaignName);
      setCategoryName(selected.categoryName);
      setCategoryKey(selected.categoryKey);
      setAmount(selected.amount);
      setGivers(selected.givers);
      setMilestones(selected.milestones);
      setDeleted(selected.isDeleted);
    }
  }, [selected]);

  const updateHandler = async () => {
    try {
      const res = await axios.put('/api/fundraise/update', {
        id,
        campaignName: campaignName,
        categoryName: categoryName,
        categoryKey: categoryKey,
        amount: amount,
        givers: givers,
        milestones: milestones,
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
  const createHandler = async () => {
    try {
      const res = await axios.post('/api/fundraise/create', {
        id,
        campaignName: campaignName,
        categoryName: categoryName,
        categoryKey: categoryKey,
        amount: amount,
        givers: givers,
        milestones: milestones,
      });

      if (res.status === 200) {
        const { data } = res;
        setId(data.id);
        return true;
      }
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
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!campaignName || campaignName.length === 0) return;

    setIsLoading(true);
    let success = false;
    if (id && id.length > 0) {
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
      await getData();
    }
    setIsLoading(false);
  };
  const resetHandler = () => {
    setId('');
    setCampaignName('');
    setCategoryName('');
    setCategoryKey('');
    setAmount('');
    setGivers('');
    setMilestones([]);
    setMilestoneName('');
    setMilestoneDeadline('');
    setMilestoneAmount('');
    setSelected();
  };

  const handleAddMilestones = () => {
    if (milestoneName && milestoneAmount && milestoneDeadline) {
      const newMilestone = {
        milestoneName,
        milestoneAmount,
        milestoneDeadline,
      };
      setMilestones([...milestones, newMilestone]);
      setMilestoneName('');
      setMilestoneAmount('');
      setMilestoneDeadline('');
    }
  };

  const handleRemoveMilestones = (index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        Fund Raising Manager
      </Heading>
      <Stack direction={['column', 'row']} w="100%">
        <Box w={['100%', '50%']}>
          <form onSubmit={onSubmit}>
            <Field.Root required>
              <Field.Label>Campaign Name</Field.Label>
              <Input
                type="text"
                value={campaignName}
                onValueChange={(e) => setCampaignName(e.target.value)}
              />
              <Field.ErrorText>
                Another fundraising campaign with the same name already exists
              </Field.ErrorText>
            </Field.Root>
            <Field.Root required>
              <Field.Label>Category Name</Field.Label>
              <Input
                type="text"
                value={categoryName}
                onValueChange={(e) => setCategoryName(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Category Key</Field.Label>
              <Input
                type="text"
                value={categoryKey}
                onValueChange={(e) => setCategoryKey(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Amount</Field.Label>
              <Input
                type="number"
                value={amount}
                onValueChange={(e) => setAmount(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Givers</Field.Label>
              <Input
                type="number"
                value={givers}
                onValueChange={(e) => setGivers(e.target.value)}
              />
            </Field.Root>
            <Box borderWidth="1px" borderRadius="xl" m="2" py="3">
              <VStack gap={4} align="start" m="2">
                <Field.Root>
                  <Field.Label>Milestone Name</Field.Label>
                  <Input
                    type="text"
                    value={milestoneName}
                    onValueChange={(e) => setMilestoneName(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Milestone Amount</Field.Label>
                  <Input
                    type="number"
                    value={milestoneAmount}
                    onValueChange={(e) => setMilestoneAmount(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Milestone Deadline</Field.Label>
                  <Input
                    type="text"
                    value={milestoneDeadline}
                    onValueChange={(e) => setMilestoneDeadline(e.target.value)}
                  />
                </Field.Root>
                <Button colorPalette="blue" onClick={handleAddMilestones}>
                  Add Milestone
                </Button>
              </VStack>
              <List.Root as='ul'>
                {milestones.map((milestone, index) => (
                  <Box key={index} w={['100%', '100%', '50%']} my="2">
                    <Flex>
                      <Box>
                        <strong>Milestone Name:</strong>{' '}
                        {milestone.milestoneName}
                        <br />
                        <strong>Milestone Amount:</strong>{' '}
                        {milestone.milestoneAmount}
                        <br />
                        <strong>Milestone Deadline:</strong>{' '}
                        {milestone.milestoneDeadline}
                        <br />
                      </Box>
                      <Spacer />
                      <Button
                        colorPalette="red"
                        size="sm"
                        onClick={() => handleRemoveMilestones(index)}
                        ml={2}
                        my="auto"
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </List.Root>
            </Box>
            <Field.Root w="auto">
              <Checkbox.Root
                onCheckedChange={(e) => setDeleted(e.target.checked)}
                checked={deleted}
              ><Checkbox.HiddenInput /><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Checkbox.Label>Delete?
                                </Checkbox.Label></Checkbox.Root>
            </Field.Root>
            <Field.Root mt={5}>
              <Button type="submit" w="full" loading={isLoading}>
                {id && id.length > 0 ? 'UPDATE' : 'SAVE'}
              </Button>
            </Field.Root>
            <Button colorPalette="red" w="full" mt={5} onClick={resetHandler}>
              RESET
            </Button>
          </form>
        </Box>
        <Box w={['100%', '50%']}>
          <AdminFundraiseGrid
            fundraises={fundraises}
            setSelected={setSelected}
          />
        </Box>
      </Stack>
    </Container>
  );
}
