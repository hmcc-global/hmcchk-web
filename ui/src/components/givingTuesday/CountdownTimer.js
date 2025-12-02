import { Center, Stack, Text } from "@chakra-ui/react";

const CountdownTimer = (props) => {
  const { accentColor, remainingTime } = props;

  return (
    <Center>
      <Stack
        direction={["column", "row"]}
        spacing={0}
        borderWidth={1}
        borderRadius="3xl"
        borderColor="white"
        background="white"
        shadow="md"
        w={["100%", "80%"]}
        color={accentColor}
        fontWeight="900"
        fontSize={["1.75rem", "2.5rem"]}
        px={7}
        py={3}
      >
        <Text flex="1" textAlign={["center", "left"]}>
          Time left to give
        </Text>
        <Text flex="1" textAlign={["center", "right"]}>
          {remainingTime}
        </Text>
      </Stack>
    </Center>
  );
};

export default CountdownTimer;
