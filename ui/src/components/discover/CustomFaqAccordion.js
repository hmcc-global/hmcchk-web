import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Link,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const CustomFaqAccordion = ({ data, borderColor, bgColor, width }) => {
  // Function to detect email addresses
  const isEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  return (
    <Accordion allowMultiple allowToggle fontFamily="Manrope" minWidth={width}>
      {data.map((item, index) => (
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
              <AccordionPanel py={4} fontSize={['0.875rem', '1.125rem']}>
                {item.content.split('\n').map((line, i) => (
                  <Box key={i}>
                    {line.split(' ').map((word, j, words) => {
                      // Check if the word is a URL
                      if (word.startsWith('http')) {
                        return (
                          <Link key={j} href={word} isExternal color="teal.500">
                            here{' '}
                          </Link>
                        );
                      }
                      // Check if the word is an email address
                      else if (isEmail(word)) {
                        return (
                          <Link
                            key={j}
                            href={`mailto:${word}`}
                            color="teal.500"
                          >
                            {word + ' '}
                          </Link>
                        );
                      }
                      // Render regular text
                      else if (j === 0 || !words[j].startsWith('http')) {
                        return word + ' ';
                      }
                      // Skip words that are part of a URL
                      else {
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

export default CustomFaqAccordion;
