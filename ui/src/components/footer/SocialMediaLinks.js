import * as React from 'react';
import { SocialIcon } from 'react-social-icons';
import { Box, Text, HStack } from '@chakra-ui/react';

export function SocialMediaLinks() {
  return (
    <Box>
      <Box w="300px">
        <Text textAlign={['center', 'left']}>Follow us</Text>
        <HStack>
          <SocialIcon
            target="_blank"
            bgColor="#222222"
            fgColor="white"
            url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
          />
          <SocialIcon
            target="_blank"
            bgColor="#222222"
            fgColor="white"
            url="https://www.instagram.com/hmcc_hk/?hl=en"
          />
          <SocialIcon
            target="_blank"
            bgColor="#222222"
            fgColor="white"
            url="https://open.spotify.com/user/hmccofhk?si=bd64100596904a95"
          />
          <SocialIcon
            target="_blank"
            bgColor="#222222"
            fgColor="white"
            url="https://www.facebook.com/hmccofhk/"
          />
          <SocialIcon
            target="_blank"
            bgColor="#222222"
            fgColor="white"
            url="https://twitter.com/hmcc_hk?lang=en"
          />
          <SocialIcon
            target="_blank"
            bgColor="#222222"
            fgColor="white"
            url="https://vimeo.com/hmcchk"
          />
        </HStack>
      </Box>
    </Box>
  );
}
