import React, {useState, Button} from 'react';
import {Link} from 'react-router-dom';
import {Flex, Box, HStack, VStack} from '@chakra-ui/react';
import './main-menu.css';

const MainMenu = () => {
  return (
    <HStack marginLeft="40px">
      <Flex marginTop="30px" marginRight="50px">
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
        <VStack alignItems="flex-start">
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
      <Flex>
        <VStack className="third-column-mainmenu">
          <Box className="sign-up-button">
            <p>Login or Sign up</p>
          </Box>
          <Box className="other-links">
            <VStack alignItems="flex-start">
              <h2>HONG KONG</h2>
              <h2>OTHER</h2>
              <h2>HMCC</h2>
              <h2>CHURCHES</h2>
              <h2>LOCATION</h2>
            </VStack>
          </Box>
          <Box className="social-media">
            <p>Social Media links</p>
          </Box>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default MainMenu;