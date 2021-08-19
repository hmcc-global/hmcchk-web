import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import Country from "./country.json";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Box,
  Select,
  Center,
  UnorderedList,
  ListItem,
  Card,
  Paper,
  VStack,
  Flex,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";

const Signup = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => {
    console.log(data);
  };

  const onChangeReCAPTCHA = (value) => {
    console.log("Captcha value:", value);
  };

  const inputBox = {
    color: "black",
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    boxSizing: "border-box",
    borderRadius: "6px",
    flex: "none",
    alignSelf: "stretch",
    flexGrow: "0",
    margin: "8px 0px",
    padding: "3px 10px",
  };

  const submitBoxStyle = {
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 19px",
    background: "rgba(0, 0, 0, 0.04)",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    backdropFilter: "blur(6px)",
    borderRadius: "10px",
    width: "250px",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "20px",
  };

  const SelectCountry = React.forwardRef(({ onChange, name, label }, ref) => (
    <>
      <Text>{label}</Text>
      <select style={inputBox} name={name} ref={ref} onChange={onChange}>
        <option
          style={{ color: "color: rgba(0, 0, 0, 0.36)" }}
          value=""
          selected
          disabled
        >
          Select Country
        </option>
        {Country.map((result) => {
          return result.country.map((result) => {
            return <option value={result}>{result}</option>;
          });
        })}
      </select>
    </>
  ));

  const SelectLifestage = React.forwardRef(({ onChange, name, label }, ref) => (
    <>
      <Text>{label}</Text>
      <select style={inputBox} name={name} ref={ref} onChange={onChange}>
        <option
          style={{ color: "color: rgba(0, 0, 0, 0.36)" }}
          value=""
          selected
          disabled
        >
          Select Lifestage
        </option>
        {Country.map((result) => {
          return result.country.map((result) => {
            return <option value={result}>{result}</option>;
          });
        })}
      </select>
    </>
  ));

  const password = useRef({});
  password.current = watch("password", "");

  const { history } = props;

  const handleSignup = async (data) => {
    await axios
      .post("/api/auth/signup", {
        password: data.password,
        emailAddress: data.email,
        fullName: data.firstName + " " + data.lastName,
        countryOfOrigin: data.countryOfOrigin,
        lifestage: data.lifestage,
        phoneNumber: data.phoneNumber,
      })
      .then((response) => {
        history.push("/login");
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      <Stack
        background="#2C5282"
        color="white"
        padding="20px"
        fontFamily="inter"
      >
        <Flex>
          <Box>
            <Link href="/login">
              <ChevronLeftIcon boxSize={10} />
              Return to Log In
            </Link>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <form onSubmit={handleSubmit(handleSignup)} autoComplete="off">
            <VStack justify="center" align="center">
              <Image
                marginTop={{ base: "30px", md: "none" }}
                marginBottom={{ base: "15px", md: "40px" }}
                h={{
                  base: "6vh",
                  sm: "8vh",
                  md: "10vh",
                  lg: "12vh",
                  xl: "15vh",
                }}
                src={`${process.env.PUBLIC_URL}/images/ripple.png`}
                alt="Logo of HMCC"
              />
              <Text
                fontWeight="bold"
                fontSize="2xl"
                display={{ base: "flex", md: "none" }}
              >
                Sign Up
              </Text>
              <HStack spacing={{ base: "none", md: "8" }}>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                  display={{ base: "none", md: "flex" }}
                >
                  Sign Up
                </Text>
                <Image
                  h="85vh"
                  src={`${process.env.PUBLIC_URL}/images/HLine.svg`}
                  alt="Horizontal Line"
                />
                <VStack
                  alignItems="flex-start"
                  marginLeft={{ base: "20px", md: "none" }}
                >
                  <Text>Enter Your Email Address</Text>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. chantaiman@gmail.com"
                    style={inputBox}
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value:
                          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.email.message}
                    </Text>
                  )}
                  <Text>Enter Your Account Password</Text>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={inputBox}
                    {...register("password", {
                      required: "Required",
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        message: "Your Password does not fulfill the criteria", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />
                  {errors.password && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.password.message}
                    </Text>
                  )}
                  <Center>
                    <Box maxW="300">
                      <Text
                        color="#FED7D7"
                        w="50vw"
                        fontSize={[12, 12, 12, 14]}
                      >
                        Your new password should consist of:
                      </Text>
                      <UnorderedList
                        w="300"
                        color="#FED7D7"
                        fontSize={[12, 12, 12, 14]}
                      >
                        <ListItem>At least 8 characters in length</ListItem>
                        <ListItem>
                          Mixture of both uppercase and lowercase characters
                        </ListItem>
                        <ListItem>Contains at least one number</ListItem>
                        <ListItem>
                          Contains at least one special character
                        </ListItem>
                      </UnorderedList>
                    </Box>
                  </Center>
                  <Text>Re-enter Your Account Password</Text>
                  <input
                    id="rePassword"
                    type="password"
                    name="rePassword"
                    placeholder="Re-enter Password"
                    style={inputBox}
                    {...register("rePassword", {
                      required: "Required",
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                  />
                  {errors.rePassword && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.rePassword.message}
                    </Text>
                  )}
                  <Text>First Name (and Middle Name)</Text>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    style={inputBox}
                    {...register("firstName", { required: "Required" })}
                  />
                  {errors.firstName && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.firstName.message}
                    </Text>
                  )}
                  <Text>Last Name</Text>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    style={inputBox}
                    {...register("lastName", { required: "Required" })}
                  />
                  {errors.lastName && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.lastName.message}
                    </Text>
                  )}
                  <Text>Phone Number</Text>
                  <input
                    id="phoneNumber"
                    type="number"
                    name="password"
                    placeholder="Phone Number"
                    style={inputBox}
                    {...register("phoneNumber", {
                      required: "Required",
                      maxLength: {
                        value: 16,
                        message: "Phone number too long",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                  <Text>Country </Text>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register("countryOfOrigin")}
                    isInvalid={errors["countryOfOrigin"]}
                    placeholder="Please fill in this field"
                  >
                    {Country.map((result) => {
                      return result.country.map((result) => {
                        return <option value={result}>{result}</option>;
                      });
                    })}
                  </Select>

                  {errors.country && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.country.message}
                    </Text>
                  )}
                  <Text>Lifestage </Text>
                  <Select
                    size="sm"
                    borderRadius="5"
                    {...register("lifestage")}
                    isInvalid={errors["lifestage"]}
                    placeholder="Please fill in this field"
                  >
                    {Country.map((result) => {
                      return result.country.map((result) => {
                        return <option value={result}>{result}</option>;
                      });
                    })}
                  </Select>
                  {errors.lifestage && (
                    <Text
                      color="#FED7D7"
                      fontWeight="bold"
                      fontSize={[12, 12, 12, 14]}
                    >
                      {errors.lifestage.message}
                    </Text>
                  )}
                </VStack>
              </HStack>
              <ReCAPTCHA
                style={{ left: "5%", position: "relative", marginTop: "20px" }}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChangeReCAPTCHA}
              />
              <input
                type="submit"
                name="Login"
                value="Register"
                style={submitBoxStyle}
              />
            </VStack>
          </form>
        </Flex>
      </Stack>
    </>
  );
};

export default Signup;
