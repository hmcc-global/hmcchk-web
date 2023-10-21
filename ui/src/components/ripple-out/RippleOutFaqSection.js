import { customAxios as axios } from '../helpers/customAxios';
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
import { useEffect, useState } from 'react';

const RippleOutFaqSection = ({ headerFontSize }) => {
  const [faqs, setFaqs] = useState(null);

  useEffect(() => {
    fetchFaqData();
  }, []);

  const fetchFaqData = async () => {
    try {
      const { data } = await axios.get('/api/faq/get', {
        params: {
          pageTopic: 'ripple-out',
        },
      });
    
      if (data) {
        data.sort((a, b) => {
          return a.order - b.order;
        });
        setFaqs(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
                      {faqs && faqs[0].question}
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
                  {faqs && faqs[0].answer}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {faqs &&
            faqs.slice(1, faqs.length - 1).map((item, index) => (
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
                          {item.question}
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
                      {item.answer}
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
                      {faqs && faqs[faqs.length - 1].question}
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
                  {faqs && faqs[faqs.length - 1].answer}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Flex>
    </Container>
  );
};

export default RippleOutFaqSection;