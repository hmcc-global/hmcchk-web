import { Box, Stack, LinkBox, StackDivider, Image, Text, HStack,Flex, Spacer, VStack} from '@chakra-ui/react'
import { SocialMediaLinks } from './SocialMediaLinks'
import { Heading, useColorModeValue } from '@chakra-ui/react'
import { Link, SimpleGrid } from '@chakra-ui/react'
import { requirePropFactory } from '@material-ui/core';

export default function FooterContainer(){
  return(
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="12"
    bg="#222222"
    color="white"
    px={{
      base: '4',
      md: '8',
    }}
  >
    <Stack spacing="5" divider={<StackDivider />}>
      <center>
        <SocialMediaLinks />
      </center>
        <HStack height="120px" w="90%" bg="#222222">
          <ChurchAppDownloadButton />
          <SoapAppDownloadButton />

        </HStack>
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        spacing={{
          base: '5',
          lg: '28',
        }}
      >
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          spacing={{
            base: '10',
            md: '20',
          }}
        >
          <LinkGrid
            spacing={{
              base: '10',
              md: '20',
              lg: '28',
            }}
            flex="1"
          />
          
        </Stack>
      </Stack>
      
    </Stack>
  </Box>
);
};
      

function FooterHeading(){
  return (
  <Heading
    as="h4"
    color={useColorModeValue('gray.600', 'gray.400')}
    fontSize="sm"
    fontWeight="semibold"
    textTransform="uppercase"
    letterSpacing="wider"
  />
  );
};

function LinkGrid() {
  return (
  <SimpleGrid columns={5}>
    <Box minW="130px">
      <FooterHeading mb="4">ABOUT</FooterHeading>
      <Stack>
        <Link>Who we are</Link>
        <Link>Beliefs</Link>
        <Link>Staff</Link>
        <Link>BOLD Vision</Link>
        <Link>Harvest Mission International</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">GET INVOLVED</FooterHeading>
      <Stack>
        <Link>Sunday Celebration</Link>
        <Link>Upcoming Events</Link>
        <Link>LIFE Group</Link>
        <Link>Life Stage Ministries</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">SERMONS</FooterHeading>
      <Stack>
        <Link>Recordings</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">GIVE</FooterHeading>
      <Stack>
        <Link>Ways to give</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">VISIT US</FooterHeading>
      <Stack>
        <Link>Get directions here</Link>
        <Link>hongkong@hmcc.net</Link>
        <Link>Feedbacks/Comments</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
  };
  function ChurchAppDownloadButton() {
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
    function SoapAppDownloadButton() {
      return (
        <VStack>
          <Box  height="25px"><Text color="white" fontSize="md">GET OUR SOAP APP</Text></Box>
          <HStack >
            <Image h="40px"  href="https://play.google.com/store/apps/details?id=net.hmcc.hongkong.dailysoap" objectFit="cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/135px-Download_on_the_App_Store_Badge.svg.png"/>
            <Image h="40px" href="https://apps.apple.com/hk/app/daily-soap-bible-reading-app/id1448825436"  objectFit="cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/320px-Google_Play_Store_badge_EN.svg.png"/>
          </HStack>
        </VStack>
    );
      };
