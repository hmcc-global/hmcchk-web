import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  Button,
  Stack,
  Center,
  Switch,
  InputRightAddon,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  VStack,
  ModalCloseButton,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';
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

const UserProfileMobile = (props) => {
  const { user, staticData } = props;
  const { lifegroupList, lifestageList, campusList } = staticData;

  const { register, control, handleSubmit, setValue, formState } = useForm();
  const { errors } = formState;
  const [userData, setUserData] = useState(null);
  const [formList, setFormList] = useState(null);
  const [unsignedFormList, setUnsignedFormList] = useState([]);
  const [signedUpFormList, setSignedUpFormList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = (e) => {
    setModalOpen(false);
  };

  const fetchUserData = async () => {
    if (user.id) {
      const { data, status } = await getUserDataRequest(user.id);

      if (status === 200) {
        setUserData(data[0]);
        setUserInformationFields(data[0]);
      }
    }
  };

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

  const fetchUnignedUpForms = useCallback(async () => {
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

  useEffect(() => {
    fetchUserData();
    fetchPublishedForms();
    fetchSignedUpForms();
    fetchUnignedUpForms();
  }, []);

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
    textAlign: 'center',
  };

  const tabTitle = {
    padding: '0.5px',
    fontWeight: '700',
    fontSize: 'inherit',
    color: '#0628A3',
    _selected: { borderColor: '#0628A3', color: '#000000' },
  };

  return (
    <>
      <Modal isOpen={modalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <ModalCloseButton />
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
          <ModalFooter />
        </ModalContent>
      </Modal>
      <Flex
        mt="10%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <Box fontWeight="800" fontSize="2rem">
          <Text>Welcome Back,&nbsp;</Text>
          {userData && userData.fullName && (
            <Text>{userData.fullName.split(' ')[0]}</Text>
          )}
        </Box>
        <Box
          width="full"
          fontSize="0.9rem"
          mt="5%"
          fontWeight="500"
          textAlign="center"
        >
          <Text color="#2C5282">Your Registered Email Address</Text>
          <Input
            width="100%"
            style={inputBox}
            readOnly
            {...register('email')}
          />
        </Box>
      </Flex>

      <form onSubmit={handleSubmit(handleEditUserInformation)}>
        <Tabs
          mt="7%"
          orientation="horizontal"
          variant="line"
          mb="12%"
          fontSize="0.9rem"
        >
          <TabList justifyContent="space-between">
            <Tab style={tabTitle}>Signup Links</Tab>
            <Tab style={tabTitle}>Personal Profile</Tab>
            <Tab style={tabTitle}>Church Profile</Tab>
          </TabList>

          <TabPanels>
            <TabPanel width="full" margin="20px 0px" p="0">
              <Flex direction="column">
                {formList && formList.length > 0 && (
                  <Box>
                    <Text
                      fontWeight="700"
                      fontSize="0.95rem"
                      color="#718096"
                      mb="2.5"
                    >
                      Available Signup Links:
                    </Text>
                    {generatePublishedFormLinks(unsignedFormList, false)}
                    <Text
                      fontWeight="700"
                      fontSize="0.95rem"
                      color="#718096"
                      mt="2.5"
                      mb="2.5"
                    >
                      Your Signups:
                    </Text>
                    {generatePublishedFormLinks(signedUpFormList, true)}
                  </Box>
                )}
                {/* <Button
                  size="sm"
                  mt="8"
                  color="#0628A3"
                  borderColor="#0628A3"
                  borderRadius="10"
                  variant="outline"
                >
                  Change Password
                </Button> */}
              </Flex>
            </TabPanel>
            <TabPanel p="7%">
              <Center mb="5%">
                <Button
                  size="md"
                  color="#0628A3"
                  borderColor="#0628A3"
                  borderRadius="10"
                  variant="outline"
                  type="submit"
                >
                  Save Information
                </Button>
              </Center>

              <Stack spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">
                    First Name (and Middle Name)
                  </FormLabel>
                  <Input
                    size="sm"
                    borderRadius="5"
                    {...register('firstName', { required: true })}
                    isInvalid={errors['firstName']}
                    placeholder="Please fill in this field"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Last Name</FormLabel>
                  <Input
                    size="sm"
                    borderRadius="5"
                    {...register('lastName', { required: true })}
                    isInvalid={errors['lastName']}
                    placeholder="Please fill in this field"
                  />
                  <FormHelperText>
                    Enter "N/A" if not applicable for you
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel color="#2C5282">Country of Origin</FormLabel>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register('countryOfOrigin', { required: true })}
                    isInvalid={errors['countryOfOrigin']}
                    placeholder="Please fill in this field"
                  >
                    {countryList.map((item) => {
                      return <option key={'co' + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Lifestage</FormLabel>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register('lifestage', { required: true })}
                    isInvalid={errors['lifestage']}
                    placeholder="Please fill in this field"
                  >
                    {lifestageList.map((item) => {
                      return <option key={'life' + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel color="#2C5282">Campus</FormLabel>
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
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Phone Number</FormLabel>
                  <Input
                    size="sm"
                    borderRadius="5"
                    {...register('phoneNumber', { required: true })}
                    isInvalid={errors['phoneNumber']}
                    placeholder="Please fill in this field"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="#2C5282">Birthday</FormLabel>
                  <Input
                    size="sm"
                    type="date"
                    borderRadius="5"
                    {...register('birthday')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="#2C5282">Address: Floor / Level</FormLabel>
                  <Input
                    size="sm"
                    borderRadius="5"
                    {...register('addressFloor')}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">
                    Address: Room / Flat / Unit / Suite
                  </FormLabel>
                  <Input
                    size="sm"
                    borderRadius="5"
                    {...register('addressFlat')}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Address: Street Address</FormLabel>
                  <Input
                    size="sm"
                    borderRadius="5"
                    {...register('addressStreet')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="#2C5282">Address: District</FormLabel>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register('addressDistrict')}
                  >
                    {districtList.map((item) => {
                      return <option key={'di' + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Address: Region</FormLabel>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register('addressRegion')}
                  >
                    {regionList.map((item) => {
                      return <option key={'re' + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
              </Stack>
            </TabPanel>
            <TabPanel p="7%">
              <Center mb="5%">
                <Button
                  size="md"
                  color="#0628A3"
                  borderColor="#0628A3"
                  borderRadius="10"
                  variant="outline"
                  type="submit"
                >
                  Save Information
                </Button>
              </Center>
              <Stack spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">LIFE Group</FormLabel>
                  <Select size="sm" borderRadius="5" {...register('lifeGroup')}>
                    {lifegroupList.map((item) => {
                      return <option key={'lg' + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Ministry Team</FormLabel>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register('ministryTeam')}
                  >
                    {ministryTeamList.map((item) => {
                      return <option key={'mt' + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <Stack direction="row">
                    <Text flex={1} fontWeight="500" mr="3%" color="#2C5282">
                      Church Member
                    </Text>
                    <Box flex={1}>
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
                  <FormHelperText>
                    An HMCC Covenant Signing Member is someone who has attended
                    HMCC’s Experiencing Membership Class and has decided to sign
                    (in-person) the Membership Declaration{' '}
                  </FormHelperText>
                </FormControl>
                <Stack
                  direction="column"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p="4%"
                  spacing="4%"
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Recognition Date</FormLabel>
                    <InputGroup size="sm">
                      <Input
                        size="sm"
                        type="date"
                        borderRadius="5"
                        {...register('membershipRecognitionDate')}
                        isReadOnly
                      />
                      <InputRightAddon borderRadius="5">Date</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">
                      Last Recommitment Date
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        size="sm"
                        type="date"
                        borderRadius="5"
                        {...register('membershipRecommitmentDate')}
                        isReadOnly
                      />
                      <InputRightAddon borderRadius="5">Date</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </Stack>
                <FormControl>
                  <Stack direction="row">
                    <Text flex={1} fontWeight="500" mr="3%" color="#2C5282">
                      Baptised
                    </Text>
                    <Box flex={1}>
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
                </FormControl>
                <Stack
                  direction="column"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p="4%"
                  spacing="4%"
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Place</FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register('baptismPlace')}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Date</FormLabel>
                    <InputGroup size="sm">
                      <Input
                        size="sm"
                        type="date"
                        borderRadius="5"
                        {...register('baptismDate')}
                        isReadOnly
                      />
                      <InputRightAddon borderRadius="5">Date</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </Stack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </form>
    </>
  );
};

export default UserProfileMobile;
