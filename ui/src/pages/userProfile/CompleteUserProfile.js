import {
  Center,
  Container,
  Box,
  Text,
  Tabs,
  Field,
  Stack,
  Input,
  Select,
  Button,
  Switch,
  Flex,
  Dialog,
  CloseButton,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  countryList,
  districtList,
  ministryTeamList,
  regionList,
} from '../helpers/lists';
import {
  fixAddress,
  fixName,
  purgeFormFields,
  splitFullName,
  updateUserDataRequest,
} from '../helpers/userInformationHelpers';
import { customAxios as axios } from '../helpers/customAxios';

const CompleteUserProfileContainer = (props) => {
  const { user, history, staticData } = props;
  const { lifegroupList, lifestageList, campusList } = staticData;

  const formLabelColor = '#2C5282';
  const formValidation = { required: true };
  const [tabIndex, setTabIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = (e) => {
    setModalOpen(false);
  };

  const submitPartA = (data, e) => {
    for (let key in data) {
      reviewSetValue(key, data[key]);
    }
    setTabIndex(1);
  };

  const submitPartB = (data) => {
    for (let key in data) {
      reviewSetValue(key, data[key]);
    }
    setTabIndex(2);
  };

  const submitValidatedData = async (data) => {
    const reqErr = Error('there was a request failure');
    try {
      fixName(data);
      fixAddress(data);
      data.isBaptised = data.isBaptised ? true : false;
      data.isMember = data.isMember ? true : false;

      if (data.isBaptised) {
        const { status: baptismRes } = await axios.post('/api/baptism/create', {
          userId: user.id,
          officialName: data.fullName,
          baptismDate: data.baptismDate,
          baptismPlace: data.baptismPlace,
        });

        if (baptismRes !== 200) throw reqErr;
      }
      if (data.isMember) {
        const { status: membershipRes } = await axios.post(
          '/api/membership/create',
          {
            userId: user.id,
            officialName: data.fullName,
            recognitionDate: data.membershipRecognitionDate,
            recommitmentDate: data.membershipRecommitmentDate,
          }
        );

        if (membershipRes !== 200) throw reqErr;
      }

      purgeFormFields(data);

      // set user id
      data.id = user.id;
      data.hasFilledProfileForm = true;
      const { status } = await updateUserDataRequest(data);

      if (status === 200) setModalOpen(true);
      else throw reqErr;
    } catch (err) {
      console.log(err);
    }
  };

  // For part A
  const {
    register: registerA,
    handleSubmit: handleSubmitA,
    setValue: setValueA,
    formState: formStateA,
  } = useForm();
  const { errors: errorsA } = formStateA;

  // For part B
  const {
    register: registerB,
    control: controlB,
    handleSubmit: handleSubmitB,
    formState: formStateB,
    watch: watchB,
  } = useForm();
  const { errors: errorsB } = formStateB;

  // For review
  const {
    register: reviewRegister,
    control: reviewControl,
    handleSubmit: reviewHandleSubmit,
    setValue: reviewSetValue,
  } = useForm();

  let isMember = watchB('isMember');
  let isBaptised = watchB('isBaptised');

  useEffect(() => {
    if (user.id) {
      let { firstName, lastName } = splitFullName(user.fullName);
      setValueA('firstName', firstName);
      setValueA('lastName', lastName);
      setValueA('countryOfOrigin', user.countryOfOrigin);
      setValueA('lifestage', user.lifestage);
      setValueA('phoneNumber', user.phoneNumber);
    }
  }, [user]);

  return (
    <>
      <Dialog.Root
        open={modalOpen}
        onOpenChange={(next) => {
          if (!next) onModalClose();
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="20">
            <Dialog.CloseTrigger asChild>
              <CloseButton aria-label="Close" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Center>
                <CheckCircleIcon mt={5} w="15%" h="15%" color="#0628A3" />
              </Center>
            </Dialog.Header>

            <Dialog.Body>
              <Center fontSize="md" fontWeight="600" color="#171923">
                Your HMCC Profile is all set
              </Center>
              <Center fontSize="sm" color="#718096" textAlign="center">
                Thanks for sharing your information with us, welcome onboard!
              </Center>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                size="sm"
                color="#FFFFFF"
                background="#0628A3"
                borderRadius="10"
                variant="solid"
                w="100%"
                _hover={{
                  background: '#062286',
                }}
                onClick={() => {
                  history.push('/');
                }}
              >
                Return to homepage
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      <Container maxW="container.lg">
        <Center
          textAlign="center"
          mt="3%"
          mb="3%"
          fontWeight="900"
          fontSize={['36', '48']}
        >
          Completing your HMCC Profile
        </Center>
        <Tabs.Root
          border="1px solid #E2E8F0"
          borderRadius="4px"
          p="4%"
          variant="unstyled"
          mb="5%"
          value={tabIndex}
          onValueChange={({ value }) => setTabIndex(value)}
        >
          <Tabs.List border="none" pointerEvents="none">
            <Tabs.Trigger
              value={0}
              flex={1}
              fontSize="sm"
              fontWeight="500"
              borderTop="5px solid #E2E8F0"
              mr={['2%', '4%']}
              pl="0"
              alignItems={['center', 'flex-start']}
              flexDirection="column"
              _selected={{ borderColor: '#0628A3' }}
            >
              <Text mt="2" color="#0628A3">
                STEP 1
              </Text>
              <Text fontSize={['xs', 'sm']} color="#2D3748">
                Personal Profile
              </Text>
            </Tabs.Trigger>
            <Tabs.Trigger
              value={1}
              flex={1}
              fontSize="sm"
              fontWeight="500"
              borderTop="5px solid #E2E8F0"
              mr={['2%', '4%']}
              pl="0"
              alignItems={['center', 'flex-start']}
              flexDirection="column"
              _selected={{ borderColor: '#0628A3' }}
            >
              <Text mt="2" color="#0628A3">
                STEP 2
              </Text>
              <Text fontSize={['xs', 'sm']} color="#2D3748">
                Church Profile
              </Text>
            </Tabs.Trigger>
            <Tabs.Trigger
              value={2}
              flex={1}
              fontSize="sm"
              fontWeight="500"
              borderTop="5px solid #E2E8F0"
              mr={['2%', '4%']}
              pl="0"
              alignItems={['center', 'flex-start']}
              flexDirection="column"
              _selected={{ borderColor: '#0628A3' }}
            >
              <Text mt="2" color="#0628A3">
                STEP 3
              </Text>
              <Text fontSize={['xs', 'sm']} color="#2D3748">
                Review
              </Text>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value={0}>
            <form onSubmit={handleSubmitA(submitPartA)}>
              <Stack spacing="2%">
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      First Name (and Middle Name)
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...registerA('firstName', formValidation)}
                      isInvalid={errorsA['firstName']}
                      placeholder="Please fill in this field"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Last Name
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...registerA('lastName', formValidation)}
                      isInvalid={errorsA['lastName']}
                      placeholder="Please fill in this field"
                    />
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Birthday
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Input
                      type="date"
                      size="sm"
                      borderRadius="5"
                      {...registerA('birthday', formValidation)}
                      isInvalid={errorsA['birthday']}
                      placeholder="Please fill in this field"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Country of Origin
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...registerA('countryOfOrigin', formValidation)}
                      isInvalid={errorsA['countryOfOrigin']}
                      placeholder="Please fill in this field"
                    >
                      {countryList.map((item) => {
                        return <option key={'co' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Lifestage
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...registerA('lifestage', formValidation)}
                      isInvalid={errorsA['lifestage']}
                      placeholder="Please fill in this field"
                    >
                      {lifestageList.map((item) => {
                        return <option key={'life' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Campus
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...registerA('campus', formValidation)}
                      isInvalid={errorsA['campus']}
                      placeholder="Please fill in this field"
                    >
                      {campusList.map((item) => {
                        return <option key={'ca' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={1}>
                    <Field.Label color={formLabelColor}>
                      Phone Number
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...registerA('phoneNumber')}
                    />
                  </Field.Root>
                  <Box flex={[0, 1]}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: Floor / Level
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...registerA('addressFloor')}
                      placeholder="This field is optional"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: Room / Flat / Unit / Suite
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...registerA('addressFlat')}
                      placeholder="This field is optional"
                    />
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: Street Address
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...registerA('addressStreet')}
                      placeholder="This field is optional"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: District
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...registerA('addressDistrict')}
                      placeholder="This field is optional"
                    >
                      {districtList.map((item) => {
                        return <option key={'di' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={1}>
                    <Field.Label color="#2C5282">Address: Region</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...registerA('addressRegion')}
                      placeholder="This field is optional"
                    >
                      {regionList.map((item) => {
                        return <option key={'re' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={[0, 1]}></Box>
                </Stack>
                <Center>
                  <Button
                    size="sm"
                    mt="5%"
                    color="#0628A3"
                    borderColor="#0628A3"
                    borderRadius="10"
                    variant="outline"
                    minW={['10%', '20%']}
                    type="submit"
                  >
                    Next
                  </Button>
                </Center>
              </Stack>
            </form>
          </Tabs.Content>
          <Tabs.Content value={1}>
            <form onSubmit={handleSubmitB(submitPartB)}>
              <Stack spacing={['4%', '2%']}>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={2}>
                    <Field.Label color={formLabelColor}>
                      LIFE Group
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...registerB('lifeGroup', formValidation)}
                      isInvalid={errorsB['lifeGroup']}
                      placeholder="Please fill in this field"
                    >
                      {lifegroupList.map((item) => {
                        return <option key={'li' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={1} display={['none', 'block']}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={2}>
                    <Field.Label color={formLabelColor}>
                      Ministry Team
                      <Text as="span" color="red">
                        *
                      </Text>
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...registerB('ministryTeam', formValidation)}
                      isInvalid={errorsB['ministryTeam']}
                      placeholder="Please fill in this field"
                    >
                      {ministryTeamList.map((item) => {
                        return <option key={'mt' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={1} display={['none', 'block']}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={[1, 4]}>
                    <Stack direction="row">
                      <Text
                        flex={[3, 1]}
                        fontWeight="500"
                        mr="3%"
                        color="#2C5282"
                      >
                        HMCC Covenant Signing Member
                        <Text as="span" color="red">
                          *
                        </Text>
                      </Text>
                      <Box flex={[2, 1]}>
                        <Controller
                          control={controlB}
                          name={'isMember'}
                          render={({ field: { onChange, value, ref } }) => (
                            <Switch
                              onChange={onChange}
                              ref={ref}
                              isChecked={value}
                              defaultChecked={false}
                            />
                          )}
                        />
                        <Text ml="3" fontWeight="500" as="span">
                          {isMember ? 'Yes' : 'No'}
                        </Text>
                      </Box>
                    </Stack>
                    <Field.HelperText>
                      An HMCC Covenant Signing Member is someone who has
                      attended HMCC’s Experiencing Membership Class and has
                      decided to sign (in-person) the Membership Declaration.
                    </Field.HelperText>
                  </Field.Root>
                  <Box flex={[0, 1]}></Box>
                </Stack>
                {isMember && (
                  <Stack direction={['column', 'row']} spacing="4%">
                    <Stack
                      direction={['column', 'row']}
                      spacing="4%"
                      border="1px solid #E2E8F0"
                      borderRadius="6"
                      p={['5%', '3%']}
                      pt={['5%', '2%']}
                      flex={[1, 4]}
                    >
                      <Field.Root>
                        <Field.Label color="#2C5282">
                          Recognition Date
                        </Field.Label>
                        <Input
                          size="sm"
                          type="date"
                          borderRadius="5"
                          {...registerB('membershipRecognitionDate')}
                          placeholder="This field is optional"
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label color="#2C5282">
                          Last Recommitment Date
                        </Field.Label>
                        <Input
                          size="sm"
                          type="date"
                          borderRadius="5"
                          {...registerB('membershipRecommitmentDate')}
                          placeholder="Please fill in this field"
                        />
                      </Field.Root>
                    </Stack>
                    <Box flex={[0, 1]}></Box>
                  </Stack>
                )}
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={[1, 4]}>
                    <Stack direction="row">
                      <Text
                        flex={[3, 1]}
                        fontWeight="500"
                        mr="3%"
                        color="#2C5282"
                      >
                        Baptised
                        <Text as="span" color="red">
                          *
                        </Text>
                      </Text>
                      <Box flex={[2, 1]}>
                        <Controller
                          control={controlB}
                          name={'isBaptised'}
                          render={({ field: { onChange, value, ref } }) => (
                            <Switch
                              onChange={onChange}
                              ref={ref}
                              isChecked={value}
                              defaultValue={false}
                            />
                          )}
                        />
                        <Text ml="3" fontWeight="500" as="span">
                          {isBaptised ? 'Yes' : 'No'}
                        </Text>
                      </Box>
                    </Stack>
                  </Field.Root>
                  <Box flex={[0, 1]}></Box>
                </Stack>
                {isBaptised && (
                  <Stack direction={['column', 'row']} spacing="4%">
                    <Stack
                      direction={['column', 'row']}
                      spacing="4%"
                      border="1px solid #E2E8F0"
                      borderRadius="6"
                      p={['5%', '3%']}
                      pt={['5%', '2%']}
                      flex={[1, 4]}
                    >
                      <Field.Root>
                        <Field.Label color="#2C5282">Baptism Place</Field.Label>
                        <Input
                          size="sm"
                          borderRadius="5"
                          {...registerB('baptismPlace')}
                          placeholder="Optional but please fill in if you can!"
                        />
                        <Field.HelperText>
                          ‘HMCC Hong Kong’ if you are baptised with us,
                          otherwise state where you were baptised or the name of
                          your previous home church.
                        </Field.HelperText>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label color="#2C5282">Baptism Date</Field.Label>
                        <Input
                          size="sm"
                          type="date"
                          borderRadius="5"
                          {...registerB('baptismDate')}
                        />
                        <Field.HelperText>
                          To the best of your memory :)
                        </Field.HelperText>
                      </Field.Root>
                    </Stack>
                    <Box flex={[0, 1]}></Box>
                  </Stack>
                )}
                <Flex>
                  <Button
                    size="sm"
                    mt="1"
                    color="#0628A3"
                    borderColor="#0628A3"
                    borderRadius="10"
                    variant="outline"
                    minW={['50%', '20%']}
                    onClick={() => {
                      setTabIndex(0);
                    }}
                  >
                    Previous Page
                  </Button>
                  <Button
                    size="sm"
                    ml="2%"
                    mt="1"
                    color="#FFFFFF"
                    background="#0628A3"
                    borderRadius="10"
                    variant="solid"
                    minW={['50%', '20%']}
                    type="submit"
                    _hover={{
                      background: '#062286',
                    }}
                  >
                    Review
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Tabs.Content>
          <Tabs.Content value={2}>
            <form onSubmit={reviewHandleSubmit(submitValidatedData)}>
              <Stack spacing="2%">
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      First Name (and Middle Name)
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      isReadOnly
                      {...reviewRegister('firstName')}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>Last Name</Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      isReadOnly
                      {...reviewRegister('lastName')}
                    />
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>Birthday</Field.Label>
                    <Input
                      type="date"
                      size="sm"
                      borderRadius="5"
                      isReadOnly
                      {...reviewRegister('birthday')}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Country of Origin
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      pointerEvents="none"
                      {...reviewRegister('countryOfOrigin')}
                    >
                      {countryList.map((item) => {
                        return <option key={'co' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>Lifestage</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      pointerEvents="none"
                      {...reviewRegister('lifestage')}
                    >
                      {lifestageList.map((item) => {
                        return <option key={'life' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>Campus</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      pointerEvents="none"
                      {...reviewRegister('campus')}
                    >
                      {campusList.map((item) => {
                        return <option key={'ca' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={1}>
                    <Field.Label color={formLabelColor}>
                      Phone Number
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      isReadOnly
                      {...reviewRegister('phoneNumber')}
                    />
                  </Field.Root>
                  <Box flex={1}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: Floor / Level
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      isReadOnly
                      {...reviewRegister('addressFloor')}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: Room / Flat / Unit / Suite
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      isReadOnly
                      {...reviewRegister('addressFlat')}
                    />
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: Street Address
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      isReadOnly
                      {...reviewRegister('addressStreet')}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color={formLabelColor}>
                      Address: District
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      pointerEvents="none"
                      {...reviewRegister('addressDistrict')}
                    >
                      {districtList.map((item) => {
                        return <option key={'di' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={1}>
                    <Field.Label color="#2C5282">Address: Region</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      pointerEvents="none"
                      {...reviewRegister('addressRegion')}
                    >
                      {regionList.map((item) => {
                        return <option key={'re' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={[0, 1]}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={2}>
                    <Field.Label color={formLabelColor}>LIFE Group</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      pointerEvents="none"
                      {...reviewRegister('lifeGroup')}
                    >
                      {lifegroupList.map((item) => {
                        return <option key={'li' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={1}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={[1, 2]}>
                    <Field.Label color={formLabelColor}>
                      Ministry Team
                    </Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      pointerEvents="none"
                      {...reviewRegister('ministryTeam')}
                    >
                      {ministryTeamList.map((item) => {
                        return <option key={'mt' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={1}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={[1, 4]}>
                    <Stack direction="row">
                      <Text
                        flex={[3, 1]}
                        fontWeight="500"
                        mr="3%"
                        color="#2C5282"
                      >
                        HMCC Covenant Signing Member
                      </Text>
                      <Box flex={[2, 1]}>
                        <Controller
                          control={reviewControl}
                          name={'isMember'}
                          render={({ field: { onChange, value, ref } }) => (
                            <Switch
                              onChange={onChange}
                              ref={ref}
                              isChecked={value}
                              defaultChecked={false}
                              isReadOnly
                            />
                          )}
                        />
                        <Text ml="3" fontWeight="500" as="span">
                          {isMember ? 'Yes' : 'No'}
                        </Text>
                      </Box>
                    </Stack>
                    <Field.HelperText>
                      An HMCC Covenant Signing Member is someone who has
                      attended HMCC’s Experiencing Membership Class and has
                      decided to sign (in-person) the Membership Declaration{' '}
                    </Field.HelperText>
                  </Field.Root>
                  <Box flex={[0, 1]}></Box>
                </Stack>
                {isMember && (
                  <Stack direction={['column', 'row']} spacing="4%">
                    <Stack
                      direction={['column', 'row']}
                      spacing="4%"
                      border="1px solid #E2E8F0"
                      borderRadius="6"
                      p={['5%', '3%']}
                      pt={['5%', '2%']}
                      flex={[1, 4]}
                    >
                      <Field.Root>
                        <Field.Label color="#2C5282">
                          Recognition Date
                        </Field.Label>
                        <Input
                          size="sm"
                          type="date"
                          borderRadius="5"
                          isReadOnly
                          {...reviewRegister('membershipRecognitionDate')}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label color="#2C5282">
                          Last Recommitment Date
                        </Field.Label>
                        <Input
                          size="sm"
                          type="date"
                          borderRadius="5"
                          isReadOnly
                          {...reviewRegister('membershipRecommitmentDate')}
                        />
                      </Field.Root>
                    </Stack>
                    <Box flex={[0, 1]}></Box>
                  </Stack>
                )}
                <Stack direction={['column', 'row']} spacing="4%">
                  <Field.Root flex={[1, 4]}>
                    <Stack direction="row">
                      <Text
                        flex={[3, 1]}
                        fontWeight="500"
                        mr="3%"
                        color="#2C5282"
                      >
                        Baptised
                      </Text>
                      <Box flex={[2, 1]}>
                        <Controller
                          control={reviewControl}
                          name={'isBaptised'}
                          render={({ field: { onChange, value, ref } }) => (
                            <Switch
                              onChange={onChange}
                              ref={ref}
                              isChecked={value}
                              defaultChecked={false}
                              isReadOnly
                            />
                          )}
                        />
                        <Text ml="3" fontWeight="500" as="span">
                          {isBaptised ? 'Yes' : 'No'}
                        </Text>
                      </Box>
                    </Stack>
                  </Field.Root>
                  <Box flex={[0, 1]}></Box>
                </Stack>
                {isBaptised && (
                  <Stack direction={['column', 'row']} spacing="4%">
                    <Stack
                      direction={['column', 'row']}
                      spacing="4%"
                      border="1px solid #E2E8F0"
                      borderRadius="6"
                      p={['5%', '3%']}
                      pt={['5%', '2%']}
                      flex={[1, 4]}
                    >
                      <Field.Root>
                        <Field.Label color="#2C5282">Baptism Place</Field.Label>
                        <Input
                          size="sm"
                          borderRadius="5"
                          isReadOnly
                          {...reviewRegister('baptismPlace')}
                        />
                        <Field.HelperText>
                          ‘HMCC Hong Kong’ if you are baptised with us,
                          otherwise state where you were baptised or the name of
                          your previous home church.
                        </Field.HelperText>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label color="#2C5282">Baptism Date</Field.Label>
                        <Input
                          size="sm"
                          type="date"
                          borderRadius="5"
                          isReadOnly
                          {...reviewRegister('baptismDate')}
                        />
                        <Field.HelperText>
                          To the best of your memory :)
                        </Field.HelperText>
                      </Field.Root>
                    </Stack>
                    <Box flex={[0, 1]}></Box>
                  </Stack>
                )}
                <Flex>
                  <Button
                    size="sm"
                    mt="1"
                    color="#0628A3"
                    borderColor="#0628A3"
                    borderRadius="10"
                    variant="outline"
                    minW={['50%', '20%']}
                    onClick={() => {
                      setTabIndex(1);
                    }}
                  >
                    Previous Page
                  </Button>
                  <Button
                    size="sm"
                    ml="2%"
                    mt="1"
                    color="#FFFFFF"
                    background="#0628A3"
                    borderRadius="10"
                    variant="solid"
                    minW={['50%', '20%']}
                    _hover={{
                      background: '#062286',
                    }}
                    type="submit"
                  >
                    Save Profile
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </>
  );
};

export default CompleteUserProfileContainer;
