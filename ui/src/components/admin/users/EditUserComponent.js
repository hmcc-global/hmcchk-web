import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customAxios as axios } from "../../helpers/customAxios";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  HStack,
  VStack,
  Input,
  Form,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Select,
  Radio,
  RadioGroup,
  VisuallyHiddenInput,
  useToast,
  Switch,
  Checkbox,
} from "@chakra-ui/react";
import {
  accessTypeList,
  lifestageList,
  ministryTeamList,
  lifegroupList,
  districtList,
  regionList,
  campusList,
  countryList,
} from "../../helpers/UserConstants";

const EditUser = (props) => {
  const toast = useToast();

  const arrayToOptions = function (x) {
    return <option>{x}</option>;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [user, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState();

  const getData = async () => {
    try {
      const id = props;
      const { data } = await axios.get("/api/users/get", { userId: id });
      data[0].addressFlat = data[0].address.flat;
      data[0].addressFloor = data[0].address.floor;
      data[0].addressStreet = data[0].address.street;
      data[0].addressDistrict = data[0].address.district;
      data[0].addressRegion = data[0].address.region;
      console.log(data[0]);
      setUsers(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshHandler = () => {
    getData();
  };

  let data = user;

  const onUpdateSubmit = async (data, e) => {
    // Format the data
    setEditData(data);

    let address = {
      flat: data.addressFlat,
      floor: data.addressFloor,
      street: data.addressStreet,
      district: data.addressDistrict,
      region: data.addressRegion,
    };

    data.address = address;

    delete data["addressFlat"];
    delete data["addressFloor"];
    delete data["addressStreet"];
    delete data["addressDistrict"];
    delete data["addressRegion"];

    data.accessType = data.accessType.toLowerCase();

    const status = await axios.put("/api/users/update", {
      params: data,
    });

    console.log(status);
    console.log(status.status);

    if (status.status === 200) {
      toast({
        title: "Success!",
        description: "User information updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    return status;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <form onSubmit={handleSubmit(onUpdateSubmit)}>
          <ModalContent>
            <ModalHeader>Edit User Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <Stack>
                  <VisuallyHiddenInput
                    defaultValue={data.id}
                    {...register("id")}
                  />
                  <FormLabel>Full name</FormLabel>
                  <Input
                    defaultValue={data.fullName}
                    {...register("fullName")}
                  />
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    defaultValue={data.email}
                    {...register("email")}
                  />
                  <FormLabel>Access type</FormLabel>
                  <Select
                    defaultValue={data.accessType}
                    {...register("accessType")}
                  >
                    {accessTypeList.map(arrayToOptions)}
                  </Select>
                  <FormLabel>Country of Origin</FormLabel>
                  <Select
                    defaultValue={data.countryOfOrigin}
                    {...register("countryOfOrigin")}
                  >
                    {countryList.map(arrayToOptions)}
                  </Select>
                  <FormLabel>Campus</FormLabel>
                  <Select
                    placeholder="Select Campus"
                    defaultValue={data.campus}
                    {...register("campus")}
                  >
                    {campusList.map(arrayToOptions)}
                  </Select>
                  <FormLabel>Life stage</FormLabel>
                  <Select
                    defaultValue={data.lifestage}
                    {...register("lifestage")}
                  >
                    {lifestageList.map(arrayToOptions)}
                  </Select>
                  <FormLabel>LIFE Group</FormLabel>
                  <Select
                    placeholder="Select LIFE Group"
                    defaultValue={data.lifeGroup}
                    {...register("lifeGroup")}
                  >
                    {lifegroupList.map(arrayToOptions)}
                  </Select>
                  <FormLabel>Ministry Team</FormLabel>
                  <Select
                    defaultValue={data.ministryTeam}
                    placeholder="Select Ministry Teams"
                    {...register("ministryTeam")}
                  >
                    {ministryTeamList.map(arrayToOptions)}
                  </Select>
                  <FormLabel>Address</FormLabel>
                  <HStack>
                    <Input
                      defaultValue={data.addressFlat}
                      placeholder="Room/Flat/Unit/Suite"
                      {...register("addressFlat")}
                    />
                    <Input
                      defaultValue={data.addressFloor}
                      placeholder="Floor/Level"
                      {...register("addressFloor")}
                    />
                  </HStack>
                  <HStack>
                    <Input
                      defaultValue={data.addressStreet}
                      placeholder="Street Address"
                      {...register("addressStreet")}
                    />
                    <Select
                      defaultValue={data.addressDistrict}
                      placeholder="District"
                      {...register("addressDistrict")}
                    >
                      {districtList.map(arrayToOptions)}
                    </Select>
                  </HStack>
                  <Select
                    defaultValue={data.addressRegion}
                    placeholder="Region"
                    {...register("addressRegion")}
                  >
                    {regionList.map(arrayToOptions)}
                  </Select>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="+852" />
                    <Input
                      type="tel"
                      defaultValue={data.phoneNumber}
                      placeholder="phone number"
                      {...register("phoneNumber")}
                    />
                  </InputGroup>
                  <FormLabel>Birthday</FormLabel>
                  <Input
                    type="date"
                    defaultValue={data.birthday}
                    {...register("birthday")}
                  ></Input>
                  <Stack direction="row">
                    <FormLabel>Member</FormLabel>
                    <Switch
                      defaultValue={data.isMember}
                      {...register("isMember")}
                    />
                    <FormLabel>Baptised</FormLabel>
                    <Switch
                      defaultValue={data.isBaptised}
                      {...register("isBaptised")}
                    />
                  </Stack>
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" type="submit">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditUser;
