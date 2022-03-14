import * as React from 'react';
import { 
  Button, 
  Heading, 
  Text, 
  HStack, 
  Container, 
  Link,
  Center,
  Image,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { generateGoogleCalendarLink } from "../../helpers/eventsHelpers";
import { useMediaQuery } from '@chakra-ui/media-query';
import Invitation1 from './blie.png';
import Invitation2 from './red.png';

const InvitationSection = () => {
  
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
  return (
    <Center maxW="auto" mx="auto">
      <Stack spacing={1}>
        <Text 
          textStyle='NextSoutherlandSerif'
          textAlign='center'
          fontSize={isNotSmallerScreen ? '32px':'18x'}>
          INVITE YOUR FRIENDS!
        </Text>
        <Text
          fontSize={isNotSmallerScreen ? '20px':'13px'}
          textStyle='Quicksand'
          textAlign='center'>
          {isNotSmallerScreen ? 'Save these invites and share them with your friends and loved ones.' : 
          'Press-and-hold these invites below to share/save them to your friends and loved ones.'}
          </Text>  
        <Flex gap='20px' direction={isNotSmallerScreen ? "row" : "column"}>
            <Image p={6}
              boxSize={['50%, 60%, 70%, 80%, 90%']}
              objectFit="cover"
              src={"/images/easter/redinvitation.png"} 
              alt='random'
              alignSelf="center"
            />
            <Image p={6}
              boxSize={['50%,60%,70%,80%, 90%']}
              objectFit="cover"
              src={"/images/easter/blueinvitation.png"}
              alt='random' 
              alignSelf="center"
            />
        </Flex>
        <Text 
          fontSize={isNotSmallerScreen ? '32px':'22px'}
          textStyle='NextSoutherlandSerif'
          textAlign='center'> 
            CHECK OUT{' '}
            <Link style={{textDecoration: 'underline', textUnderlineOffset: '5px'}} color='blue.700' href='/connect'>
              WHAT ELSE {<br />} IS HAPPENING IN HMCC!
            </Link>
        </Text> 
        <Text 
          textStyle='Quicksand'
          fontSize={isNotSmallerScreen ? '20px':'13px'}
          textAlign='center'
          paddingBottom={20}>
          (click!)
        </Text>
      </Stack>
    </Center>
  );
}

function Event_details({header , sub_header , sentence , date , time , location , eventData}) {
  let hColor , backgroundColor , borderColor , hoverColor;
  if(header === "Good Friday"){
    [hColor , backgroundColor , borderColor, hoverColor] = ["#A6657A" , "#F1D8DE" , "#C69494" , "#D28F8F"] ; 
  }
  else{
    [hColor , backgroundColor , borderColor, hoverColor] = ["#436EA0" , "#E0EDFF" , "#6E7F98" , "#7F99C0"]
  } 

  return (
    <Container
      p = {4}
      m = {1}
      maxWidth = {[ '270px' ,'280px' , '290px' , '301px' ]}
      flexShrink = {0}
      
    >
      <Heading 
        textTransform = {'uppercase'} 
        fontFamily= {'NextSoutherlandSerif'} 
        lineHeight = {'53.44px'} 
        fontWeight = {400} 
        fontSize = {[ '160%' ,  '170%' ,  '180%' , '200%']}
        textColor = {hColor}
        >
          {header} <br/> {sub_header}
      </Heading>
      <Text 
        paddingBottom = {3} 
        fontFamily = {'Quicksand'} 
        fontSize = {{lg: '140%' , md: '120%' , sm: '100%'}} 
        fontWeight = {400}
        lineHeight = {['25px']}
        textColor = {hColor}
        >
          Because <u>{sentence}</u>
      </Text>

      <Text fontFamily = {'Quicksand'} lineHeight = {'25px'} fontWeight={400} fontSize={{lg: '140%' , md: '120%' , sm: '100%'}}>{date}</Text>
      <Text fontFamily = {'Quicksand'} lineHeight = {'25px'} fontWeight={400} fontSize={{lg: '140%' , md: '120%' , sm: '100%'}}>{time}</Text>
      <Text fontFamily = {'Quicksand'} lineHeight = {'25px'} fontWeight={400} fontSize={{lg: '140%' , md: '120%' , sm: '100%'}}>{location}</Text>
      <br/>
      {generateGoogleCalendarLink(eventData) && (
        <Button 
          textAlign = {'center'}
          fontWeight = {700}
          padding = {'10px'}
          border = {'solid'}
          borderWidth = {'1px'}
          borderRadius={'10px'}
          boxShadow = {'1px 3px 4px 0px #00000040'} 
          width = {'100%'}
          height = {'43px'} 
          blendMode = {'pass through'}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          _hover={{
            backgroundColor :  hoverColor,
            textColor : 'white'
          }}
          as={Link}
          target={"_blank"}
          href = {generateGoogleCalendarLink(eventData)}
        >
          Add to Calendar
        </Button>
      )} 

    </Container>
  )
}

const InvitationContainer = () => {
  const service  = {
    time: "7:30 PM", 
    title: "Good Friday Service: Because He Died", 
    startDate: '2022-04-15T00:00:00.000+08:00', 
    endDate: '2022-04-15T00:00:00.000+08:00', 
    recurrence: "7",
    location: "Online"};
  const celebration  = {
    time: "10:00 AM", 
    title: "Easter Celebration: Because He Lives", 
    startDate: '2022-04-17T00:00:00.000+08:00', 
    endDate: '2022-04-17T00:00:00.000+08:00', 
    recurrence: "7",
    location: "Online"};
   

  return (
    <>
      <HStack
       columnGap = {{lg: '125px' ,  md: '110px' , sm: '100px'}}
       justifyContent = 'center'
       textAlign = 'center'
       flexFlow = 'row wrap'
       margin = '0 10%'
       >
        <Event_details
          header = 'Good Friday'  
          sub_header = 'service:'
          sentence = 'He Died'
          date = 'Friday, 15 Apr 2022'
          time = {service.time}
          location = {service.location}
          eventData={service}
          />
          <Event_details
          header = 'EASTER' 
          sub_header= 'Celebration:' 
          sentence = 'He Lives'
          date = 'Sunday, 17 Apr 2022'
          time = {celebration.time}
          location = {celebration.location}
          eventData={celebration}
          />
        <InvitationSection />
      </HStack>
    </>
  )
}


export default InvitationContainer;
