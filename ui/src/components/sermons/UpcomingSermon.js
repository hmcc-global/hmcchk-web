import React, {useState, useEffect} from "react";
import { AspectRatio, 
         Box, 
         Button, 
         CloseButton ,
         Stack, 
         Center,
         Image, 
         Text, 
} 
from "@chakra-ui/react";
import {DateTime} from "luxon";

const UpcomingSermon = ({upcoming}) => {

  const [displayModal, setDisplayModal] = useState("none");
  let today = new Date().getTime();
  let upcomingSeries = "";
  let sermonImage = "";
  let sermonDesc = "";
  let sermonTitle ="";
  if(upcoming != null){
    upcomingSeries = upcoming.filter((event) => {if(event.time == "10:00 AM" && event.title.replace(/ .*/,'')=="Sunday") return event})[0];
    if(upcomingSeries != null){
      sermonImage = upcomingSeries.imageUrl;
      sermonDesc = upcomingSeries.description;
      sermonTitle = upcomingSeries.title;
    }
  }

  useEffect(() => {
    //set display to none if date +7 from start date
    setTimeout(() => {
      if(upcoming != null && upcomingSeries != null){
        let startDateSeconds = DateTime.fromISO(upcomingSeries.startDate).toSeconds();
        if((today/1000) >= (startDateSeconds + 7*24*3600)){
          setDisplayModal("none");
        }else{
        setDisplayModal("unset");
      }
      } else {
        setDisplayModal("none");
      }
    }, 5000);
  }, [upcoming])

  useEffect(() => {
    
}, []);

  const closeModal = () => {
    setDisplayModal("none");
  }
  
  const WebView = () => {
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
        <Stack direction ="row" spacing="auto">
          <Text color="#0628A3" fontWeight="bold" fontSize="xl" marginTop="10px">
            Upcoming Sermon Series!
          </Text>
          <CloseButton onClick={closeModal} size="sm" />
        </Stack>
        <Text color="#0628A3">
          {sermonTitle}
        </Text>
        <Stack direction="row" >
          <AspectRatio width="45%" ratio={16 / 9}>
            <Image src={sermonImage} />
          </AspectRatio>
          <Box maxW="55%">
            <Text fontSize="sm" noOfLines={5} dangerouslySetInnerHTML={{__html: sermonDesc}} />
          </Box>
        </Stack>
        <Button alignSelf="flex-end" height="auto" p="2" background="#0628A3" color="#ffffff" width="30%" backdropFilter = "blur(6px)" borderRadius= "10px">
          Learn More
        </Button>
      </Stack>
    </Box>
    );
  }
  
  const MobileView = () => {
  return (
      <Box
      position="absolute"
      minH="100vh"
      height="auto"
      width ="100vw"
      background= "#FFFFFF"
      display ={{base:displayModal, md: "none"}}
      p="8"
      zIndex="sticky"
    >
      <Stack direction="column">
        
        <Stack direction="column" spacing={4}>
        <CloseButton onClick={closeModal} size="lg" alignSelf="flex-end" />
          <Text color="#0628A3" fontWeight="900" fontSize="xl" align="center">
            Upcoming Sermon Series!
          </Text>
          <Text color="#0628A3" fontSize="xl" textAlign="center">
            {sermonTitle}
          </Text>
          <AspectRatio ratio={16/9}>
            <Image src={sermonImage} />
          </AspectRatio>
          <Text textAlign="center" fontSize="sm" dangerouslySetInnerHTML={{__html: sermonDesc}} />
        </Stack>
        <Center>
        <Button width="70vw" backgroundColor="#0628A3" color="white" borderRadius="10px" marginTop="20px">
          Learn More
        </Button>
        </Center>
      </Stack>
    </Box>
  )
}
  return(
    <>
      <WebView />
      <MobileView />
    </>
  );
}

export default UpcomingSermon;