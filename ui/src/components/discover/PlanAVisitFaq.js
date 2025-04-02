import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CustomFaqAccordion from './CustomFaqAccordion';

const PlanAVisitFaq = () => {
  const faqData = [
    {
      title: 'What are your services like?',
      content:
        'Our services are typically about 2 hours long, and it would normally consist of some worship, message, and closing prayer time.',
    },
    {
      title: 'What do I wear to church?',
      content:
        'No dress code in particular! However, we would suggest bringing a light/thin jacket in case you get cold in our venue.',
    },
    {
      title: 'Is there a service available specifically for my kids?',
      content:
        'Building Blocks is HMCC’s Children’s Ministry, specifically catered for kids ages 3 to 11 and with all learning needs, will take place alongside of our Sunday Celebrations. The children will be able to interact with one another and the teachers over a time of worship, Bible story and activities. For more information, please visit the Building Block’s page https://hongkong.sub.hmcc.net/building-blocks/',
    },
    {
      title:
        'Would in-person service still be available under extreme weather conditions?',
      content:
        'T9 or T10 signals hoisted by the Hong Kong Observatory: Our in-person gatherings will be postponed or canceled. Note that if the signal is lowered to T8 before or at 8:30AM on Sunday morning, we still have Sunday Celebration at 10AM as scheduled. Please check our website or social media accounts for updates regarding the latest information or online sermons. \nT8 signal hoisted by the Hong Kong Observatory: We highly value both personal safety as well as meeting together as the body of Christ on a consistent basis. Therefore, if you are able to come safely, we will still have our gatherings as scheduled.',
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
        borderColor="#EBAC09"
        bgColor="#F5F0E0"
        width="100%"
      />
    </Box>
  );
};

export default PlanAVisitFaq;
