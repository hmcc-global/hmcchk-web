import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CustomFaqAccordion from './CustomFaqAccordion';

const ConnectMinistryFaq = () => {
  const bgColor = '#DBF1F1';
  const borderColor = '#21A0A7';

  const faqData = [
    {
      title: 'When do LIFE Groups happen?',
      content: `LIFE Groups happen every Tuesday or Wednesday nights across the city and university campuses! If you would like to join us, please sign-up https://bit.ly/summerLG2024, and we will contact you shortly after.`,
    },
    {
      title:
        "Can I join Sunday Celebration/Church Events/LIFE Groups if I'm not a Christian?",
      content: `Yes! We welcome anyone to be a part of our community! If anything, we would love to meet you in person.`,
    },
    {
      title:
        "I study at a HK university and my campus doesn't have a LIFE Group, what can I do?",
      content: `You can still sign up for LIFE Group and we will contact you shortly to see how we can best accommodate your needs!`,
    },
    {
      title: 'What is the weather policy for the LIFE Group gatherings?',
      content: `In the case that extreme weather condition signals are hoisted by Hong Kong Observatory (e.g. T8/9/10), please contact the respective leader of each LIFE Group for more information.\n\nIf you’re not sure who the leader of the LIFE Group is, please contact us by dropping an email support@hongkong.hmcc.net.`,
    },
    {
      title: 'How do I learn more about the different ministries?',
      content: `To get a glimpse of what the different ministries look like, scroll up and check out the Instagram accounts of each campus ministry/ single adult (focus) ministry/ married couple (covenant) ministry. Feel free to send an Instagram direct message on the appropriate Instagram profile and/or drop an email support@hongkong.hmcc.net to learn more.`,
    },
    {
      title: 'How do I learn more about HMCC?',
      content: `Head over https://hongkong.hmcc.net/about-us to learn more about our church!`,
    },
  ];

  return (
    <Box
      display="flex"
      flexDir={'column'}
      gap={{ base: '1rem', lg: '1.5rem' }}
      w="100%"
    >
      <Heading
        as="h1"
        fontSize={{ base: '2rem', md: '2.25rem', lg: '2.625rem' }}
        fontWeight={400}
        textAlign="center"
        fontFamily="DMSerifDisplay_Italic"
        letterSpacing={'-0.1rem'}
      >
        FAQs
      </Heading>
      <CustomFaqAccordion
        data={faqData}
        borderColor={borderColor}
        bgColor={bgColor}
        width="100%"
      />
    </Box>
  );
};

export default ConnectMinistryFaq;
