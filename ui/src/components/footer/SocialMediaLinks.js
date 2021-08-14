import * as React from "react";
import { SocialIcon } from "react-social-icons";
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
    </Box>
  );
}
