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
import { useTextContext } from '../TipTap';
export const BibleVerseAccordion = ({ bibleVerse, actionText }) => {
  const [passage, setPassage] = useState('');
  const textPassage = useTextContext();
  (async () => {
    const res = await getBiblePassage(bibleVerse, textPassage);
    setPassage(res);
  })();
  return (
    <Accordion allowToggle>
      <AccordionItem style={{ border: 'none' }}>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontWeight={600}>
            {actionText ?? 'READ'}{' '}
            <span style={{ textDecoration: 'underline' }}>{bibleVerse}</span>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>{passage}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
