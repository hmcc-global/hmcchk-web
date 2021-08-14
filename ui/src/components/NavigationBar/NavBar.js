import React, {useState} from 'react';
import {
	Flex,
<<<<<<< HEAD
=======
	Center,
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
	Stack,
	Box,
	Image,
	Button,
	Menu,
	MenuButton,
  MenuList,
  MenuItem,
	Drawer,
  DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import MainMenu from './MainMenu';

const Navigationbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const username = "name"
	const welcomeMsg = ["Login or Sign up", `Hi ${username}`]
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	const liveScStyle = {
             border: "5px", 
						 backgroundColor:"#EB4335", 
						 color:"white",
						 fontSize: "13px"
	};

  const handleLogin = () => {
    //waiting for login cookie
  }

  let currDate = new Date().toDateString().substr(0,3);

	return (
		<>
			<Flex
				w='100vw'
				bgGradient="linear(to-b, #C4C4C4, transparent)"
				align='center'
				color='gray.100'
				justify='center'
				align='center'
				fontSize='md'
				h='7vh'
				p={2}>
				<Flex w='100vw' justify='space-around'>
<<<<<<< HEAD
					<Box>
						<Link href='/'>
							<Image h='4vh' src='hmcc-logo.svg' alt='Logo of HMCC' />
						</Link>
					</Box> 
=======
					<Center>
						<Box position='relative'>
							<Link href='/'>
								<Image h='4vh' src='hmcc-logo.svg' alt='Logo of HMCC' />
							</Link>
						</Box> 
					</Center>
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
					<Stack
						spacing={8}
						color="black"
						justify='center'
						align='center'
            marginLeft="100px"
						isInline>
						<Box
							position='relative'
							>
							<Link href='/visit'>
								<a>VISIT</a>
							</Link>
						</Box>
						<Box
							position='relative'
							>
							<Link href='/about'>
								<a>ABOUT</a>
							</Link>
						</Box>
						<Box
							position='relative'
							>
							<Link href='/connect'>
								<a>CONNECT</a>
							</Link>
						</Box>
						<Box
							position='relative'
							>
							<Link href='/event'>
								<a>EVENTS</a>
							</Link>
						</Box>
						<Box
							position='relative'
							>
							<Link href='/sermon'>
								<a>SERMONS</a>
							</Link>
						</Box>
						<Box
							position='relative'
							>
							<Link href='/give'>
								<a>GIVE</a>
							</Link>
						</Box>
					</Stack>
					<Stack
						spacing={8}
						color="black"
						justify='right'
						align='right'
						isInline>
						<Box marginTop="8px">
						{loggedIn ? 
							<Menu>
								<MenuButton>
									{welcomeMsg[1]}
								</MenuButton>
								<MenuList>
									<MenuItem href="/">View Profile</MenuItem>
									<MenuItem href="/">Log Out</MenuItem>
								</MenuList>
							</Menu> : <Link href="/">{welcomeMsg[0]}</Link>}
						</Box>
						<Box>
							<Button ref={btnRef} onClick={onOpen} style={{background:"none"}}>  
								<Image h='4vh' src='menu.svg' alt='Menu Button' />
							</Button> 
						</Box>
					</Stack>
				</Flex>
			</Flex>
      {currDate == 'Sun' ?
        <Flex
          w='100vw'
          bgGradient="white"
          border = "1px solid #E2E8F0"
          box-shadow = "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          border-radius= "4px"
          align='center'
          color='gray.100'
          justify='center'
          align='center'
          fontSize='md'
          h='5.5vh'
          p={2}>
          <Flex w='100vw' justify='space-around'>
            <Stack
              spacing={8}
              color="black"
              justify='center'
              align='center'
              isInline>
              <Box
                position='relative'
                >
                <Link href='/live'>
                  <Button h='25px' style={liveScStyle}>WATCH SUNDAY CELEBRATION LIVE</Button>
                </Link>
              </Box>
            </Stack>
          </Flex>
        </Flex> : null
      }
		<Drawer
        isOpen={isOpen}
        size = "full"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
			<DrawerOverlay />
			<DrawerContent>
<<<<<<< HEAD
				<DrawerCloseButton />
				<DrawerHeader />
				<DrawerBody>
					<MainMenu />
				</DrawerBody>
				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme="blue">Save</Button>
				</DrawerFooter>
			</DrawerContent>
        </Drawer>
=======
				<DrawerCloseButton position='absolute' right='5%' top='5%' />
				<DrawerHeader />
				<DrawerBody>
					<MainMenu login = {loggedIn}/>
				</DrawerBody>
				<DrawerFooter />
			</DrawerContent>
    </Drawer>
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
		</>
	);
};

export default Navigationbar;