import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, VStack, Flex, Image, Text, Stack, Link } from "@chakra-ui/react";

const PasswordSubmitted = (props) => {
  return (
    <>
      <Stack background="#2C5282" color="white" h="100vh">
        <Flex w="100vw">
          <Box>
            <Link
              to={{ pathname: "https://hongkong.hmcc.net" }}
              target="_blank"
            >
              <ChevronLeftIcon boxSize={10} />
              Return to hongkong.hmcc.net
            </Link>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <VStack justify="center" align="center" spacing={["3vh"]} py="5vh">
            <Image
              marginBottom="15px"
              h={{ base: "6vh", sm: "8vh", md: "10vh", lg: "12vh", xl: "15vh" }}
              src={`${process.env.PUBLIC_URL}/images/ripple.png`}
              alt="Logo of HMCC"
            />
            <Text fontSize={[24, 24, 28, 32]} fontWeight="bold">
              You're all set!
            </Text>
            <Text fontSize={[14, 14, 20, 24]} fontWeight="semibold">
              If an account under your email address exists, an email will be
              sent with further instructions.
            </Text>
          </VStack>
        </Flex>
      </Stack>
    </>
  );
};

export default PasswordSubmitted;
