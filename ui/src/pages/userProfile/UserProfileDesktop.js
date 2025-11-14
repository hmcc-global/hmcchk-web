import {
  Box,
  Text,
  Tabs,
  Field,
  Flex,
  Input,
  InputGroup,
  Button,
  Stack,
  Center,
  Switch,
  Select,
  Dialog,
  VStack,
  CloseButton,
  HStack,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { customAxios as axios } from '../helpers/customAxios';
import { useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  ministryTeamList,
  districtList,
  countryList,
  regionList,
} from '../helpers/lists';
import {
  settableDataFields,
  userDataCleanup,
  getUserDataRequest,
  updateUserDataRequest,
  getLoginOnlyFormsRequest,
  generatePublishedFormLinks,
} from '../helpers/userInformationHelpers';
import SermonNotesPagination from './SermonNotesPagination';

const UserProfileDesktop = (props) => {
  const { user, staticData } = props;
  const { lifegroupList, lifestageList, campusList } = staticData;

  const { register, control, handleSubmit, setValue, formState } = useForm();
  const { errors } = formState;
  const [userData, setUserData] = useState(null);
  const [formList, setFormList] = useState(null);
  const [unsignedFormList, setUnsignedFormList] = useState([]);
  const [signedUpFormList, setSignedUpFormList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSermonNoteTab, setActiveSermonNoteTab] = useState('all');
  const [userSermonNotes, setUserSermonNotes] = useState([]);
  const [sermonSeriesList, setSermonSeriesList] = useState([]);
  const [selectedSermonSeries, setSelectedSermonSeries] = useState('');
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageSaved, setCurrentPageSaved] = useState(1);

  const setUserInformationFields = (userData) => {
    for (let key in userData) {
      if (settableDataFields.includes(key)) {
        switch (key) {
          case 'fullName':
            let nameParts = userData.fullName.split(' ');
            let lastName = nameParts.pop(-1);
            let firstName = nameParts.join(' ');
            setValue('firstName', firstName);
            setValue('lastName', lastName);
            break;
          case 'address':
            if (userData[key]) {
              setValue('addressFloor', userData[key]['floor']);
              setValue('addressFlat', userData[key]['flat']);
              setValue('addressStreet', userData[key]['street']);
              setValue('addressDistrict', userData[key]['district']);
              setValue('addressRegion', userData[key]['region']);
            }
            break;
          case 'baptismInfo':
            if (userData[key] && userData[key][0]) {
              setValue('baptismDate', userData[key][0]['baptismDate']);
              setValue('baptismPlace', userData[key][0]['baptismPlace']);
            }
            break;
          case 'membershipInfo':
            if (userData[key] && userData[key][0]) {
              setValue(
                'membershipRecognitionDate',
                userData[key][0]['recognitionDate']
              );
              setValue(
                'membershipRecommitmentDate',
                userData[key][0]['recommitmentDate']
              );
            }
            break;
          default:
            setValue(key, userData[key]);
            break;
        }
      }
    }
  };

  const onModalClose = (e) => {
    setModalOpen(false);
  };

  const fetchUserData = useCallback(async () => {
    if (user.id) {
      const { data, status } = await getUserDataRequest(user.id);

      if (status === 200) {
        setUserData(data[0]);
        setUserInformationFields(data[0]);
      }
    }
  }, [user.id]);

  const fetchPublishedForms = useCallback(async () => {
    //get all forms
    const { data, status } = await getLoginOnlyFormsRequest();
    if (status === 200) {
      setFormList([...data]);
    }
  }, []);

  const fetchSignedUpForms = useCallback(async () => {
    //get signed up forms
    const { data, status } = await axios.get('/api/forms/get-signedup-form', {
      params: {
        userId: user.id,
      },
    });

    if (status === 200) {
      setSignedUpFormList([...data]);
    }
  }, [user.id]);

  const fetchUnsignedUpForms = useCallback(async () => {
    //get signed up forms
    const { data, status } = await axios.get('/api/forms/get-unsignedup-form', {
      params: {
        userId: user.id,
      },
    });

    if (status === 200) {
      setUnsignedFormList([...data]);
    }
  }, [user.id]);

  const fetchUserSermonNotes = useCallback(async () => {
    const { data, status } = await axios.get('/api/sermons/get-sermon-notes', {
      params: {
        userId: user.id,
      },
    });

    if (status === 200) {
      setUserSermonNotes(data);
      const uniqueSeries = extractUniqueSermonSeries(data);
      setSermonSeriesList(uniqueSeries);
    }
  }, [user.id]);

  const extractUniqueSermonSeries = (notes) => {
    const seriesSet = new Set(notes.map((note) => note.sermonSeries));
    return [...seriesSet];
  };

  const sermonNotes = userSermonNotes.filter((note) => {
    if (activeSermonNoteTab === 'all') {
      return selectedSermonSeries
        ? note.sermonSeries === selectedSermonSeries
        : true;
    }

    if (activeSermonNoteTab === 'my') {
      return note.isSaved;
    }

    return true;
  });

  // Implementation needs some component specific customization
  const handleEditUserInformation = async (data, e) => {
    userDataCleanup(data);

    // set user id
    data.id = user.id;

    const { status } = await updateUserDataRequest(data);
    if (status === 200) {
      setModalOpen(true);
      fetchUserData();
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveSermonNoteTab(tab);
    if (tab === 'all') {
      setCurrentPageSaved(1); // Reset page for the saved tab
    } else {
      setCurrentPageAll(1); // Reset page for the all tab
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPublishedForms();
    fetchSignedUpForms();
    fetchUnsignedUpForms();
    fetchUserSermonNotes();
  }, [
    fetchUserData,
    fetchPublishedForms,
    fetchSignedUpForms,
    fetchUnsignedUpForms,
    fetchUserSermonNotes,
  ]);

  const inputBox = {
    color: '#718096',
    background: '#EDF2F7',
    border: '1px solid #E2E8F0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    flexGrow: '0',
    margin: '10px 0px',
    padding: '15px',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textAlign: 'center',
  };

  const tabText = {
    borderBottom: '2px solid #0628A3',
    marginBottom: '-2px',
    color: '#000000',
  };

  const tabTitle = {
    w: 'fit-content',
    pr: '1',
    pl: '1',
    color: '#0628A3',
    fontWeight: '700',
  };

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
            <VStack>
              <Text
                color="#0628A3"
                fontSize="2xl"
                fontWeight="700"
                mt={6}
                flex={1}
                textAlign="center"
              >
                Edited successfully
              </Text>
              <Box flex={4}>
                <Center w="100%" h="100%">
                  <CheckCircleIcon mt={5} w="50%" h="50%" color="#0628A3" />
                </Center>
              </Box>
            </VStack>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      <Flex
        mt={{ md: '40px', lg: '60px', xl: '80px' }}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <Box
          fontWeight="800"
          fontSize={{ md: '3rem', lg: '3.25rem', xl: '3.5rem' }}
        >
          <Text>Welcome Back,&nbsp;</Text>
          {userData && userData.fullName && (
            <Text>{userData.fullName.split(' ')[0]}</Text>
          )}
        </Box>
        <Box
          width="full"
          fontSize="1.1rem"
          fontWeight="600"
          mt="2.5%"
          textAlign="center"
        >
          <Text color="#2C5282">Your Registered Email Address</Text>
          <Input width="50%" style={inputBox} readOnly {...register('email')} />
        </Box>
      </Flex>
      <form onSubmit={handleSubmit(handleEditUserInformation)}>
        <Tabs.Root
          mt="5%"
          mb="5%"
          orientation="vertical"
          variant="unstyled"
          defaultValue="signup"
        >
          <Box flex={1}>
            <Tabs.List border="none" alignItems="flex-end">
              <Tabs.Trigger
                value="signup"
                style={tabTitle}
                _selected={{ md: tabText }}
              >
                Signup Links
              </Tabs.Trigger>
              <Tabs.Trigger
                value="sermons"
                style={tabTitle}
                _selected={{ md: tabText }}
                mt={5}
              >
                Sermon Notes
              </Tabs.Trigger>
              <Tabs.Trigger
                value="personal"
                style={tabTitle}
                _selected={{ md: tabText }}
                mt={5}
              >
                Personal Profile
              </Tabs.Trigger>
              <Tabs.Trigger
                value="church"
                style={tabTitle}
                _selected={{ md: tabText }}
                mt={5}
              >
                Church Profile
              </Tabs.Trigger>
            </Tabs.List>
          </Box>
          <div
            flex={4}
            bgColor="#ffffff"
            ml="5"
            style={{ border: '1px solid #EBEBEB', borderRadius: '10px' }}
          >
            <Tabs.Content value="signup" p="5%">
              <Stack direction="row" spacing="5">
                {formList && formList.length > 0 && (
                  <>
                    <Box width="50%">
                      <Text
                        fontSize="1.1rem"
                        fontWeight="700"
                        color="#718096"
                        mb="5"
                      >
                        Available Signup Links:
                      </Text>
                      {generatePublishedFormLinks(unsignedFormList, false)}
                    </Box>
                    <Box width="50%">
                      <Text
                        fontSize="1.1rem"
                        fontWeight="700"
                        color="#718096"
                        mb="5"
                      >
                        Your Signups:
                      </Text>
                      {generatePublishedFormLinks(signedUpFormList, true)}
                    </Box>
                  </>
                )}
                {/* {user.password !== "" && (
                <Button
                  size="sm"
                  mt="8"
                  color="#0628A3"
                  borderColor="#0628A3"
                  borderRadius="10"
                  variant="outline"
                >
                  Change Password
                </Button>
              )} */}
              </Stack>
            </Tabs.Content>
            <Tabs.Content value="sermons" p="5%">
              <HStack gap={5} mb={5}>
                <Button
                  borderRadius={30}
                  bg={activeSermonNoteTab === 'all' ? '#4A6EEB' : '#DFE7FF'}
                  color={activeSermonNoteTab === 'all' ? 'white' : '#4A6EEB'}
                  onClick={() => handleTabSwitch('all')}
                  px={5}
                  _hover={{
                    bg: activeSermonNoteTab === 'all' ? '#4A6EEB' : '#DFE7FF',
                    color: activeSermonNoteTab === 'all' ? 'white' : '#4A6EEB',
                  }}
                >
                  <Text fontWeight="semibold" mx={2}>
                    All Sermon Notes
                  </Text>
                </Button>
                <Button
                  borderRadius={30}
                  bg={activeSermonNoteTab === 'my' ? '#4A6EEB' : '#DFE7FF'}
                  color={activeSermonNoteTab === 'my' ? 'white' : '#4A6EEB'}
                  onClick={() => handleTabSwitch('my')}
                  px={5}
                  _hover={{
                    bg: activeSermonNoteTab === 'my' ? '#4A6EEB' : '#DFE7FF',
                    color: activeSermonNoteTab === 'my' ? 'white' : '#4A6EEB',
                  }}
                >
                  <Text fontWeight="semibold">Saved Sermon Notes</Text>
                </Button>
              </HStack>

              {activeSermonNoteTab === 'all' && (
                <>
                  <Text
                    color="#0628A3"
                    fontSize="1.1rem"
                    fontWeight={700}
                    mb={3}
                  >
                    Sermon Series
                  </Text>
                  <Select
                    placeholder="Select Sermon Series"
                    value={selectedSermonSeries}
                    onChange={(e) => setSelectedSermonSeries(e.target.value)}
                    width="50%"
                    mb={4}
                  >
                    {sermonSeriesList.map((series) => {
                      if (series !== '') {
                        return (
                          <option key={series} value={series}>
                            {series}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </Select>
                </>
              )}

              {/* Pass pagination state to SermonNotesPagination */}
              <SermonNotesPagination
                sermonNotes={sermonNotes}
                currentPage={
                  activeSermonNoteTab === 'all'
                    ? currentPageAll
                    : currentPageSaved
                }
                setCurrentPage={
                  activeSermonNoteTab === 'all'
                    ? setCurrentPageAll
                    : setCurrentPageSaved
                }
              />
            </Tabs.Content>
            <Tabs.Content value="personal" p="7%">
              <Stack spacing="2%">
                <Stack direction={['column', 'row']} spacing="7%">
                  <Field.Root>
                    <Field.Label color="#2C5282">
                      First Name (and Middle Name)
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('firstName', { required: true })}
                      invalid={errors['firstName']}
                      placeholder="Please fill in this field"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="#2C5282">Last Name</Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('lastName', { required: true })}
                      invalid={errors['lastName']}
                      placeholder="Please fill in this field"
                    />
                    <Field.HelperText>
                      Enter "N/A" if not applicable for you
                    </Field.HelperText>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="7%">
                  <Field.Root>
                    <Field.Label color="#2C5282">Country of Origin</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register('countryOfOrigin', { required: true })}
                      invalid={errors['countryOfOrigin']}
                      placeholder="Please fill in this field"
                    >
                      {countryList.map((item) => {
                        return <option key={'co' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="#2C5282">Lifestage</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register('lifestage', { required: true })}
                      invalid={errors['lifestage']}
                      placeholder="Please fill in this field"
                    >
                      {lifestageList.map((item) => {
                        return <option key={'life' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="7%">
                  <Field.Root>
                    <Field.Label color="#2C5282">
                      Address: Floor / Level
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('addressFloor')}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="#2C5282">Campus</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register('campus')}
                      pointerEvents="none"
                    >
                      {campusList.map((item) => {
                        return <option key={'ca' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="7%">
                  <Field.Root>
                    <Field.Label color="#2C5282">
                      Address: Room / Flat / Unit / Suite
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('addressFlat')}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="#2C5282">Phone Number</Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('phoneNumber', { required: true })}
                      invalid={errors['phoneNumber']}
                      placeholder="Please fill in this field"
                    />
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="7%">
                  <Field.Root>
                    <Field.Label color="#2C5282">
                      Address: Street Address
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('addressStreet')}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="#2C5282">Birthday</Field.Label>
                    <Input
                      size="sm"
                      type="date"
                      borderRadius="5"
                      {...register('birthday')}
                    />
                  </Field.Root>
                </Stack>
                <Stack direction={['column', 'row']} spacing="7%">
                  <Field.Root flex={1}>
                    <Field.Label color="#2C5282">Address: District</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register('addressDistrict')}
                    >
                      {districtList.map((item) => {
                        return <option key={'di' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={1}></Box>
                </Stack>
                <Stack direction={['column', 'row']} spacing="7%">
                  <Field.Root flex={1}>
                    <Field.Label color="#2C5282">Address: Region</Field.Label>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register('addressRegion')}
                    >
                      {regionList.map((item) => {
                        return <option key={'re' + item}>{item}</option>;
                      })}
                    </Select>
                  </Field.Root>
                  <Box flex={1}></Box>
                </Stack>
              </Stack>
              <Button
                size="sm"
                mt="5%"
                color="#0628A3"
                borderColor="#0628A3"
                borderRadius="10"
                variant="outline"
                type="submit"
              >
                Save Information
              </Button>
            </Tabs.Content>
            <Tabs.Content value="church" p="7%">
              <Stack spacing="3%">
                <Field.Root>
                  <Field.Label color="#2C5282">LIFE Group</Field.Label>
                  <Select size="sm" borderRadius="5" {...register('lifeGroup')}>
                    {lifegroupList.map((item) => {
                      return <option key={'lg' + item}>{item}</option>;
                    })}
                  </Select>
                </Field.Root>
                <Field.Root>
                  <Field.Label color="#2C5282">Ministry Team</Field.Label>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register('ministryTeam')}
                  >
                    {ministryTeamList.map((item) => {
                      return <option key={'mt' + item}>{item}</option>;
                    })}
                  </Select>
                </Field.Root>

                <Field.Root>
                  <Stack direction="row">
                    <Text flex={1} fontWeight="500" mr="3%" color="#2C5282">
                      Church Member
                    </Text>
                    <Box flex={4}>
                      <Controller
                        control={control}
                        name={'isMember'}
                        render={({ field: { onChange, value, ref } }) => (
                          <Switch
                            size="lg"
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                            isReadOnly
                          />
                        )}
                      />
                      <Text ml="3" fontWeight="500" as="span">
                        Yes
                      </Text>
                    </Box>
                  </Stack>
                  <Field.HelperText>
                    An HMCC Covenant Signing Member is someone who has attended
                    HMCC’s Experiencing Membership Class and has decided to sign
                    (in-person) the Membership Declaration{' '}
                  </Field.HelperText>
                </Field.Root>
                <Stack
                  direction="row"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p="4%"
                  spacing="4%"
                >
                  <Field.Root>
                    <Field.Label color="#2C5282">Recognition Date</Field.Label>
                    <InputGroup size="sm" endAddon="Date">
                      <Input
                        size="sm"
                        type="date"
                        borderRadius="5"
                        {...register('membershipRecognitionDate')}
                        isReadOnly
                      />
                    </InputGroup>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="#2C5282">
                      Last Recommitment Date
                    </Field.Label>
                    <InputGroup size="sm" endAddon="Date">
                      <Input
                        size="sm"
                        type="date"
                        borderRadius="5"
                        {...register('membershipRecommitmentDate')}
                        isReadOnly
                      />
                    </InputGroup>
                  </Field.Root>
                </Stack>
                <Field.Root>
                  <Stack direction="row">
                    <Text flex={1} fontWeight="500" mr="3%" color="#2C5282">
                      Baptised
                    </Text>
                    <Box flex={4}>
                      <Controller
                        control={control}
                        name={'isBaptised'}
                        render={({ field: { onChange, value, ref } }) => (
                          <Switch
                            size="lg"
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                            isReadOnly
                          />
                        )}
                      />
                      <Text ml="3" fontWeight="500" as="span">
                        Yes
                      </Text>
                    </Box>
                  </Stack>
                </Field.Root>
                <Stack
                  direction="row"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p="4%"
                  spacing="4%"
                >
                  <Field.Root>
                    <Field.Label color="#2C5282">Baptism Place</Field.Label>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('baptismPlace')}
                      isReadOnly
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label color="#2C5282">Baptism Date</Field.Label>
                    <InputGroup size="sm" endAddon="Date">
                      <Input
                        size="sm"
                        type="date"
                        borderRadius="5"
                        {...register('baptismDate')}
                        isReadOnly
                      />
                    </InputGroup>
                  </Field.Root>
                </Stack>
              </Stack>
              <Button
                size="sm"
                mt="5%"
                color="#0628A3"
                borderColor="#0628A3"
                borderRadius="10"
                variant="outline"
                type="submit"
              >
                Save Information
              </Button>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </form>
    </>
  );
};

export default UserProfileDesktop;
