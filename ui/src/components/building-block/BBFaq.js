import { Fade } from '@chakra-ui/react';

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CustomFaqAccordion from '../discover/CustomFaqAccordion';
import { InView } from 'react-intersection-observer';
const BBFaq = () => {
  const faqData = [
    {
      title: 'What will my child do in Building Blocks?',
      content:
        'Children will worship God, learn Biblical truths, engage in activities, and connect with friends in fun and creative ways.',
    },
    {
      title: 'What age group does Building Blocks serve?',
      content:
        'We welcome children from age 3 through grade 5 and with all learning needs as teachers differentiate instruction to make learning meaningful for everyone.',
    },
    {
      title:
        'I’m bringing my infant/toddler to church. What’s Building Blocks like for them?',
      content:
        'Currently, we do not have a program for infants and toddlers. However, we have a safe and fun space designed for them near the parent seats so you can keep an eye on them. We provide some toys and books for the children, but you are welcome to bring snacks, and toys your child likes from home.',
    },
    {
      title: 'What if my child is sick?',
      content:
        'To ensure the health of other children and teachers in the classroom, we strongly advise parents to keep their children at home if they show any symptoms of illness like coughing, a runny nose, diarrhea, vomiting, and a fever. Note that children should be fever free for 24 hours without medication before you can bring them to Building Blocks. ',
    },
    {
      title: 'How do I know my child will be safe?',
      content:
        "Your child's safety is important to us, as we understand you have entrusted your precious ones in our care. We have different structures in place for all the teachers to ensure the safety of your children: church membership; interview process; evaluation; accountability; child safety; and ongoing teacher training.",
    },
  ];

  return (
    <InView triggerOnce={true} rootMargin="-50px 0px" threshold={0.1}>
      {({ inView, ref }) => (
        <Box ref={ref} w="100%">
          <Fade in={inView} transition={{ enter: { duration: 1 } }}>
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
          </Fade>
        </Box>
      )}
    </InView>
  );
};

export default BBFaq;
