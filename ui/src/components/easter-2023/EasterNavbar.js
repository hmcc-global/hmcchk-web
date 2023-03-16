import { Box, Button, Link, Icon } from '@chakra-ui/react';

const EasterNavbar = () => {
  const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
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
    <hStack
      w="100%"
      spacing="0"
      py="0"
      paddingLeft="0%"
      paddingRight="0%"
      paddingBottom="0"
    >
      <Box bgPosition="center" bgSize="cover">
        <hStack px="3" py="6">
          <Button
            color="#FF3E02"
            // paddingTop={{ base: 10, sm: 9, md: 25, lg: 29 }}
            // paddingBottom={{ base: 10, sm: 9, md: 25, lg: 29 }}
            pt={2}
            pb={1}
            as={Link}
            onClick={handleClickScrollEaster}
            variant="link"
            w={[55, 70, 168]}
            borderRadius={10}
            fontSize={{ base: '0.75em', sm: '1em', lg: '1.2em' }}
            fontWeight="bold"
          >
            easter
          </Button>

          <CircleIcon
            color="#FF3E02"
            //boxSize={{ base: 2, sm: 3, md: 3.5, lg: 4 }}
            boxSize={{ base: 2, sm: 2, md: 3.5, lg: 4 }}
            py={[0.4, 0.6, 0.6, 0.8]}
          />

          <Button
            color="#E60053"
            // paddingTop={{ base: 10, sm: 9, md: 25, lg: 29 }}
            //paddingBottom={{ base: 2, sm: 10, md: 15, lg: 19 }}
            py={[2, 4]}
            as={Link}
            size="sm"
            onClick={handleClickScrollPrayerWall}
            variant="link"
            w={[79, 110, 210]}
            borderRadius={10}
            fontSize={{ base: '0.75em', sm: '1em', lg: '1.2em' }}
            fontWeight="bold"
          >
            prayer wall
          </Button>

          <CircleIcon
            color="#E60053"
            //boxSize={{ base: 2, sm: 3, md: 3.5, lg: 4 }}
            boxSize={{ base: 2, sm: 2, md: 3.5, lg: 4 }}
            py={[0.4, 0.6, 0.6, 0.8]}
          />

          <Button
            color="#8D2C72"
            // paddingTop={{ base: 10, sm: 9, md: 25, lg: 29 }}
            // paddingBottom={{ base: 10, sm: 9, md: 25, lg: 29 }}
            pt={2}
            pb={1}
            as={Link}
            size="sm"
            onClick={handleClickScrollTestimonies}
            variant="link"
            w={[130, 180, 300]}
            borderRadius={10}
            fontSize={{ base: '0.75em', sm: '1em', lg: '1.2em' }}
            fontWeight="bold"
          >
            witness testimonies
          </Button>
        </hStack>
      </Box>
    </hStack>
  );
};

export default EasterNavbar;
