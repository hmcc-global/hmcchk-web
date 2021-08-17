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
  useToast,
  Switch,
  Checkbox,
} from "@chakra-ui/react";
import {
  accessTypes,
  campuses,
  lifestages,
  ministryTeams,
} from "../../helpers/UserConstants";

const EditUser = (props) => {
  const toast = useToast();

  const makeAccessTypes = function (x) {
    return <option>{x}</option>;
  };
  const makeCampuses = function (x) {
    return <option>{x}</option>;
  };
  const makeLifestages = function (x) {
    return <option>{x}</option>;
  };
  const makeMinistryTeams = function (x) {
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
      // data[0].isMember = data[0].isMember.toString();
      // data[0].isBaptised = data[0].isBaptised.toString();
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
      // <>
      //   <Modal isOpen={isOpen} onClose={onClose}>
      //     <ModalOverlay />
      //     <ModalContent>
      //       <ModalCloseButton />
      //       <ModalHeader>Success!</ModalHeader>
      //       <ModalBody> User information updated! </ModalBody>
      //     </ModalContent>
      //   </Modal>
      // </>
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
                    {accessTypes.map(makeAccessTypes)}
                  </Select>
                  <FormLabel>Country of Origin</FormLabel>
                  <Select
                    defaultValue={data.countryOfOrigin}
                    {...register("countryOfOrigin")}
                  >
                    <option>United Arab Emirates</option>
                    <option>Nigeria</option>
                    <option>Hong Kong</option>
                    <option>United States</option>
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
