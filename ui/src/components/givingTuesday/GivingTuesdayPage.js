import { Stack, Box, Container, Image, Center } from "@chakra-ui/react";
import GivingCategories from "./GivingCategories";
import HowToGive from "./HowToGive";
import LastYearGivingTuesday from "./LastYearGivingTuesday";
import WaysToGive from "./WaysToGive";
import WhatIsGivingTuesday from "./WhatIsGivingTuesday";

const GivingTuesdayPage = (props) => {
  const accentColor = "#3F94C3";

  return (
    <Box background="#EDFBFF">
      <Container maxW="container.lg">
        <Stack spacing={5} p={[3, 5]}>
          <Center>
            <Image
              borderRadius={20}
              borderWidth={1}
              borderColor="white"
              w={["100%", "80%"]}
              alignItems="center"
              h="auto"
              src={
                process.env.PUBLIC_URL +
                "/images/givingTuesday/giving-tuesday-final-ad.png"
              }
              alt="Giving Tuesday"
            />
          </Center>
          <WhatIsGivingTuesday accentColor={accentColor} />
          <GivingCategories accentColor={accentColor} />
          <HowToGive />
          <WaysToGive accentColor={accentColor} />
          <LastYearGivingTuesday />
        </Stack>
      </Container>
    </Box>
  );
};

export default GivingTuesdayPage;
