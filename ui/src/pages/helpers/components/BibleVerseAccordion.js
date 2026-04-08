import { getBiblePassage } from '../SermonNotes';
import React, { useState } from 'react';
import { Accordion, Box } from '@chakra-ui/react';
import { useTextContext } from '../TipTap';
export const BibleVerseAccordion = ({ bibleVerse, actionText }) => {
  const [passage, setPassage] = useState('');
  const textPassage = useTextContext();
  (async () => {
    const res = await getBiblePassage(bibleVerse, textPassage);
    setPassage(res);
  })();
  return (
    <Accordion.Root collapsible>
      <Accordion.Item style={{ border: 'none' }} value='item-0'>
        <Accordion.ItemTrigger>
          <Box as="span" flex="1" textAlign="left" fontWeight={600}>
            {actionText ?? 'READ'}{' '}
            <span style={{ textDecoration: 'underline' }}>{bibleVerse}</span>
          </Box>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent pb={4} dangerouslySetInnerHTML={{ __html: passage }}><Accordion.ItemBody></Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};
