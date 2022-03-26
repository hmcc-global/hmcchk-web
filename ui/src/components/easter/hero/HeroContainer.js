import 'react-modal-video/scss/modal-video.scss';
import React,{Fragment, useState} from "react";
import ModalVideo from 'react-modal-video';
import { 
  Container, 
  Text, 
  Box, 
  Flex, 
  VStack, 
  Icon, 
  LinkOverlay, 
  _hover, 
  LinkBox} from "@chakra-ui/react";

 
 
const HeroContainer = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Box>
      <Box bgColor='white' height = 'auto'>
    </Box>
    
  <Box 
     
      backgroundRepeat='no-repeat'
      bgSize= '100%'
      justifyContent={'bottom'}
      height={{base:'2xl', sm:'3xl', md:'fit-content'}}
      marginTop ='10'
      bgColor='white'
      width='full'
      paddingBottom={{base:'40%',sm:'80%',md:'40%',lg:'36%'}}
      bgImage={{base: `url('${process.env.PUBLIC_URL}/images/easter/HeroLandingMobile.png')`, sm: `url('${process.env.PUBLIC_URL}/images/easter/HeroLandingBackground-min.png')`,md:`url('${process.env.PUBLIC_URL}/images/easter/HeroLandingBackground-min.png')`}}
      bgPosition='bottom'>

    <Box          
      bgImage={`url('${process.env.PUBLIC_URL}/images/easter/HeroBecauseJESUScroptransparent-min.gif')`}
      bgPosition={'center'}
      justifyContent={"center"}
      bgSize="85%"
      bgColor='none'
      height = "fit-content"
      paddingLeft = "10"
      width='100%'
      paddingBottom="10%"
      backgroundRepeat={'no-repeat'}
      display={['none','none','block']}
        >
    </Box>
      
    <Container maxW="100%" py={10}>
      <VStack spacing={[1, 1]} align="stretch">
        <Box  bgImage={`url('${process.env.PUBLIC_URL}/images/easter/HeroBecauseJESUSMobileCropped.gif')`}
            bgPosition='top'
            bgSize= '99%'
            backgroundRepeat='no-repeat'
            justifyContent={'space-between'}
            paddingRight = "30em"
            paddingLeft = "30em"
            paddingBottom='10%'
            
            px={[50, 50, 0]}
            py={[20, 100, 0]}
            mb={[8, 4, 0]}
            display={['block', 'block','none']}
        >
        </Box>
        <Box
          bgcolor='white'
          height={{md:'5%',lg:'5%'}}
        >   
        </Box> 
      
        <Flex alignContent={'center'} justifyContent={'space-between'} spacing='0px' flexDirection={{base: 'column', sm: 'column', md: 'row'}}>
          <Box 
            bg='none'
            height='4em'
            display='flex'
            paddingLeft={{base: "2%", sm: "0%",md:"8%"}}
            justifyContent={{base: 'center', sm: 'center', md: 'left'}}
            paddingBottom={{base:'10',sm:'6em'}}
            >
            <Text textStyle='NextSoutherlandSerif' fontSize={{base: 15, sm: 28}} textColor='#558EC5' paddingTop = {{base: 1.5, sm: 2.5}}>
              EASTER 
            </Text>
            <Text fontSize={{base: 23, sm:43}} textStyle='FogtwoNo5' textColor='#558EC5' justifyContent='center' paddingLeft= {{base: 1, sm: 2}} >
              2022
            </Text>
          </Box>
          <Box paddingRight = {{sm:'0',md: '10%',lg:'10%'}} display='flex' bg='none' height={{base: '2.5em', sm: '3em', md: '4em'}}  justifyContent={{base: 'center', sm: 'center', md: 'left'}} >     
              <LinkBox
                  justifyContent={{base: 'center', sm: 'center', md: 'left'}}
                  width = {{base: '30%', sm: 'center', md: 'left'}}
                  paddingLeft = {{base:"1",sm:"2"}}
                  style={{ backgroundOrigin: "border-box" }}
                  as="button"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  boxSizing="border-box"
                  borderRadius={40}
                  backgroundColor = "#FFF8F0"
                  color = "#AD8A76"
                  py={[1, 2]}
                  w={[170, 260]}
                  fontSize={["13px", "1.125em"]}
                  _hover={{color: "#FFF8F0", background: "#AD8A76", icon:"#000000"}}
                  target="_blank"
                >
                <LinkOverlay target="_blank" onClick = {()=> setOpen(true)}>
                  <Flex flexDir={'row'}>
                    <Icon viewBox="0 0 28 28" width={{base:'7',sm:'8'}} height = {{base:'7',sm:'8'}} justifyContent={'center'} paddingLeft = "2">
                      <path
                        fill='currentColor'
                        d='M14 27.3334C6.63602 27.3334 0.666687 21.364 0.666687 14C0.666687 6.63602 6.63602 0.666687 14 0.666687C21.364 0.666687 27.3334 6.63602 27.3334 14C27.3334 21.364 21.364 27.3334 14 27.3334ZM14 24.6667C16.829 24.6667 19.5421 23.5429 21.5425 21.5425C23.5429 19.5421 24.6667 16.829 24.6667 14C24.6667 11.171 23.5429 8.45794 21.5425 6.45755C19.5421 4.45716 16.829 3.33335 14 3.33335C11.171 3.33335 8.45794 4.45716 6.45755 6.45755C4.45716 8.45794 3.33335 11.171 3.33335 14C3.33335 16.829 4.45716 19.5421 6.45755 21.5425C8.45794 23.5429 11.171 24.6667 14 24.6667ZM12.1627 9.22002L18.668 13.556C18.7412 13.6047 18.8012 13.6707 18.8427 13.7482C18.8842 13.8256 18.9059 13.9121 18.9059 14C18.9059 14.0879 18.8842 14.1744 18.8427 14.2519C18.8012 14.3293 18.7412 14.3953 18.668 14.444L12.1614 18.78C12.0811 18.8332 11.988 18.8637 11.8919 18.8682C11.7957 18.8728 11.7001 18.8512 11.6152 18.8058C11.5303 18.7604 11.4593 18.6929 11.4097 18.6105C11.3601 18.528 11.3337 18.4336 11.3334 18.3374V9.66269C11.3335 9.56622 11.3599 9.47161 11.4096 9.38893C11.4593 9.30625 11.5304 9.23859 11.6156 9.19317C11.7007 9.14775 11.7965 9.12625 11.8928 9.13098C11.9892 9.13571 12.0824 9.16648 12.1627 9.22002Z'
                      />
                    </Icon>
                    <Text paddingTop = {{base:"2%",sm:"0.5", lg:"1"}} textAlign = "right" textStyle="Quicksand_bold"  fontSize="inherit" justifyContent={'center'} paddingLeft={{sm:"2.5",md:"3"}}>
                      Watch Easter Video
                    </Text>
                  </Flex>
                </LinkOverlay>
              </LinkBox>
              <ModalVideo channel='youtube' allowFullScreen = 'true' autoplay isOpen={isOpen} videoId="cD44_n7mt-o" onClose={() => setOpen(false)} />
          </Box>
        </Flex>
      </VStack>
    </Container>
    </Box>
    
  </Box>
  )
}

export default HeroContainer;
