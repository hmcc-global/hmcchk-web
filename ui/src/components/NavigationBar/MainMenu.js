<<<<<<< HEAD
import React, {useState, Button} from 'react';
import {Link} from 'react-router-dom';
import {Flex, Box, HStack, VStack} from '@chakra-ui/react';
import './main-menu.css';

const MainMenu = () => {
  return (
    <HStack marginLeft="40px">
      <Flex marginTop="30px" marginRight="50px">
=======
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Flex, Box, HStack, Button, ButtonGroup, VStack, Center} from '@chakra-ui/react';
import { SocialIcon } from 'react-social-icons';
import './main-menu.css';

const MainMenu = ({login}) => {
  return (
    <HStack marginLeft="40px">
      <Flex marginTop="30px">
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
        <VStack alignItems="flex-start">
          <h1>Visit</h1>
					<Link href="/">
						<h3>Church online</h3>
					</Link>
          <h1>About</h1>
					<Link href="/">
						<h3>Who we are</h3>
					</Link>
          <Link href="/">
						<h3>Beliefs</h3>
					</Link>
					<Link href="/">
						<h3>Our values</h3>
					</Link>
					<Link href="/">
						<h3>Statement of Faith</h3>
					</Link>
					<Link href="/">
						<h3>Bold Vision</h3>
					</Link>
					<Link href="/">
						<h3>Harvest Mission International</h3>
					</Link>
        </VStack>
<<<<<<< HEAD
        <VStack alignItems="flex-start">
=======
        <VStack alignItems="flex-start" position='relative' left='40%'>
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
          <h1>Connect</h1>
					<Link href="/">
						<h3>Ministries</h3>
					</Link>
					<Link href="/">
						<h3>LIFE Groups</h3>
					</Link>
					<Link href="/">
						<h1>Events</h1>
					</Link>
					<Link href="/">
						<h1>Sermons</h1>
					</Link>
					<Link href="/">
						<h1>Give</h1>
					</Link>
        </VStack>
      </Flex>
<<<<<<< HEAD
      <Flex>
        <VStack className="third-column-mainmenu">
          <Box className="sign-up-button">
            <p>Login or Sign up</p>
          </Box>
          <Box className="other-links">
=======
      <Flex position='relative' left='40%'>
        <VStack className="third-column-mainmenu">
          <Box className="sign-up-button" position='relative'>
						{login ?
							<ButtonGroup position='relative' top='20%' flexDirection='column' size='md' variant='outline' colorScheme='black' width='200px' >
								<Button marginBottom='5' width='100%'>My Profile</Button>
								<Button marginBottom='5' width='100%'>Log Out</Button>
								<Button width='100%'>Prayer Requests</Button>
							</ButtonGroup>:
							<ButtonGroup flexDirection='column' size='md' variant='outline' colorScheme='black' width='200px' >
								<Button marginBottom='5' width='100%'>Login or Sign up</Button>
								<Button width='100%'>Prayer Requests</Button>
							</ButtonGroup>}
          </Box>
          <Box className="other-links" position='relative' top='15%' right='15%'>
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
            <VStack alignItems="flex-start">
              <h2>HONG KONG</h2>
              <h2>OTHER</h2>
              <h2>HMCC</h2>
              <h2>CHURCHES</h2>
              <h2>LOCATION</h2>
            </VStack>
          </Box>
<<<<<<< HEAD
          <Box className="social-media">
            <p>Social Media links</p>
=======
          <Box className="social-media" position='relative' top='25%' right='10%'>	
						<Center h="100%" w="100%" color="white">
								<SocialIcon bgColor="transparent" fgColor="#222222" size='50%' url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q" />
								<SocialIcon bgColor="transparent" fgColor="#222222" url="https://www.instagram.com/hmcc_hk/?hl=en" />
								<SocialIcon bgColor="transparent" fgColor="#222222" url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch" />
								<SocialIcon bgColor="transparent" fgColor="#222222" url="https://www.facebook.com/hmccofhk/" />
								<SocialIcon bgColor="transparent" fgColor="#222222" url="https://twitter.com/hmcc_hk?lang=en" />
								<SocialIcon bgColor="transparent" fgColor="#222222" url="https://vimeo.com/hmcchk" />
						</Center>
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
          </Box>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default MainMenu;