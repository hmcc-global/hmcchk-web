import { Flex, Center, Button, Link, Box, HStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

const IsSite = (array) => useHistory().location.pathname.includes(array.site);

const EasterBanner = () => {
  const currDate = DateTime.local();

  const goodFriDateStartDay = DateTime.local(2022, 4, 15);
  const goodFriDateStart = DateTime.local(2022, 4, 15, 19, 30);
  const goodFriDateEnd = DateTime.local(2022, 4, 15, 23, 59, 59);

  const easterDateStart = DateTime.local(2022, 4, 17, 10);
  const easterDateEnd = DateTime.local(2022, 4, 17, 13, 15);

  const bannerMode = {
    easter: {
      background: '/images/easter/easter-banner.gif',
      site: 'easter',
      link: '/easter',
      buttonColor: '',
      hovertextColor: '',
      hoverbgColor: '',
      content1: 'CHECK OUT EASTER',
      content2: '2022',
      content3: ' : BECAUSE ',
      content4: '              ',
    },
    goodFriday: {
      background: '/images/easter/GF-banner.gif',
      site: 'good-friday',
      link: '/good-friday',
      buttonColor: '#7E465E',
      hovertextColor: '#FFFFFF',
      hoverbgColor: '#7E465E',
      content1: 'Checkout Good Friday Homepage',
      content2: '',
      content3: ': BECAUSE ',
      content4: 'HE DIED',
    },
    easterSunday: {
      background: '/images/easter/easter-banner.gif',
      site: 'easter-celebration',
      link: '/easter-celebration',
      buttonColor: '#004B81',
      hovertextColor: '#FFFFFF',
      hoverbgColor: '#004B81',
      content1: 'Checkout Easter Homepage',
      content2: '',
      content3: ': BECAUSE ',
      content4: 'HE LIVES',
    },
    GF: {
      background: '/images/easter/GF-banner.gif',
      site: 'online',
      link: '/online',
      buttonColor: '#7E465E',
      hovertextColor: '#FFFFFF',
      hoverbgColor: '#7E465E',
      content1: 'Good Friday SERVICE ',
      content2: ' ',
      content3: ' : BECAUSE ',
      content4: 'HE DIED',
    },

    EC: {
      background: '/images/easter/EC-banner.gif',
      site: 'online',
      link: '/online',
      buttonColor: '#004B81',
      hovertextColor: '#FFFFFF',
      hoverbgColor: '#004B81',
      content1: 'EASTER CELEBRATION',
      content2: ' ',
      content3: ' : BECAUSE ',
      content4: 'HE LIVES',
    },
  };
  let currMode;
  let isDisplay = false;

  if (currDate > easterDateStart && currDate < easterDateEnd) {
    currMode = bannerMode['EC'];
  } else if (currDate > goodFriDateEnd && currDate < easterDateEnd) {
    currMode = bannerMode['easterSunday'];
    isDisplay = true;
  } else if (currDate > goodFriDateStart && currDate < goodFriDateEnd) {
    currMode = bannerMode['GF'];
  } else if (currDate > goodFriDateStartDay && currDate < goodFriDateEnd) {
    currMode = bannerMode['goodFriday']
    isDisplay = true;
  } else {
    currMode = bannerMode['easter'];
    isDisplay = true;
  }
  return (
    <Flex
      w="100vw"
      bgImage={`url(${process.env.PUBLIC_URL + currMode.background})`}
      h="6vh"
      p={2}
      bgPosition="center"
      bgSize="cover"
      justify="center"
      display={IsSite(currMode) ? 'none' : 'flex'}
    >
      <Flex w="100vw" justify="space-around">
        <Center>
          <Link href={currMode.link} _hover={{ borderBottom: '1px' }}>
            <HStack h="100%" spacing="1">
              <Button
                size={['xx-small', 'xs']}
                padding={1.5}
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs']}
                marginRight={'0.4em'}
                backgroundColor={'transparent'}
                borderColor={currMode.buttonColor}
                textColor={currMode.buttonColor}
                borderWidth={2}
                borderRadius={'0.8em'}
                display={isDisplay ? 'none' : 'flex'}
                _hover={{
                  backgroundColor: currMode.hoverbgColor,
                  textColor: currMode.hovertextColor,
                }}
              >
                WATCH NOW
              </Button>
              <Box
                as="span"
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs', 'small']}
                fontWeight="extrabold"
              >
                {currMode.content1}
              </Box>
              <Box
                as="span"
                textStyle="FogtwoNo5"
                fontSize={['sm', 'medium', 'lg']}
                fontWeight="extrabold"
                whiteSpace="pre"
                paddingTop={['0em', '0.15em', '0.15em']}
                display={isDisplay ? 'flex' : 'none'}
              >
                {currMode.content2}
              </Box>
              <Box
                as="span"
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs', 'small']}
                fontWeight="extrabold"
                whiteSpace="pre"
              >
                {currMode.content3}
              </Box>
              <Box
                as="span"
                textStyle="NextSoutherlandSerif"
                fontSize={['xx-small', 'xs', 'small']}
                fontWeight="extrabold"
                whiteSpace="pre"
                textDecoration={'underline'}
                textUnderlineOffset={'0.2em'}
              >
                <u>{currMode.content4}</u>
              </Box>
            </HStack>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
};

export default EasterBanner;
