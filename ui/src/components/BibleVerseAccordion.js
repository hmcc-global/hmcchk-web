import { getBiblePassage } from 'utils/SermonNotes';
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from 'components/chakra';
import { useTextContext } from './TipTap';
export const BibleVerseAccordion = ({ bibleVerse, actionText }) => {
  const [passage, setPassage] = useState('');
  const textPassage = useTextContext();
  useEffect(() => {
    (async () => {
      const res = await getBiblePassage(bibleVerse, textPassage);
      setPassage(res);
    })();
  }, [bibleVerse, textPassage]);
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
        <AccordionPanel pb={4} dangerouslySetInnerHTML={{ __html: passage }} />
      </AccordionItem>
    </Accordion>
  );
};
