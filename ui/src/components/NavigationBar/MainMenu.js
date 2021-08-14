import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Flex, 
				Box, 
				HStack, 
				Button, 
				ButtonGroup, 
				VStack, 
				Center,
				Accordion,
  			AccordionItem,
  			AccordionButton,
  			AccordionPanel,
  			AccordionIcon,} 
from '@chakra-ui/react';
import { SocialIcon } from 'react-social-icons';
import './main-menu.css';

const MainMenu = ({login, view}) => {
  const WebView = () => {
		return(
    <HStack marginLeft="40px" display={{base:'none', md:'flex'}} color='white'>
      <Flex marginTop="30px">
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
        <VStack alignItems="flex-start" position='relative' left={{md:'10%', lg:'30%', xl:'40%'}}>
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
      <Flex position='relative' left={{md:'10%',lg:'30%' ,xl:'40%'}}>
        <VStack className="third-column-mainmenu" alignItems='flex-end'>
          <Box className="sign-up-button" position='relative'>
						{login ?
							<ButtonGroup position='relative' top='20%' right='30%' flexDirection='column' size='md' variant='outline' colorScheme='black' width='200px' >
								<Button marginBottom='5' width='100%'>My Profile</Button>
								<Button marginBottom='5' width='100%'>Log Out</Button>
								<Button width='100%'>Prayer Requests</Button>
							</ButtonGroup>:
							<ButtonGroup flexDirection='column' position='relative' right='30%' marginTop='20px' size='md' variant='outline' colorScheme='black' width='200px' >
								<Button marginBottom='5' width='100%'>Login or Sign up</Button>
								<Button width='100%'>Prayer Requests</Button>
							</ButtonGroup>}
          </Box>

          <Box className="other-links" position='relative' top='15%' right='43%'>
            <VStack alignItems="center" fontSize="sm">
							<h2>Ann Arbor</h2>
							<h2>Austin</h2>
							<h2>Detroit</h2>
              <h2 style={{fontWeight:'bolder'}}>HONG KONG</h2>
              <h2>Jakrta</h2>
              <h2>Tangerang</h2>
            </VStack>
          </Box>
          <Box className="social-media" position='relative' top='25%' right='10%'>	
						<Center h="100%" w="100%" color="white">
								<SocialIcon bgColor="transparent" fgColor="#ffffff" size='50%' url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q" />
								<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://www.instagram.com/hmcc_hk/?hl=en" />
								<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch" />
								<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://www.facebook.com/hmccofhk/" />
								<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://twitter.com/hmcc_hk?lang=en" />
								<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://vimeo.com/hmcchk" />
						</Center>
          </Box>
        </VStack>
      </Flex>
    </HStack>
		);
	};

	const MobileView = () => {
		return(
			<Flex direction='column' display={{base:'flex', md:'none'}}>
			<VStack  color='white' alignItems='flex-start'>
				<Flex marginTop="30px" direction='column'>
					<VStack alignItems="flex-start">
						<Accordion allowMultiple  >
							<AccordionItem borderStyle='none' >
								<h2>
									<AccordionButton>
										<Box textAlign="left" marginRight='5px' fontWeight='bold' fontSize='2xl'>
											Visit
										</Box>
										<AccordionIcon alignItems='flex-start' />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Church online
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem borderStyle='none'>
								<h2>
									<AccordionButton>
										<Box marginRight='5px' textAlign="left" fontWeight='bold' fontSize='2xl'>
											About
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Who we are
								</AccordionPanel>
								<AccordionPanel pb={4}>
									Beliefs
								</AccordionPanel>
								<AccordionPanel pb={4}>
									Our values
								</AccordionPanel>
								<AccordionPanel pb={4}>
									Statement of Faith
								</AccordionPanel>
								<AccordionPanel pb={4}>
									Bold Vision
								</AccordionPanel>
								<AccordionPanel pb={4}>
									Harvest Mission International
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem borderStyle='none'>
								<h2>
									<AccordionButton>
										<Box marginRight='5px' textAlign="left" fontWeight='bold' fontSize='2xl'>
											Connect
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Ministries
								</AccordionPanel>
								<AccordionPanel pb={4}>
									LIFE Groups
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem borderStyle='none'>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left" fontWeight='bold' fontSize='2xl'>
											Events
										</Box>
									</AccordionButton>
								</h2>
							</AccordionItem>
							<AccordionItem borderStyle='none'>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left" fontWeight='bold' fontSize='2xl'>
											Sermons
										</Box>
									</AccordionButton>
								</h2>
							</AccordionItem>
							<AccordionItem borderStyle='none'>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left" fontWeight='bold' fontSize='2xl'>
											Give
										</Box>
									</AccordionButton>
								</h2>
							</AccordionItem>
						</Accordion>
					</VStack>
				</Flex>
			</VStack>
			<VStack justifyContent='center' color='white' marginTop='30px'>
				<Flex position='relative'>
					<VStack className="third-column-mainmenu">
						<Box className="sign-up-button" position='relative'>
							{login ?
								<ButtonGroup position='relative' flexDirection='column' size='md' variant='outline' colorScheme='black' width='200px' >
									<Button marginBottom='5' width='100%'>My Profile</Button>
									<Button marginBottom='5' width='100%'>Log Out</Button>
									<Button width='100%'>Prayer Requests</Button>
								</ButtonGroup>:
								<ButtonGroup flexDirection='column' size='md' variant='outline' colorScheme='black' width='200px' >
									<Button marginBottom='5' width='100%'>Login or Sign up</Button>
									<Button width='100%'>Prayer Requests</Button>
								</ButtonGroup>}
						</Box>
						<Box className="other-links" position='relative'>
						<Accordion allowMultiple marginTop='20px'>
							<AccordionItem borderStyle='none'>
								<h2>
									<AccordionButton>
										<Box textAlign="center" fontWeight='bold' fontSize='xl' marginRight='5px'>
											HONG KONG
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4} textAlign="center">
									Ann Arbor
								</AccordionPanel>
								<AccordionPanel pb={4} textAlign="center">
									Austin
								</AccordionPanel>
								<AccordionPanel pb={4} textAlign="center">
									Detroit
								</AccordionPanel>
								<AccordionPanel pb={4} textAlign="center">
									Jakarta
								</AccordionPanel>
								<AccordionPanel pb={4} textAlign="center">
									Hong Kong
								</AccordionPanel>
								<AccordionPanel pb={4} textAlign="center">
									Tangerang
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
						</Box>
						<Box className="social-media" position='relative'>	
							<Center h="100%" w="100%" color="white" marginTop='10px'>
									<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q" />
									<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://www.instagram.com/hmcc_hk/?hl=en" />
									<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch" />
									<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://www.facebook.com/hmccofhk/" />
									<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://twitter.com/hmcc_hk?lang=en" />
									<SocialIcon bgColor="transparent" fgColor="#ffffff" url="https://vimeo.com/hmcchk" />
							</Center>
						</Box>
					</VStack>
				</Flex>
			</VStack>
			</Flex>
			);
	}

	return(
		<>
			<MobileView />
			<WebView />	
		</>
		);
};

export default MainMenu;