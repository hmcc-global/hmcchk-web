import * as React from "react";
import { Box, VStack, HStack, Image, Text, Link } from "@chakra-ui/react";
export function SoapAppDownloadButton() {
  return (
    <VStack minW="50%">
      <Box height="25px">
        <Text color="white" fontSize="md">
          Get our Daily SOAP App
        </Text>
      </Box>
      <HStack>
        <Link
          target="_blank"
          href="https://apps.apple.com/hk/app/daily-soap-bible-reading-app/id1448825436"
        >
          <Image
            h="40px"
            objectFit="cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/135px-Download_on_the_App_Store_Badge.svg.png"
          />
        </Link>
        <Link
          target="_blank"
          href="https://play.google.com/store/apps/details?id=net.hmcc.hongkong.dailysoap"
        >
          <Image
            h="40px"
            objectFit="cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/320px-Google_Play_Store_badge_EN.svg.png"
          />
        </Link>
      </HStack>
    </VStack>
  );
}
