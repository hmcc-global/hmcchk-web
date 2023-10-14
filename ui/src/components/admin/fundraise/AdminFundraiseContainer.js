import React, { useEffect, useState, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import AdminFundraiseGrid from './AdminFundraiseGrid';
import {
  Container,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  UnorderedList,
  Flex,
  VStack,
  Checkbox,
  Spacer,
  Button,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

export default function FundraiseContainer(props) {
  const toast = useToast();
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
      toast({
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
      toast({
        description: e.response.data,
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!campaignName || campaignName.length === 0 || campaignNameCheck())
      return;

    setIsLoading(true);
    let success = false;
    if (id && id.length > 0) {
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
    setMilestones('');
    setSelected();
  };
  const campaignNameCheck = () => {
    if (
      fundraises &&
      fundraises.some((i) => i.id !== id && i.campaignName === campaignName)
    )
      return true;

    return false;
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
            <FormControl isRequired isInvalid={campaignNameCheck()}>
              <FormLabel>Campaign Name</FormLabel>
              <Input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
              <FormErrorMessage>
                Another fundraising campaign with the same name already exists
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category Name</FormLabel>
              <Input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category Key</FormLabel>
              <Input
                type="text"
                value={categoryKey}
                onChange={(e) => setCategoryKey(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <NumberInput>
                <NumberInputField
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Givers</FormLabel>
              <NumberInput>
                <NumberInputField
                  value={givers}
                  onChange={(e) => setGivers(e.target.value)}
                />
              </NumberInput>
            </FormControl>
            <Text></Text>
            <Box borderWidth="1px" borderRadius="xl" m="2" py="3">
              <VStack spacing={4} align="start" m="2">
                <FormControl>
                  <FormLabel>Milestone Name</FormLabel>
                  <Input
                    type="text"
                    value={milestoneName}
                    onChange={(e) => setMilestoneName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Milestone Amount</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      value={milestoneAmount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Milestone Deadline</FormLabel>
                  <Input
                    type="datetime-local"
                    value={milestoneDeadline}
                    onChange={(e) => setMilestoneDeadline(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="blue" onClick={handleAddMilestones}>
                  Add Milestone
                </Button>
              </VStack>
              <UnorderedList>
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
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleRemoveMilestones(index)}
                        ml={2}
                        my="auto"
                        mx="1"
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </UnorderedList>
            </Box>
            <FormControl w="auto">
              <Checkbox
                isChecked={deleted}
                onChange={(e) => setDeleted(e.target.checked)}
              >
                Delete?
              </Checkbox>
            </FormControl>
            <FormControl mt={5}>
              <Button type="submit" w="full" isLoading={isLoading}>
                {id && id.length > 0 ? 'UPDATE' : 'SAVE'}
              </Button>
            </FormControl>
            <Button colorScheme="red" w="full" mt={5} onClick={resetHandler}>
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
