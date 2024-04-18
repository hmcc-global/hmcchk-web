import { Box, VStack, HStack, Image, Text, Link } from '@chakra-ui/react';
export function ChurchAppDownloadButton() {
  return (
    <VStack minW="50%" align="left">
      <Box height="25px">
        <Text color="white" fontSize="lg" fontWeight={['400', '700']}>
          Get our Church App
        </Text>
      </Box>
      <HStack>
        <Link
          target="_blank"
          href="https://tithely.app.link/harvest-mission-community-church-hong-kong"
          id="footer-app-apple"
        >
          <Image
            h={{ base: '10', md: '9', lg: '10' }}
            objectFit="cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/135px-Download_on_the_App_Store_Badge.svg.png"
          />
        </Link>
        <Link
          target="_blank"
          href="https://tithely.app.link/harvest-mission-community-church-hong-kong"
          id="footer-app-android"
        >
          <Image
            h={{ base: '10', md: '9', lg: '10' }}
            objectFit="cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/320px-Google_Play_Store_badge_EN.svg.png"
          />
        </Link>
      </HStack>
    </VStack>
  );
}
