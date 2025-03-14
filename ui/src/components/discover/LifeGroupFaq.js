import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Link,
  Heading,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const LifeGroupFaq = () => {
  const bgColor = '#F1E6E6';
  const borderColor = '#D46764';

  const faqData = [
    {
      question: 'When do LIFE Groups happen?',
      answer: (
        <>
          LIFE Groups happen every Tuesday or Wednesday nights across the city
          and university campuses! If you would like to join us, please sign-up{' '}
          <Link href="https://bit.ly/summerLG2024" color="#4A6EEB" isExternal>
            here
          </Link>
          , and we will contact you shortly after.
        </>
      ),
    },
    {
      question:
        "Can I join Sunday Celebration/Church Events/LIFE Groups if I'm not a Christian?",
      answer: (
        <>
          Yes! We welcome anyone to be a part of our community! If anything, we
          would love to meet you in person.
        </>
      ),
    },
    {
      question:
        "I study at a HK university and my campus doesn't have a LIFE Group, what can I do?",
      answer: (
        <>
          You can still sign up for LIFE Group and we will contact you shortly
          to see how we can best accommodate your needs!
        </>
      ),
    },
    {
      question: 'What is the weather policy for the LIFE Group gatherings?',
      answer: (
        <>
          In the case that extreme weather condition signals are hoisted by Hong
          Kong Observatory (e.g. T8/9/10), please contact the respective leader
          of each LIFE Group for more information.
          <br />
          <br />
          If you’re not sure who the leader of the LIFE Group is, please contact
          us by dropping an email{' '}
          <Link href="mailto:support@hongkong.hmcc.net" color="#4A6EEB">
            here
          </Link>
        </>
      ),
    },
    {
      question: 'How do I learn more about the different ministries?',
      answer: (
        <>
          To get a glimpse of what the different ministries look like, scroll up
          and check out the Instagram accounts of each campus ministry/ single
          adult (focus) ministry/ married couple (covenant) ministry. Feel free
          to send an Instagram direct message on the appropriate Instagram
          profile and/or drop an email{' '}
          <Link href="mailto:support@hongkong.hmcc.net" color="#4A6EEB">
            here
          </Link>{' '}
          to learn more.
        </>
      ),
    },
    {
      question: 'How do I learn more about HMCC?',
      answer: (
        <>
          Head over to{' '}
          <Link href="/about-us" color="#4A6EEB" id="faq-about">
            ABOUT US
          </Link>{' '}
          to learn more about our church!
        </>
      ),
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
        fontSize={{ base: '2rem', lg: '2.625rem' }}
        fontWeight={400}
        textAlign="center"
        fontFamily="DMSerifDisplay_Italic"
        letterSpacing={'-0.1rem'}
      >
        FAQs
      </Heading>
      <Accordion allowMultiple allowToggle fontFamily="Manrope" width="100%">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            borderWidth="0.5px"
            borderColor={borderColor}
          >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton
                    fontWeight={700}
                    fontSize={{ base: '0.875rem', lg: '1.25rem' }}
                    p={4}
                    bgColor={bgColor}
                    _hover={{ bgColor: bgColor }}
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      overflow="hidden"
                      whiteSpace="normal"
                    >
                      {item.question}
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  py={'1rem'}
                  fontSize={{ base: '0.875rem', lg: '1.125rem' }}
                >
                  {item.answer}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default LifeGroupFaq;
