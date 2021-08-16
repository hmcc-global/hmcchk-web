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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfileMobile = (props) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Center mt="7%" fontWeight="900" fontSize="36">
        <Text color="#065666" as="span">
          Hi
        </Text>{" "}
        {user.fullName && (
          <>
            ,&nbsp;<u>{user.fullName.split(" ")[0]}!</u>
          </>
        )}
      </Center>
      <Tabs mt="7%" orientation="horizontal" variant="line">
        <TabList justifyContent="space-between">
          <Tab
            p="0.5"
            fontSize="12"
            fontWeight="500"
            _selected={{ borderColor: "#0628A3", color: "#0628A3" }}
          >
            Account Information
          </Tab>
          <Tab
            p="0.5"
            fontSize="12"
            fontWeight="500"
            _selected={{ borderColor: "#0628A3", color: "#0628A3" }}
          >
            Personal Profile
          </Tab>
          <Tab
            p="0.5"
            fontSize="12"
            fontWeight="500"
            _selected={{ borderColor: "#0628A3", color: "#0628A3" }}
          >
            Church Profile
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="7%">
            <Center mt="15%">
              <FormControl>
                <FormLabel color="#2C5282">
                  Your Registered Email Address
                </FormLabel>
                <Input size="sm" borderRadius="5" />
              </FormControl>
            </Center>
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
          </TabPanel>
          <TabPanel p="7%">
            <Center mb="5%">
              <Button
                size="md"
                color="#0628A3"
                borderColor="#0628A3"
                borderRadius="10"
                variant="outline"
              >
                Edit Information
              </Button>
            </Center>

            <Stack spacing="7%">
              <Stack direction={["column", "row"]} spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">
                    First Name (and Middle Name)
                  </FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Last Name</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                  <FormHelperText>
                    Enter "N/A" if not applicable for you
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">Country of Origin</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Lifestage</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">Address: Floor / Level</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Campus</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">
                    Address: Room / Flat / Unit / Suite
                  </FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Phone Number</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">Address: Street Address</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel color="#2C5282">Birthday</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="7%">
                <FormControl>
                  <FormLabel color="#2C5282">Address: District</FormLabel>
                  <Input size="sm" borderRadius="5" isReadOnly />
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
          </TabPanel>
          <TabPanel p="7%">
            <Center mb="7%">
              <Button
                size="md"
                color="#0628A3"
                borderColor="#0628A3"
                borderRadius="10"
                variant="outline"
              >
                Edit Information
              </Button>
            </Center>
            <Stack spacing="7%">
              <FormControl>
                <FormLabel color="#2C5282">Life Group</FormLabel>
                <Input size="sm" borderRadius="5" isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel color="#2C5282">Ministry Team</FormLabel>
                <Input size="sm" borderRadius="5" isReadOnly />
              </FormControl>
              <FormControl>
                <Stack direction="row">
                  <Text flex={1} fontWeight="500" mr="3%" color="#2C5282">
                    Church Member
                  </Text>
                  <Box flex={1}>
                    <Switch size="lg" isReadOnly />
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
                direction="column"
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
                  <FormLabel color="#2C5282">Last Recommitment Date</FormLabel>
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
                  <Box flex={1}>
                    <Switch size="lg" isReadOnly />
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default UserProfileMobile;
