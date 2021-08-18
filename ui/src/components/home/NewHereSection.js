import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import CustomButton from "../helpers/components/CustomButton";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import axios from "axios";

const newHereUrl =
  "https://hongkong.hmcc.net/wp-content/uploads/2020_Jun_WelcomeHomeSundayCelebration_Talk_Closeup-min-scaled.jpg";

const NewHereSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isBot, setIsBot] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (value) => {
    setIsBot(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isBot) {
      let payload = {
        name,
        email,
        notes,
      };
      const { data } = await axios.post("/api/forms/connect-with-us", {
        name: name,
        email: email,
        notes: notes,
      });
      setSubmitted(true);
      setTimeout(() => {
        resetForm();
      }, 2000);
      return;
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setNotes("");
    setIsBot(true);
    setSubmitted(false);
  };

  return (
    <>
      <Flex
        w="full"
        h={["100vh", "100vh", "100vh", "100vh", "62vh"]}
        bgImage={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${newHereUrl})`}
        bgSize="cover"
        bgPosition="center center"
        justify="center"
      >
        <Flex
          w="full"
          h="100%"
          justify="center"
          background='linear-gradient(90deg, rgba(6, 40, 163, 0.6) 0%, rgba(196, 241, 249, 0.6) 100%);"    '
          style={{ backdropFilter: "blur(7px)" }}
        >
          <Container maxW="container.lg" justifyContent="center" display="flex">
            <VStack color="white" justify="center" spacing={6}>
              <Heading fontSize={["1.3em", "3em"]}>
                New here? Connect with us
              </Heading>
              <form onSubmit={onSubmit}>
                <VStack spacing={[4, 8]} alignItems="center">
                  <FormControl id="name" isRequired w={["85%", "100%"]}>
                    <Input
                      variant="flushed"
                      type="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired w={["85%", "100%"]}>
                    <Input
                      variant="flushed"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="notes" w={["85%", "100%"]}>
                    <Input
                      type="notes"
                      placeholder="Notes and remarks (Optional)"
                      variant="flushed"
                      onChange={(e) => setNotes(e.target.value)}
                      _autofill={{
                        background: "rgba(0,0,0,0)",
                      }}
                    />
                  </FormControl>
                  <Box transform={["scale(0.77)", "scale(1)"]}>
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_CAPTCHA}
                      onChange={onChange}
                    />
                  </Box>
                  <CustomButton
                    bg="rgb(0, 0, 0, 0)"
                    variant="outline"
                    color="white"
                    _hover={{
                      bg: "white",
                      color: "#1A365D",
                      borderColor: "#1A365D",
                    }}
                    text="Connect with us >"
                    type="submit"
                  />
                  <FormLabel visibility={submitted ? "visible" : "hidden"}>
                    Thank you. We will be in touch soon!
                  </FormLabel>
                </VStack>
              </form>
            </VStack>
          </Container>
        </Flex>
      </Flex>
    </>
  );
};

export default NewHereSection;
