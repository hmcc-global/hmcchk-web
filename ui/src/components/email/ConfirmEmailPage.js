import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Text } from "@chakra-ui/react";

const ConfirmEmailPage = (props) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(async () => {
    const confirmEmail = async () => {
      try {
        const { token } = props.match.params;
        const { data } = await axios.post("/api/auth/confirm-email", {
          token,
        });
        setIsConfirmed(data);
      } catch (err) {
        console.log(err);
      }
    };

    await confirmEmail();
  }, []);

  return (
    <Container maxW="container.lg">
      <Box mt={4}>
        <Text>
          {isConfirmed
            ? "Email successfully confirmed!"
            : "Unable to confirm email. Please try again."}
        </Text>
      </Box>
    </Container>
  );
};

export default ConfirmEmailPage;
