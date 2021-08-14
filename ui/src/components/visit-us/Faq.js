import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";

const Faq = (props) => {
  return (
    <Accordion allowMultiple allowToggle>
      <Heading as="h2" mb="4" size="2xl" fontWeight="900" textAlign="left">
        FAQs
      </Heading>
      <AccordionItem border="1px solid #E2E8F0">
        <h4>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              How does registration work?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h4>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <AccordionButton fontWeight={700} fontSize="lg" p={4}>
          <Box flex="1" textAlign="left">
            What do I wear to church?
          </Box>
          <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
        </AccordionButton>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              COVID-19 guidelines
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              Weather guidelines
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;
