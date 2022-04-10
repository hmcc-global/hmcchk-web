import React from 'react';
import { Flex, Button, Text, Stack, Link, SimpleGrid } from '@chakra-ui/react';
import { AiOutlineDesktop, AiOutlineInstagram } from 'react-icons/ai';
import { GiPartyPopper } from 'react-icons/gi';
import { useMediaQuery } from '@chakra-ui/media-query';
import { DateTime } from 'luxon';

const EasterCelebrationHomeContainer = () => {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:648px)');

  const getSessionStream = () => {
    const now = DateTime.local();
    const easterDateStart = DateTime.local(2022, 4, 17);
    const easterDateEnd = DateTime.local(2022, 4, 17, 23, 59, 59);

    if (now > easterDateStart && now < easterDateEnd) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Flex
      w={['100%']}
      h={['135vh', '110vh', '85vh']}
      bgImage={`url(${'/images/goodfriday/bg2.png'})`}
      bgSize="cover"
      bgPosition="center center"
      justify="center"
    >
      <SimpleGrid spacingY={isNotSmallerScreen ? '25%' : '35%'}>
        <Text
          textStyle="NextSoutherlandSerif_bold"
          fontSize={isNotSmallerScreen ? '72px' : '50px'}
          lineHeight={['100%', '110%']}
          textColor={'#FFFFFF'}
          textAlign={'center'}
          marginTop={isNotSmallerScreen ? ['15%'] : '40%'}
        >
          EASTER
          <br />
          CELEBRATION
        </Text>
        {/*Session Stream*/}
        <Stack>
          <Button
            isDisabled={getSessionStream()}
            size="lg"
            w="100%"
            leftIcon={<AiOutlineDesktop />}
            textStyle="Quicksand_bolder"
            fontSize={['sm', 'md']}
            lineHeight="1.2"
            color="#FFFFFF"
            bg="rgb(0, 0, 0, 0.17)"
            border="5px solid #8FCFEC"
            boxSizing="border-box"
            backdropFilter="blur(10px)"
            borderRadius="50px"
            boxShadow="0 px 4 px 4 px rgba(0,0,0,0.15)"
            textDecoration="none"
            _hover={{
              bg: '#8FCFEC',
              color: 'black',
            }}
            _focus={{
              outline: 'none',
              boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
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
              borderColor="#BBE5D1"
              boxSizing="border-box"
              backdropFilter="blur(10px)"
              borderRadius="50px"
              boxShadow="0 px 4 px 4 px rgba(0,0,0,0.15)"
              _hover={{
                bg: '#BBE5D1',
                color: 'black',
              }}
              _focus={{
                outline: 'none',
                boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
              }}
              as={Link}
              style={{ textDecoration: 'none' }}
              href="#SocialEmbed"
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
              border="5px solid #FFF7C0"
              boxSizing="border-box"
              backdropFilter="blur(10px)"
              borderRadius="50px"
              boxShadow="0 px 4 px 4 px rgba(0,0,0,0.15)"
              _hover={{
                bg: '#FFF7C0',
                color: 'black',
              }}
              _focus={{
                outline: 'none',
                boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
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

export default EasterCelebrationHomeContainer;
