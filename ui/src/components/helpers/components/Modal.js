import { getBiblePassage } from '../SermonNotes';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
export const BibleVerseAccordion = ({ bibleVerse }) => {
  const [passage, setPassage] = useState('');
  (async () => {
    const res = await getBiblePassage(bibleVerse);
    setPassage(res);
  })();

  return (
    <Accordion allowToggle>
      <AccordionItem style={{ border: 'none' }}>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            READ{' '}
            <span style={{ textDecoration: 'underline' }}>{bibleVerse}</span>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>{passage}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
