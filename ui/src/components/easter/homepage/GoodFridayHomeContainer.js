import React from 'react';
import { Flex, Button, Text, Stack, Link, SimpleGrid } from '@chakra-ui/react';
import { AiOutlineDesktop, AiOutlineInstagram } from 'react-icons/ai';
import { GiPartyPopper } from 'react-icons/gi';
import { useMediaQuery } from '@chakra-ui/media-query';
import { DateTime } from 'luxon';

const GoodFridayHomeContainer = () => {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:648px)');

  const getSessionStream = () => {
    const now = DateTime.local();
    const goodFriDateStart = DateTime.local(2022, 4, 15);
    const goodFriDateEnd = DateTime.local(2022, 4, 15, 23, 59, 59);

    if (now > goodFriDateStart && now < goodFriDateEnd) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Flex
      w={['100%']}
      h={['85vh']}
      bgImage={{
        base: `url(${'/images/goodfriday/bg-mobile.png'})`,
        sm: `url(${'/images/goodfriday/bg.png'})`,
        md: `url(${'/images/goodfriday/bg.png'})`,
      }}
      bgSize={['scale-down', 'cover']}
      bgPosition={['center center']}
      justify="center"
    >
      <SimpleGrid spacingY={['30%', '25%', '25%']}>
        <Text
          textStyle="NextSoutherlandSerif_bold"
          fontSize={['38px', '55px', '65px', '72px']}
          lineHeight={['100%', '110%']}
          textColor={'#935963'}
          textAlign={'center'}
          marginTop={['20%', '30%', '25%']}
        >
          GOOD FRIDAY
          <br />
          SERVICE
        </Text>
        {/*Session Stream*/}
        <Stack>
          <Button
            isDisabled={getSessionStream()}
            size="lg"
            w={['100%']}
            leftIcon={<AiOutlineDesktop />}
            textStyle="Quicksand_bolder"
            fontSize={['sm', 'md']}
            lineHeight="1.2"
            color="#FFFFFF"
            bg="rgb(0, 0, 0, 0.17)"
            border="5px solid #ECD8B3"
            boxSizing="border-box"
            backdropFilter="blur(10px)"
            borderRadius="50px"
            boxShadow="0 px 4 px 4 px rgba(0,0,0,0.15)"
            textDecoration="none"
            _hover={{
              bg: '#ECD8B3',
              color: 'black',
            }}
            _focus={{
              outline: 'none',
            }}
            _disabled={{
              cursor: 'not-allowed',
              pointerEvents: 'none',
              borderColor: '#D7D7D7',
              color: '#D7D7D7',
            }}
            as={Link}
            style={{ textDecoration: 'none' }}
            href="/online"
          >
            Session Stream
          </Button>
          <Stack
            spacing={2}
            direction={isNotSmallerScreen ? 'row' : 'column'}
            align="center"
          >
            {/*IG Button*/}
            <Button
              leftIcon={<AiOutlineInstagram />}
              size="lg"
              w={isNotSmallerScreen ? ['32%', '42%'] : '100%'}
              textStyle="Quicksand_bolder"
              fontSize={['sm', 'md']}
              lineHeight="1.2"
              color="#FFFFFF"
              bg="rgb(0, 0, 0, 0.17)"
              border="5px solid"
              borderColor="#E5B7B1"
              boxSizing="border-box"
              backdropFilter="blur(10px)"
              borderRadius="50px"
              boxShadow="0 px 4 px 4 px rgba(0,0,0,0.15)"
              _hover={{
                bg: '#E5B7B1',
                color: 'black',
              }}
              _focus={{
                outline: 'none',
              }}
              as={Link}
              style={{ textDecoration: 'none' }}
              href="/easter#SocialEmbed"
            >
              IG Campaign
            </Button>
            {/*Explore more of HMCC*/}
            <Button
              leftIcon={<GiPartyPopper boxSize={20} />}
              size="lg"
              w={isNotSmallerScreen ? ['48%', '58%'] : '100%'}
              textStyle="Quicksand_bolder"
              fontSize={['sm', 'md']}
              lineHeight="1.2"
              color="#FFFFFF"
              bg="rgb(0, 0, 0, 0.17)"
              border="5px solid #FFDCF0"
              boxSizing="border-box"
              backdropFilter="blur(10px)"
              borderRadius="50px"
              boxShadow="0 px 4 px 4 px rgba(0,0,0,0.15)"
              _hover={{
                bg: '#FFDCF0',
                color: 'black',
              }}
              _focus={{
                outline: 'none',
              }}
              as={Link}
              style={{ textDecoration: 'none' }}
              href="/connect"
            >
              Explore more of HMCC
            </Button>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Flex>
  );
};

export default GoodFridayHomeContainer;
