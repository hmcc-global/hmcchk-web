import { 
  Button, 
  Heading, 
  Text, 
  HStack, 
  Container, 
  useMediaQuery,
  UnorderedList,
  OrderedList,
  ListItem,
  Link } from "@chakra-ui/react";
import { generateGoogleCalendarLink } from "../../helpers/eventsHelpers";
import { domToReact, attributesToProps } from "html-react-parser";

function Event_details({header , sub_header , sentence , date , time , location , eventData}) {
  let hColor , backgroundColor , borderColor , hoverColor;
  if(header == "Good Friday"){
    [hColor , backgroundColor , borderColor, hoverColor] = ["#A6657A" , "#F1D8DE" , "#C69494" , "#D28F8F"] ; 
  }
  else{
    [hColor , backgroundColor , borderColor, hoverColor] = ["#436EA0" , "#E0EDFF" , "#6E7F98" , "#7F99C0"]
  } 
  
  const options = {
    replace: (domNode) => {
      if (domNode.name === "p") {
        return <Text mb="2">{domToReact(domNode.children, options)}</Text>;
      } else if (domNode.name === "ul") {
        return (
          <UnorderedList marginInlineStart="1.25em" mb="2">
            {domToReact(domNode.children, options)}
          </UnorderedList>
        );
      } else if (domNode.name === "ol") {
        return (
          <OrderedList marginInlineStart="1.25em" mb="2">
            {domToReact(domNode.children, options)}
          </OrderedList>
        );
      } else if (domNode.name === "li") {
        return <ListItem>{domToReact(domNode.children, options)}</ListItem>;
      } else if (domNode.name === "a") {
        return (
          <Link color="teal.500" {...attributesToProps(domNode.attribs)}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
    },
  };

  return (
    <Container
      p = {4}
      m = {1}
      flex = {'1 1'}
      
    >
      <Heading 
        textTransform = {'uppercase'} 
        fontFamily= {'NextSoutherlandSerif'} 
        lineHeight = {'53.44px'} 
        fontWeight = {400} 
        fontSize = {'32px'}
        textColor = {hColor}
        >
          {header} <br/> {sub_header}
      </Heading>
      <Text 
        paddingBottom = {3} 
        fontFamily = {'Quicksand'} 
        fontSize = {20} 
        fontWeight = {400}
        lineHeight = {2}
        textColor = {hColor}
        >
          Because <u>{sentence}</u>
      </Text>

      <Text fontFamily = {'Quicksand'} lineHeight = {'25px'} fontWeight={400} fontSize={20}>{date}</Text>
      <Text fontFamily = {'Quicksand'} lineHeight = {'25px'} fontWeight={400} fontSize={20}>{time}</Text>
      <Text fontFamily = {'Quicksand'} lineHeight = {'25px'} fontWeight={400} fontSize={20}>{location}</Text>
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
          width = {'257px'}
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
  
  //const [isSmaller] = useMediaQuery('(flexFlow : row)'); 

  return (
    <>
      <HStack
       width = {'70%'}
       justifyContent = 'center'
       textAlign = 'center'
       flexFlow = 'row wrap'
       marginLeft = {'15%'}
       marginRight = {'15%'}
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
      </HStack>
    </>
  )
}

export default InvitationContainer;
