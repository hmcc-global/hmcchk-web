import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
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
} from "@chakra-ui/react";

const EditUser = (props) => {
  const accessTypes = ["Unsigned", "Signed", "Alumni", "Admin", "Stewardship"];
  const makeAccessTypes = function (x) {
    return <option>{x}</option>;
  };
  const campuses = [
    "CUHK",
    "HKUST",
    "HKU",
    "PolyU",
    "CityU",
    "BU",
    "EduU",
    "Lingnan",
  ];
  const makeCampuses = function (x) {
    return <option>{x}</option>;
  };
  const lifestages = ["Student", "Single Adult", "Married"];
  const makeLifestages = function (x) {
    return <option>{x}</option>;
  };
  const ministryTeams = [
    "Intercessory Prayer Team",
    "Creatives",
    "Hospitality",
    "Band",
    "Audio/Visual",
    "Creatives Worship",
    "Multimedia",
    "Building Blocks",
  ];
  const makeMinistryTeams = function (x) {
    return <option>{x}</option>;
  };

  const { handleSubmit, register } = useForm();

  const [user, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);

  const getData = async () => {
    try {
      const id = props;
      const { data } = await axios.get("/api/users/get", { userId: id });
      setUsers(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const data = user;

  const onUpdateSubmit = async (data, e) => {
    // Format the data
    setEditData(data);

    data.accessType = data.accessType.toLowerCase();

    const status = await axios.put("/api/users/update", {
      params: data,
    });

    console.log(status);
    console.log(status.status);

    if (status.status === 200) {
      return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Success!</ModalHeader>
              <ModalBody> User information updated! </ModalBody>
            </ModalContent>
          </Modal>
        </>
      );
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
                  ></VisuallyHiddenInput>
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
                    {accessTypes.map(makeAccessTypes)}
                  </Select>
                  <FormLabel>Country of origin</FormLabel>
                  <Select
                    defaultValue={data.nationality}
                    {...register("nationality")}
                  >
                    <option>United Arab Emirates</option>
                    <option>Nigeria</option>
                    <option>Hong Kong</option>
                  </Select>
                  <FormLabel>Campus</FormLabel>
                  <Select
                    placeholder="Select Campus"
                    defaultValue={data.campus}
                    {...register("campus")}
                  >
                    {campuses.map(makeCampuses)}
                  </Select>
                  <FormLabel>Life stage</FormLabel>
                  <Select
                    defaultValue={data.lifestage}
                    {...register("lifestage")}
                  >
                    {lifestages.map(makeLifestages)}
                  </Select>
                  <FormLabel>LIFE Group</FormLabel>
                  <Select
                    placeholder="Select LIFE Group"
                    defaultValue={data.lifeGroup}
                    {...register("lifeGroup")}
                  >
                    <option>DRIPPIN'</option>
                    <option>Yeet Hay</option>
                    <option>Glow Up</option>
                  </Select>
                  <FormLabel>Ministry Team</FormLabel>
                  <Select
                    defaultValue={data.ministryTeam}
                    placeholder="Select Ministry Teams"
                    {...register("ministryTeam")}
                  >
                    {ministryTeams.map(makeMinistryTeams)}
                  </Select>
                  <FormLabel>Address</FormLabel>
                  <Input defaultValue={data.address} {...register("address")} />
                  <FormLabel>Phone number</FormLabel>
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
                  <FormLabel>Member</FormLabel>
                  <RadioGroup
                    defaultValue={data.isMember}
                    {...register("isMember")}
                  >
                    <Stack spacing={2} direction="row">
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormLabel>Baptised</FormLabel>
                  <RadioGroup
                    defaultValue={data.isBaptised}
                    {...register("isBaptised")}
                  >
                    <Stack spacing={2} direction="row">
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </Stack>
                  </RadioGroup>
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
