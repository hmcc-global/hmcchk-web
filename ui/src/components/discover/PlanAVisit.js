import {
    Box,
    Container,
    VStack,
    Text
  } from '@chakra-ui/react';
  //import FaqConnect from './FaqConnect';
  import BackButton from './BackButton';
  
  const PlanAVisit = (props) => {
    return (
      <Box>
        <BackButton />
        <Container maxW="container.lg" py={10}  pt="60px">
          <VStack align="center">
            <Text 
              color="#0C0C20"
              fontFamily="DMSerifDisplay_Italic"
              fontSize={['2rem', '3rem', '3.75rem']} // Responsive font size
              fontWeight="400"
              textAlign="center"
            >
            Plan A Visit
            </Text>
            <Text 
              color="#0C0C20"
              fontFamily="Manrope"
              fontSize={['0.85rem', '0.9rem', '1rem']}
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              // maxW="800px"
              mx="auto"
              textAlign={["center", "inherit"]}
            >
             Sunday Celebration is HMCC's weekend gathering where everyone in the church comes together to receive God's message, worship in community and enjoy fellowship. Everybody's welcome! 
             <br/> <br/> 
             Come visit us and get a taste of HMCC!            
             </Text>
          </VStack>
        </Container>
      </Box>
    );
  };
  
  export default PlanAVisit;
  