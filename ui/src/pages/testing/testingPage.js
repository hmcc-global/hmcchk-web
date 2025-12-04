import React from 'react';
import { CustomAccordion } from '../../components';
import { Box, Container } from '@chakra-ui/react';

const TestingPage = () => {
  const bgColor = '#DBF1F1';
  const borderColor = '#21A0A7';

  const Data = [
    {
      title:
        "Can I join Sunday Celebration/Church Events/LIFE Groups if I'm not a Christian?",
      content: `Yes! We welcome anyone to be a part of our community! If anything, we would love to meet you in person.`,
    },
    {
      title: 'How do I learn more about the different ministries?',
      content: `To get a glimpse of what the different ministries look like, scroll up and check out the Instagram accounts of each campus ministry/ single adult (focus) ministry/ married couple (covenant) ministry. Feel free to send an Instagram direct message on the appropriate Instagram profile and/or drop an email hk@hmccglobal.org to learn more.`,
    },
    {
      title: 'How do I learn more about HMCC?',
      content: `Head over https://hk.hmccglobal.org/about-us to learn more about our church!`,
    },
  ];

  return (

    <Container maxW="container.xl">
      <Box
        display="flex"
        flexDir={'column'}
        gap={{ base: '1rem', lg: '1.5rem' }}
        w="100%"
      >
        <CustomAccordion
          data={Data}
          borderColor={borderColor}
          bgColor={bgColor}
          width="100%"
        />
      </Box>
    </Container>
    
  );
};

export default TestingPage
;
