import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Stack,
  Center,
  FormHelperText,
  Switch,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  ministryTeamList,
  lifegroupList,
  districtList,
  campusList,
  lifestageList,
} from "../helpers/lists";

const UserProfileDesktop = (props) => {
  const user = useSelector((state) => state.user);
  const { register, reset, control, handleSubmit, setValue, formState } =
    useForm();
  const [userData, setUserData] = useState(null);

  const settableDataFields = [
    "email",
    "nationality",
    "countryOfOrigin",
    "birthday",
    "campus",
    "lifestage",
    "isMember",
    "isBaptised",
    "ministryTeam",
    "phoneNumber",
    "fullName",
    "address",
  ];

  const fetchUserData = async () => {
    if (user.id) {
      const { data, status } = await axios.get("/api/users/get", {
        userId: user.id,
      });

      if (status === 200) {
        setUserData(data[0]);
      }
      setUserInformationFields(data[0]);
    }
  };

  const handleEditUserInformation = async (data, e) => {
    data.address =
      data["addressFloor"] +
      " " +
      data["addressFlat"] +
      " " +
      data["addressStreet"] +
      " " +
      data["addressDistrict"];
    delete data["addressFloor"];
    delete data["addressFlat"];
    delete data["addressStreet"];
    delete data["addressDistrict"];
    delete data["email"];

    data.fullName = data.firstName + " " + data.lastName;

    for (let key in data) {
      if (!settableDataFields.includes(key)) {
        delete data[key];
      }
    }

    console.log(data);

    data.id = user.id;

    const { res, status } = await axios.put("/api/users/update", {
      params: data,
    });
    if (status === 200) {
      fetchUserData();
    }
  };

  const setUserInformationFields = (userData) => {
    for (let key in userData) {
      if (settableDataFields.includes(key)) {
        switch (key) {
          case "fullName":
            let nameParts = userData.fullName.split(" ");
            let lastName = nameParts.pop(-1);
            let firstName = nameParts.join(" ");
            setValue("firstName", firstName);
            setValue("lastName", lastName);
          default:
            setValue(key, userData[key]);
            break;
        }
      }
    }
  };

  useEffect(async () => {
    await fetchUserData();
  }, []);

  return (
    <>
      <Center mt="7%" fontWeight="900" fontSize="64">
        <Text color="#065666" as="span">
          Hi
        </Text>{" "}
        {userData && userData.fullName && (
          <>
            ,&nbsp;<u>{userData.fullName.split(" ")[0]}!</u>
          </>
        )}
      </Center>
      <form onSubmit={handleSubmit(handleEditUserInformation)}>
        <Tabs mt="7%" mb="7%" orientation="vertical" variant="unstyled">
          <Box flex={1}>
            <TabList border="none" alignItems="flex-end">
              <Tab
                w="fit-content"
                pr="1"
                pl="1"
                color="#0628A3"
                _selected={{
                  md: {
                    borderBottom: "2px solid #0628A3",
                    marginBottom: "-2px",
                  },
                }}
              >
                Account Information
              </Tab>
              <Tab
                w="fit-content"
                pr="1"
                pl="1"
                color="#0628A3"
                mt="5"
                _selected={{
                  borderBottom: "2px solid #0628A3",
                  marginBottom: "-2px",
                }}
              >
                Personal Profile
              </Tab>
              <Tab
                w="fit-content"
                pr="1"
                pl="1"
                color="#0628A3"
                mt="5"
                _selected={{
                  borderBottom: "2px solid #0628A3",
                  marginBottom: "-2px",
                }}
              >
                Church Profile
              </Tab>
            </TabList>
          </Box>
          <TabPanels
            flex={4}
            bgColor="#ffffff"
            ml="5"
            border="1px solid #E2E8F0"
            borderRadius="4px"
          >
            <TabPanel p="7%">
              <FormControl>
                <FormLabel color="#2C5282">
                  Your Registered Email Address
                </FormLabel>
                <Input
                  size="sm"
                  borderRadius="5"
                  readOnly
                  {...register("email")}
                />
              </FormControl>
              <Button
                size="sm"
                mt="8"
                color="#0628A3"
                borderColor="#0628A3"
                borderRadius="10"
                variant="outline"
                type="submit"
              >
                Change Password
              </Button>
            </TabPanel>
            <TabPanel p="7%">
              <Stack spacing="2%">
                <Stack direction={["column", "row"]} spacing="7%">
                  <FormControl>
                    <FormLabel color="#2C5282">
                      First Name (and Middle Name)
                    </FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register("firstName", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Last Name</FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register("lastName", { required: true })}
                    />
                    <FormHelperText>
                      Enter "N/A" if not applicable for you
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Stack direction={["column", "row"]} spacing="7%">
                  <FormControl>
                    <FormLabel color="#2C5282">Country of Origin</FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register("nationality", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Lifestage</FormLabel>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register("lifestage", { required: true })}
                      pointerEvents="none"
                    >
                      {lifestageList.map((item) => {
                        return <option key={"life" + item}>{item}</option>;
                      })}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction={["column", "row"]} spacing="7%">
                  <FormControl>
                    <FormLabel color="#2C5282">
                      Address: Floor / Level
                    </FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register("addressFloor")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Campus</FormLabel>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register("campus")}
                      isReadOnly
                      pointerEvents="none"
                    >
                      {campusList.map((item) => {
                        return <option key={"ca" + item}>{item}</option>;
                      })}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction={["column", "row"]} spacing="7%">
                  <FormControl>
                    <FormLabel color="#2C5282">
                      Address: Room / Flat / Unit / Suite
                    </FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register("addressFlat")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Phone Number</FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register("phoneNumber", { required: true })}
                      isReadOnly
                    />
                  </FormControl>
                </Stack>
                <Stack direction={["column", "row"]} spacing="7%">
                  <FormControl>
                    <FormLabel color="#2C5282">
                      Address: Street Address
                    </FormLabel>
                    <Input
                      size="sm"
                      borderRadius="5"
                      {...register("addressStreet")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Birthday</FormLabel>
                    <Input
                      size="sm"
                      type="date"
                      borderRadius="5"
                      {...register("birthday")}
                    />
                  </FormControl>
                </Stack>
                <Stack direction={["column", "row"]} spacing="7%">
                  <FormControl>
                    <FormLabel color="#2C5282">Address: District</FormLabel>
                    <Select
                      size="sm"
                      borderRadius="5"
                      {...register("addressDistrict")}
                    >
                      {districtList.map((item) => {
                        return <option key={"di" + item}>{item}</option>;
                      })}
                    </Select>
                  </FormControl>
                  <FormControl opacity="0">
                    <Input
                      size="sm"
                      borderRadius="5"
                      cursor="default"
                      isReadOnly
                    />
                  </FormControl>
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
                Edit Information
              </Button>
            </TabPanel>
            <TabPanel p="7%">
              <Stack spacing="3%">
                <FormControl>
                  <FormLabel color="#2C5282">Life Group</FormLabel>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register("lifeGroup")}
                    pointerEvents="none"
                  >
                    {lifegroupList.map((item) => {
                      return <option key={"lg" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Ministry Team</FormLabel>
                  <Select
                    size="sm"
                    borderRadius="5"
                    isReadOnly
                    pointerEvents="none"
                    {...register("ministryTeam")}
                  >
                    {ministryTeamList.map((item) => {
                      return <option key={"mt" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>

                <FormControl>
                  <Stack direction="row">
                    <Text flex={1} fontWeight="500" mr="3%" color="#2C5282">
                      Church Member
                    </Text>
                    <Box flex={4}>
                      <Controller
                        control={control}
                        name={"isMember"}
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
                    (in-person) the Membership Declaration{" "}
                  </FormHelperText>
                </FormControl>
                <Stack
                  direction="row"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p="4%"
                  spacing="4%"
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Recognition Date</FormLabel>
                    <InputGroup size="sm">
                      <Input type="date" borderRadius="5" isReadOnly />
                      <InputRightAddon borderRadius="5">Date</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">
                      Last Recommitment Date
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input type="date" borderRadius="5" isReadOnly />
                      <InputRightAddon borderRadius="5">Date</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </Stack>
                <FormControl>
                  <Stack direction="row">
                    <Text flex={1} fontWeight="500" mr="3%" color="#2C5282">
                      Baptised
                    </Text>
                    <Box flex={4}>
                      <Controller
                        control={control}
                        name={"isBaptised"}
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
                  direction="row"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p="4%"
                  spacing="4%"
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Place</FormLabel>
                    <Input size="sm" borderRadius="5" isReadOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Date</FormLabel>
                    <InputGroup size="sm">
                      <Input type="date" borderRadius="5" isReadOnly />
                      <InputRightAddon borderRadius="5">Date</InputRightAddon>
                    </InputGroup>
                  </FormControl>
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
                Edit Information
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </form>
    </>
  );
};

export default UserProfileDesktop;
