import React, {useState, useEffect} from "react";
import he from "he";
import { AspectRatio, Box, Button, CloseButton ,Stack, Image, UnorderedList , Text, OrderedList, ListItem } from "@chakra-ui/react";
import {DateTime} from "luxon";
import parse, { domToReact, attributesToProps } from "html-react-parser";

const UpcomingSermon = ({upcoming}) => {

  const [displayModal, setDisplayModal] = useState("");
  let today = new Date().getTime();
  let upcomingSeries = "";
  let sermonImage = "";
  let sermonDesc = "";
  if(upcoming != null){
    upcomingSeries = upcoming.filter((event) => {if(event.time == "10:00 AM") return event})[0];
    if(upcomingSeries != null){
      sermonImage = upcomingSeries.imageUrl;
      sermonDesc = upcomingSeries.description;
    }
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
      } 
    },
  };

  useEffect(() => {
    //set display to none if date +7 from start date
    if(upcomingSeries != null){
      let startDateSeconds = DateTime.fromISO(upcomingSeries.startDate).toSeconds();
      console.log(today/1000)
console.log(startDateSeconds + 7*24*3600)
      if((today/1000) >= (startDateSeconds + 7*24*3600)){
        setDisplayModal("none")
      }else
      setDisplayModal("")
    }
    
  }, [today])

  const closeModal = () => {
    setDisplayModal("none");
  }
console.log(upcomingSeries)

  return(
    <Box
      position="absolute"
      right="25px"
      height="auto"
      maxW ="md"
      width={{base:"none", md:"md"}}
      background= "#FFFFFF"
      boxShadow= "0px 3px 4px 2px rgba(0, 0, 0, 0.3)"
      borderRadius= "20px"
      display ={{base:"none", md: displayModal}}
      px={[2, 4]}
      py={[2, 4]}
      zIndex="sticky"
    >
      <Stack direction="column">
        <CloseButton alignSelf="flex-end" onClick={closeModal} size="sm" margin="0" />
        <Text color="#0628A3" fontWeight="bold">
          Upcoming Sermon Series!
        </Text>
        <Stack direction="row" >
          <AspectRatio width="45%" ratio={16 / 9}>
            <Image src={sermonImage} />
          </AspectRatio>
          <Box maxW="55%">
            <Text fontSize="sm" noOfLines={5}>
              {parse(sermonDesc, options)}
            </Text>
          </Box>
        </Stack>
        <Button alignSelf="flex-end" background="#0628A3" color="#ffffff" width="30%" backdropFilter = "blur(6px)" borderRadius= "10px">
          Learn More
        </Button>
      </Stack>
    </Box>
  );
}

export default UpcomingSermon;