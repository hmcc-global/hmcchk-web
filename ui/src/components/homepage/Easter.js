import React from "react";
import {
    Flex, 
    Button, 
    Text,
    Stack,
    Link,
    SimpleGrid
  } from '@chakra-ui/react';
import { AiOutlineDesktop, AiOutlineInstagram } from 'react-icons/ai';
import { GiPartyPopper } from 'react-icons/gi';
import { useMediaQuery } from '@chakra-ui/media-query';

const HeroSection = () => {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:648px)');

  return (
    <Flex
    w={['100%']}
    h='110vh'
    bgImage={`url(${'/images/goodfriday/bg2.png'})`}
    bgSize="cover"
    bgPosition="center center"
    justify="center">
      <SimpleGrid spacingY={isNotSmallerScreen ? '25%' : '35%'}>
        <Text          
          fontFamily={'NextSoutherlandSerif'}
          fontSize={isNotSmallerScreen ? '72px' : '50px'}
          lineHeight={['100%','110%']}
          fontWeight='700'
          textColor={'#FFFFFF'}
          textAlign={'center'}
          marginTop={isNotSmallerScreen ? ['15%'] : '40%'}>
            EASTER
            <br/>
            CELEBRATION
        </Text>
        {/*Session Stream*/}
        <Stack>
          <Button
            //isDisabled='true'
            size='lg'
            w='100%'
            leftIcon={<AiOutlineDesktop />}
            fontFamily={'Quicksand'}
            fontSize={['sm', 'md']}
            lineHeight='1.2'
            color='#FFFFFF'
            fontWeight='700'
            bg="rgb(0, 0, 0, 0.17)"
            border='5px solid #8FCFEC'
            boxSizing= 'border-box'
            backdropFilter= 'blur(10px)'
            borderRadius= '50px'
            boxShadow='0 px 4 px 4 px rgba(0,0,0,0.15)'
            textDecoration= 'none'
            _hover={{
              bg:'#8FCFEC',
              color:'black'
            }}
            _focus={{
              outline: 'none',
              boxShadow: '0 0 0 0 rgba(0,0,0,0) !important'
            }}
            _disabled={{
              cursor: 'not-allowed',
              pointerEvents: 'none',
              borderColor:'#D7D7D7',
              color:'#D7D7D7'
            }}
            as={Link}
            style={{textDecoration:'none'}}
            href="/online">
          Session Stream
          </Button>
          <Stack spacing={2} direction={isNotSmallerScreen ? 'row':'column'} align='center'>
            {/*IG Button*/}
            <Button
              //isDisabled='true'
              leftIcon={<AiOutlineInstagram />}
              size='lg'
              w={isNotSmallerScreen ? ['32%','42%'] : '100%'} 
              fontFamily={'Quicksand'}
              fontSize={['sm', 'md']}
              lineHeight='1.2'
              color='#FFFFFF'
              fontWeight='700'
              bg="rgb(0, 0, 0, 0.17)"
              border='5px solid'
              borderColor='#BBE5D1'
              boxSizing= 'border-box'
              backdropFilter= 'blur(10px)'
              borderRadius= '50px'
              boxShadow='0 px 4 px 4 px rgba(0,0,0,0.15)'
              _hover={{
                bg:'#BBE5D1',
                color:'black'
              }}
              _focus={{
                outline: 'none',
                boxShadow: '0 0 0 0 rgba(0,0,0,0) !important'
              }}
              _disabled={{
                cursor: 'not-allowed',
                pointerEvents: 'none',
                borderColor:'#D7D7D7',
                color:'#D7D7D7'
              }}
              as={Link}
              style={{textDecoration:'none'}}
              href="#SocialEmbed"
              >
            IG Campaign
            </Button>
            {/*Explore more of HMCC*/}
            <Button
              //isDisabled='true'
              leftIcon={<GiPartyPopper boxSize={20}/>}
              size='lg'
              w={isNotSmallerScreen ? ['48%','58%'] : '100%'} 
              fontFamily={'Quicksand'}
              fontSize={['sm', 'md']}
              lineHeight='1.2'
              color='#FFFFFF'
              fontWeight='700'
              bg="rgb(0, 0, 0, 0.17)"
              border='5px solid #FFF7C0'
              boxSizing= 'border-box'
              backdropFilter= 'blur(10px)'
              borderRadius= '50px'
              boxShadow='0 px 4 px 4 px rgba(0,0,0,0.15)'
              _hover={{
                bg:'#FFF7C0',
                color:'black'
              }}
              _focus={{
                outline: 'none',
                boxShadow: '0 0 0 0 rgba(0,0,0,0) !important'
              }}
              _disabled={{
                cursor: 'not-allowed',
                pointerEvents: 'none',
                borderColor:'#D7D7D7',
                color:'#D7D7D7'
              }}
              as={Link}
              style={{textDecoration:'none'}}
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
  
  export default HeroSection;
  