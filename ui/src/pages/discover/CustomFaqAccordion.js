import { Accordion, Box, Link, Icon } from '@chakra-ui/react';
import { LuMinus, LuPlus } from 'react-icons/lu';

const CustomFaqAccordion = ({ data, borderColor, bgColor, width }) => {
  // Function to detect email addresses
  const isEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  return (
    <Accordion.Root multiple collapsible fontFamily="Manrope" minWidth={width}>
      {data.map((item, index) => (
        <Accordion.Item key={index} borderWidth="0.5px" borderColor={borderColor} value='item-0'>
          {({ isExpanded }) => (
            <>
              <h2>
                <Accordion.ItemTrigger
                  fontWeight={700}
                  fontSize={{ base: '0.875rem', md: '1rem', lg: '1.125rem' }}
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
                    <Icon fontSize="12px" asChild><LuMinus /></Icon>
                  ) : (
                    <Icon fontSize="12px" asChild><LuPlus /></Icon>
                  )}
                </Accordion.ItemTrigger>
              </h2>
              <Accordion.ItemContent py={4} fontSize={{ base: '0.875rem', md: '1rem', lg: '1.125rem' }}><Accordion.ItemBody>
                  {item.content.split('\n').map((line, i) => (
                    <Box key={i}>
                      {line.split(' ').map((word, j, words) => {
                        // Check if the word is a URL
                        if (word.startsWith('http')) {
                          return (
                            <Link
                              key={j}
                              href={word}
                              color="teal.500"
                              target='_blank'
                              rel='noopener noreferrer'>here{' '}
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
                </Accordion.ItemBody></Accordion.ItemContent>
            </>
          )}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default CustomFaqAccordion;
