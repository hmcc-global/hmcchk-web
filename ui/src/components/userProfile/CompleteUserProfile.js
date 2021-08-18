import {
  Center,
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Button,
  Switch,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  campusList,
  countryList,
  districtList,
  lifegroupList,
  lifestageList,
  ministryTeamList,
} from "../helpers/lists";

const CompleteUserProfileContainer = (props) => {
  const formLabelColor = "#2C5282";

  return (
    <Container maxW="container.lg">
      <Center mt="3%" mb="3%" fontWeight="900" fontSize="48">
        Completing your HMCC Profile
      </Center>
      <Tabs
        border="1px solid #E2E8F0"
        borderRadius="4px"
        p="4%"
        variant="unstyled"
        mb="5%"
      >
        <TabList border="none">
          <Tab
            flex={1}
            fontSize="sm"
            fontWeight="500"
            borderTop="5px solid #E2E8F0"
            mr={["2%", "4%"]}
            pl="0"
            alignItems="flex-start"
            flexDirection="column"
            _selected={{ borderColor: "#0628A3" }}
          >
            <Text mt="2" color="#0628A3">
              STEP 1
            </Text>
            <Text fontSize={["xs", "sm"]} color="#2D3748">
              Personal Profile
            </Text>
          </Tab>
          <Tab
            flex={1}
            fontSize="sm"
            fontWeight="500"
            borderTop="5px solid #E2E8F0"
            mr={["2%", "4%"]}
            pl="0"
            alignItems="flex-start"
            flexDirection="column"
            _selected={{ borderColor: "#0628A3" }}
          >
            <Text mt="2" color="#0628A3">
              STEP 2
            </Text>
            <Text fontSize={["xs", "sm"]} color="#2D3748">
              Church Profile
            </Text>
          </Tab>
          <Tab
            flex={1}
            fontSize="sm"
            fontWeight="500"
            borderTop="5px solid #E2E8F0"
            mr={["2%", "4%"]}
            pl="0"
            alignItems="flex-start"
            flexDirection="column"
            _selected={{ borderColor: "#0628A3" }}
          >
            <Text mt="2" color="#0628A3">
              STEP 3
            </Text>
            <Text fontSize={["xs", "sm"]} color="#2D3748">
              Review
            </Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing="2%">
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    First Name (and Middle Name)
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>Last Name</FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>Birthday</FormLabel>
                  <Input type="date" size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Country of Origin
                  </FormLabel>
                  <Select size="sm" borderRadius="5">
                    {countryList.map((item) => {
                      return <option key={"co" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>Lifestage</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {lifestageList.map((item) => {
                      return <option key={"life" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>Campus</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {campusList.map((item) => {
                      return <option key={"ca" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={1}>
                  <FormLabel color={formLabelColor}>Phone Number</FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: Floor / Level
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: Room / Flat / Unit / Suite
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: Street Address
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: District
                  </FormLabel>
                  <Select size="sm" borderRadius="5">
                    {districtList.map((item) => {
                      return <option key={"di" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Center>
                <Button
                  size="sm"
                  mt="5%"
                  color="#0628A3"
                  borderColor="#0628A3"
                  borderRadius="10"
                  variant="outline"
                  minW="175"
                >
                  Next
                </Button>
              </Center>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={["4%", "2%"]}>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={2}>
                  <FormLabel color={formLabelColor}>Life Group</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {lifegroupList.map((item) => {
                      return <option key={"li" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <Box flex={1} display={["none", "block"]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={2}>
                  <FormLabel color={formLabelColor}>Ministry Team</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {ministryTeamList.map((item) => {
                      return <option key={"mt" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <Box flex={1} display={["none", "block"]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={[1, 4]}>
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
                      <Switch />
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
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <Stack
                  direction={["column", "row"]}
                  spacing="4%"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p={["5%", "3%"]}
                  pt={["5%", "2%"]}
                  flex={[1, 4]}
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Recognition Date</FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">
                      Last Recommitment Date
                    </FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                  </FormControl>
                </Stack>
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={[1, 4]}>
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
                      <Switch />
                      <Text ml="3" fontWeight="500" as="span">
                        Yes
                      </Text>
                    </Box>
                  </Stack>
                </FormControl>
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <Stack
                  direction={["column", "row"]}
                  spacing="4%"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p={["5%", "3%"]}
                  pt={["5%", "2%"]}
                  flex={[1, 4]}
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Place</FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                    <FormHelperText>
                      ‘HMCC Hong Kong’ if you are baptised with us, otherwise
                      state where you were baptised or the name of your previous
                      home church.
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Date</FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                    <FormHelperText>
                      To the best of your memory :)
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Flex>
                <Button
                  size="sm"
                  mt="1"
                  color="#0628A3"
                  borderColor="#0628A3"
                  borderRadius="10"
                  variant="outline"
                  minW={["50%", "20%"]}
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
                  minW={["50%", "20%"]}
                >
                  Review
                </Button>
              </Flex>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing="2%">
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    First Name (and Middle Name)
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>Last Name</FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>Birthday</FormLabel>
                  <Input type="date" size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Country of Origin
                  </FormLabel>
                  <Select size="sm" borderRadius="5">
                    {countryList.map((item) => {
                      return <option key={"co" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>Lifestage</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {lifestageList.map((item) => {
                      return <option key={"life" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>Campus</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {campusList.map((item) => {
                      return <option key={"ca" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={1}>
                  <FormLabel color={formLabelColor}>Phone Number</FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <Box flex={1}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: Floor / Level
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: Room / Flat / Unit / Suite
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: Street Address
                  </FormLabel>
                  <Input size="sm" borderRadius="5" />
                </FormControl>
                <FormControl>
                  <FormLabel color={formLabelColor}>
                    Address: District
                  </FormLabel>
                  <Select size="sm" borderRadius="5">
                    {districtList.map((item) => {
                      return <option key={"di" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={2}>
                  <FormLabel color={formLabelColor}>Life Group</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {lifegroupList.map((item) => {
                      return <option key={"li" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <Box flex={1}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={[1, 2]}>
                  <FormLabel color={formLabelColor}>Ministry Team</FormLabel>
                  <Select size="sm" borderRadius="5">
                    {ministryTeamList.map((item) => {
                      return <option key={"mt" + item}>{item}</option>;
                    })}
                  </Select>
                </FormControl>
                <Box flex={1}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={[1, 4]}>
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
                      <Switch />
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
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <Stack
                  direction={["column", "row"]}
                  spacing="4%"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p={["5%", "3%"]}
                  pt={["5%", "2%"]}
                  flex={[1, 4]}
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Recognition Date</FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">
                      Last Recommitment Date
                    </FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                  </FormControl>
                </Stack>
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <FormControl flex={[1, 4]}>
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
                      <Switch />
                      <Text ml="3" fontWeight="500" as="span">
                        Yes
                      </Text>
                    </Box>
                  </Stack>
                </FormControl>
                <Box flex={[0, 1]}></Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing="4%">
                <Stack
                  direction={["column", "row"]}
                  spacing="4%"
                  border="1px solid #E2E8F0"
                  borderRadius="6"
                  p={["5%", "3%"]}
                  pt={["5%", "2%"]}
                >
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Place</FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                    <FormHelperText>
                      ‘HMCC Hong Kong’ if you are baptised with us, otherwise
                      state where you were baptised or the name of your previous
                      home church.
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel color="#2C5282">Baptism Date</FormLabel>
                    <Input size="sm" type="date" borderRadius="5" />
                    <FormHelperText>
                      To the best of your memory :)
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Box flex={1}></Box>
              </Stack>
              <Flex>
                <Button
                  size="sm"
                  mt="1"
                  color="#0628A3"
                  borderColor="#0628A3"
                  borderRadius="10"
                  variant="outline"
                  minW={["50%", "20%"]}
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
                  minW={["50%", "20%"]}
                >
                  Save Profile
                </Button>
              </Flex>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default CompleteUserProfileContainer;
