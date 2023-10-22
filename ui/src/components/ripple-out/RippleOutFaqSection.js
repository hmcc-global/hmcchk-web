import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import faqContent from './faqContent.json';
import { fontColor, headerFontSize } from './RippleOutTextStyle';

const RippleOutFaqSection = () => {
  return (
    <Flex
      minH="100%"
      flexDir="column"
      bgColor="#C9DDED"
      py={['1.8em', '4em']}
      color={fontColor}
    >
      <Container maxW={['container.xl']} h="100%" textStyle="darker_grotesque">
        <Flex flexDir="column" gap={3}>
          <Text
            fontSize={headerFontSize}
            textStyle="darker_grotesque_black"
            color="#182E57"
            lineHeight="0.9em"
          >
            FAQ
          </Text>
          <Accordion allowMultiple allowToggle fontSize="lg" borderRadius="2xl">
            <AccordionItem borderTopRadius="2xl">
              {({ isExpanded }) => (
                <>
                  <h4>
                    <AccordionButton
                      textStyle="darker_grotesque_bold"
                      fontSize="lg"
                      p={3}
                      bg="#34486F"
                      color="#ffffff"
                      _hover={{
                        bg: 'rgba(52, 72, 111, 0.8)',
                        color: '#ffffff',
                      }}
                      borderTopRadius="2xl"
                    >
                      <Box flex="1" textAlign="left">
                        {faqContent[0].title}
                      </Box>
                      {isExpanded ? (
                        <AccordionIcon as={AiOutlineMinus} w={5} h={5} />
                      ) : (
                        <AccordionIcon as={AiOutlinePlus} w={5} h={5} />
                      )}
                    </AccordionButton>
                  </h4>
                  <AccordionPanel
                    pb={2}
                    border="1px solid #34486F"
                    bg="#FFFBEF"
                    whiteSpace="pre-wrap"
                  >
                    {faqContent[0].content}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            {faqContent.slice(1, 9).map((item, index) => (
              <AccordionItem key={'faq' + index}>
                {({ isExpanded }) => (
                  <>
                    <h4>
                      <AccordionButton
                        textStyle="darker_grotesque_bold"
                        fontSize="lg"
                        p={3}
                        bg="#34486F"
                        color="#ffffff"
                        _hover={{
                          bg: 'rgba(52, 72, 111, 0.8)',
                          color: '#ffffff',
                        }}
                      >
                        <Box flex="1" textAlign="left">
                          {item.title}
                        </Box>
                        {isExpanded ? (
                          <AccordionIcon as={AiOutlineMinus} w={5} h={5} />
                        ) : (
                          <AccordionIcon as={AiOutlinePlus} w={5} h={5} />
                        )}
                      </AccordionButton>
                    </h4>
                    <AccordionPanel
                      pb={2}
                      border="1px solid #34486F"
                      bg="#FFFBEF"
                      whiteSpace="pre-wrap"
                    >
                      {item.content}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}

            <AccordionItem borderBottomRadius="2xl">
              {({ isExpanded }) => (
                <>
                  <h4>
                    <AccordionButton
                      textStyle="darker_grotesque_bold"
                      fontSize="lg"
                      borderBottomRadius={isExpanded ? 'none' : '2xl'}
                      p={3}
                      bg="#34486F"
                      color="#ffffff"
                      _hover={{
                        bg: 'rgba(52, 72, 111, 0.8)',
                        color: '#ffffff',
                      }}
                      borderTop="0px"
                    >
                      <Box flex="1" textAlign="left">
                        {faqContent[9].title}
                      </Box>
                      {isExpanded ? (
                        <AccordionIcon as={AiOutlineMinus} w={5} h={5} />
                      ) : (
                        <AccordionIcon as={AiOutlinePlus} w={5} h={5} />
                      )}
                    </AccordionButton>
                  </h4>
                  <AccordionPanel
                    pb={2}
                    border="1px solid #34486F"
                    borderBottomRadius="2xl"
                    bg="#FFFBEF"
                    whiteSpace="pre-wrap"
                  >
                    {faqContent[9].content}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
      </Container>
    </Flex>
  );
};

export default RippleOutFaqSection;
