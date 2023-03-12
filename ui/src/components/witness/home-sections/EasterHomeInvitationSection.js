import React from 'react';
import {
  Container,
  Box,
  Image,
  Text,
} from '@chakra-ui/react';

const EasterHomeInvitationSection = () => {
  return (
    <Box w="100%" pt={10} pb={10}>
      <Container maxW="100%" centerContent>
        <Text
          fontFamily={'concrete_demo'}
          textColor="#FF3E02"
          fontWeight="1000"
          lineHeight="110%"
          fontSize={['30px', '40px']}
          marginBottom="15px"
          textAlign="center"
        >
          INVITE YOUR FRIENDS!
        </Text>
        <Text
          w={['80%', '60%']}
          textStyle={'dm_sans'}
          textColor="#7B0D0D"
          fontWeight="800"
          fontSize={['14px', '18px']}
          marginBottom="15px"
          textAlign="center"
        >
          Long press or right click on the image below to save this invite. Share it with your friends and loved ones!
        </Text>
        <Image
          pt={5}
          mr="auto"
          ml="auto"
          src={process.env.PUBLIC_URL + '/images/easter-2023/EASTER_2023_Invitation.jpeg'}
          w={['90%', '20%']}
        />
      </Container>
    </Box>
  );
};

export default EasterHomeInvitationSection;
