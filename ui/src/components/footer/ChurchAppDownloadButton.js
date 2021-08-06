import { Box, VStack, HStack, Image } from '@chakra-ui/react'
export function ChurchAppDownloadButton() {
    return (
      <VStack>
        <Box  height="25px"><Text color="white" fontSize="md">GET OUR CHURCH APP</Text></Box>
        <HStack>
          <Image h="40px" href="https://tithely.app.link/harvest-mission-community-church-hong-kong" objectFit="cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/135px-Download_on_the_App_Store_Badge.svg.png"/>
          <Image h="40px" href="https://tithely.app.link/harvest-mission-community-church-hong-kong"  objectFit="cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/320px-Google_Play_Store_badge_EN.svg.png"/>
        </HStack>
      </VStack>
  );
    };