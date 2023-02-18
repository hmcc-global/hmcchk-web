import {
    Box,
    Button,
    Link,
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
    const handleClickScrollEaster = () => {
        const element = document.getElementById('easter-story');
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleClickScrollPrayerWall = () => {
      const element = document.getElementById('prayer-wall');
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleClickScrollTestimonies = () => {
        const element = document.getElementById('easter-witness');
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
    return (
        
        <hStack w="100%" spacing="0" py="0" paddingLeft = '0%' paddingRight = '0%' paddingBottom = '0'>
        <Box
          bgPosition="center"
          bgSize="cover"
        >
            <hStack px="3" py="6">
            <Button
                color = '#E60053'
                paddingTop ={{ base: 10, sm: 9, md: 25, lg: 29 }}
                paddingBottom ={{ base: 10, sm: 9, md: 25, lg: 29 }}
                as={Link}
                size="sm"
                onClick={handleClickScrollPrayerWall}
                variant="link"
                w={[70, 200]}
                fontSize={["0.75em", "1.5em"]}
                fontWeight='bold'
            >
                prayer wall
            </Button>

            <CircleIcon color='#E60053'/>
        
            <Button
                color = '#FF3E02'
                paddingTop ={{ base: 10, sm: 9, md: 25, lg: 29 }}
                paddingBottom ={{ base: 10, sm: 9, md: 25, lg: 29 }}
                as={Link}
                onClick={handleClickScrollEaster}
                variant="link"
                w={[50, 70, 200]}
                fontSize={["0.75em", "1.5em"]}
                fontWeight='bold'
            >
                easter 
            </Button>
            
            <CircleIcon color='#FF3E02'/>
     
            <Button
                color = '#8D2C72'
                paddingTop ={{ base: 10, sm: 9, md: 25, lg: 29 }}
                paddingBottom ={{ base: 10, sm: 9, md: 25, lg: 29 }}
                as={Link}
                size="sm"
                onClick = {handleClickScrollTestimonies}
                variant="link"
                w={[120, 150, 300]}
                borderRadius={10}
                fontSize={["0.75em", "1.5em"]}
                fontWeight='bold'
            >
                witness testimonies 
            </Button>
          </hStack>
        </Box>

      </hStack>
    )
  }
  
export default EasterNavbar;