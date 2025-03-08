import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Link,
} from '@chakra-ui/react';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const CustomAccordion = ({ data, borderColor, bgColor, width }) => {
  return (
    <Accordion allowMultiple allowToggle fontFamily="Manrope" maxWidth={width}>
      {data.map((item, index) => (
        <AccordionItem borderWidth="0.5px" borderColor={borderColor}>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  fontWeight={700}
                  fontSize={['0.875rem', '1.25rem']}
                  p={4}
                  bgColor={bgColor}
                  _hover={{ bgColor: { bgColor } }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    overflow="hidden"
                    whiteSpace="normal"
                  >
                    {item.title}
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize={['0.875rem', '1.125rem']}>
                {item.content.split('\n').map((line, i) => (
                  <Box key={i} mb={2}>
                    {line.split(' ').map((word, j, words) => {
                      if (word.startsWith('http') && j > 0) {
                        return (
                          <Link key={j} href={word} isExternal color="teal.500">
                            here
                          </Link>
                        );
                      } else if (j === 0 || !words[j - 1].startsWith('http')) {
                        return word + ' ';
                      } else {
                        return null;
                      }
                    })}
                  </Box>
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
