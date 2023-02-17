import {
    Container,
    Text,
    VStack,
    Box,
    Tabs,
    Tab,
    TabPanel,
    TabPanels,
    TabList,
    Image,
    Stack,
    Button,
    Flex,
    Link,
    Center,
    Spacer,
    Heading,
    Fade,
    useBoolean,
    Icon,
  } from '@chakra-ui/react';

  
  const EasterNavbar= () => {
    const CircleIcon = (props) => (
        <Icon viewBox='0 0 200 200' {...props}>
          <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          />
        </Icon>
      );
    const handeScrollToTop = () => {
        window.scrollTo({ top: 100, behavior: 'smooth'});
    };
    const handleClickScrollEaster = () => {
        const element = document.getElementById('easter-story');
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleClickScrollPrayerWall = () => {
      const element = document.getElementById('easter-calendar');
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleClickScrollTestimonies = () => {
        const element = document.getElementById('easter-calendar');
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
    return (
        
        <hStack w="100%" spacing="3vw" py="3vw" paddingLeft = '10%' paddingRight = '10%' paddingBottom = '0'>
        <Box
          bgPosition="center"
          bgSize="cover"
        >
          <hStack px="3" py="6">
            <Button
          color = '#FF810F'
          paddingTop ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          paddingBottom ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          as={Link}
          onClick={handleClickScrollEaster}
          variant="link"
          w={[200, 400]}
          fontSize={["1.2em", "1.8em"]}
        >
          easter 
        </Button>
        <CircleIcon color='#FF810F'/>
        <Button
          color = '#FF619F'
          paddingTop ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          paddingBottom ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          as={Link}
          size="sm"
          onClick={handleClickScrollPrayerWall}
          variant="link"
          w={[200, 400]}
          borderRadius={10}
          fontSize={["1.2em", "1.8em"]}
        >
          prayer wall
        </Button>
        <CircleIcon color='#FF619F'/>
        <Button
          color = '#FF3E02'
          paddingTop ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          paddingBottom ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          as={Link}
          size="sm"
          onClick = {handleClickScrollTestimonies}
          variant="link"
          w={[200, 400]}
          borderRadius={10}
          fontSize={["1.2em", "1.8em"]}
        >
          witness testimonies 
        </Button>
          </hStack>
        </Box>
      </hStack>
    )
  }
  
 
  

export default EasterNavbar;