import * as React from "react";
import { SocialIcon } from "react-social-icons";
<<<<<<< Updated upstream
import { Box, Center } from "@chakra-ui/react";

export function SocialMediaLinks() {
  return (
    <Box height="80px" bg="#222222">
      <Center bg="#222222" h="100%" w="100%" color="white">
        <SocialIcon
          bgColor="#222222"
          fgColor="white"
          url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
        />
        <SocialIcon
          bgColor="#222222"
          fgColor="white"
          url="https://www.instagram.com/hmcc_hk/?hl=en"
        />
        <SocialIcon
          bgColor="#222222"
          fgColor="white"
          url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch"
        />
        <SocialIcon
          bgColor="#222222"
          fgColor="white"
          url="https://www.facebook.com/hmccofhk/"
        />
        <SocialIcon
          bgColor="#222222"
          fgColor="white"
          url="https://twitter.com/hmcc_hk?lang=en"
        />
        <SocialIcon
          bgColor="#222222"
          fgColor="white"
          url="https://vimeo.com/hmcchk"
        />
      </Center>
=======
import { Box, Center, Text, VStack, HStack } from "@chakra-ui/react";

export function SocialMediaLinks() {
  return (
    <Box>
      <Box w="300px">
        <Text textAlign="left">Follow us</Text>
        <HStack>
          <SocialIcon
            bgColor="#222222"
            fgColor="white"
            url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
          />
          <SocialIcon
            bgColor="#222222"
            fgColor="white"
            url="https://www.instagram.com/hmcc_hk/?hl=en"
          />
          <SocialIcon
            bgColor="#222222"
            fgColor="white"
            url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch"
          />
          <SocialIcon
            bgColor="#222222"
            fgColor="white"
            url="https://www.facebook.com/hmccofhk/"
          />
          <SocialIcon
            bgColor="#222222"
            fgColor="white"
            url="https://twitter.com/hmcc_hk?lang=en"
          />
          <SocialIcon
            bgColor="#222222"
            fgColor="white"
            url="https://vimeo.com/hmcchk"
          />
        </HStack>
      </Box>
>>>>>>> Stashed changes
    </Box>
  );
}
