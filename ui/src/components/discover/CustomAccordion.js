import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const CustomAccordion = ({ data, borderColor, bgColor, width }) => {
  return (
    <Accordion allowMultiple allowToggle fontFamily="Manrope">
      {data.map((item, index) => (
        <AccordionItem borderWidth="0.5px" borderColor={borderColor}>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  width={width}
                  fontWeight={700}
                  fontSize="lg"
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
              <AccordionPanel pb={4} width={width}>
                {item.content}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
