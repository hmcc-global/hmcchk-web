import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Circle
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const CustomValuesAccordion = ({ data, borderColor, width, buttonColor }) => {

  const bgColor = "#f6faff";

  return (
    <Accordion allowMultiple allowToggle fontFamily="Manrope" minWidth={width}>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          border="none"
          mb={2} // Add margin between items
          _focus={{ boxShadow: 'none' }}
        >
          {({ isExpanded }) => (
            <Box
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="md"
              overflow="hidden" // Ensures child elements respect border radius
            >
              <AccordionButton
                fontWeight={700}
                fontSize={{ base: '0.875rem', md: '1rem', lg: '1.125rem' }}
                p={4}
                _hover={{ bgColor: bgColor }}
                borderBottomRadius={isExpanded ? "0" : "md"} // Remove bottom radius when expanded
                _focus={{ 
                  boxShadow: 'none',
                  outline: 'none'
                }}
                _focusVisible={{ 
                  boxShadow: 'none',
                  outline: 'none'
                }}
              >
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  overflow="hidden"
                  whiteSpace="normal"
                  letterSpacing={"2px"}
                  fontFamily={"Manrope"}
                  pl={{base:'0', md: '1rem', lg:'2rem'}}
                >
                  {item.title}
                </Box>
                <Circle
                  size="34px" 
                  bg={buttonColor} 
                  color="black"
                  borderRadius="full" 
                >
                  {isExpanded ? (
                    <MinusIcon boxSize="15px" /> 
                  ) : (
                    <AddIcon boxSize="15px" />
                  )}
                </Circle>
              </AccordionButton>

              <AccordionPanel
                py={4}
                fontSize={{ base: '0.7rem', md: '0.8rem', lg: '0.9rem' }}
                borderTopWidth="0" 
                borderTopColor={borderColor}
                borderBottomRadius="md"
              >
                {item.content.split('\n').map((line, i) => (
                  <Box 
                    key={i} 
                    pl={{base:'0', md: '1rem', lg:'2rem'}}>
                      {line}
                  </Box>
                ))}
              </AccordionPanel>
            </Box>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomValuesAccordion;