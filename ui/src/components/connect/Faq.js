import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Link,
} from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";

const Faq = (props) => {
  // TODO: verify expand icon
  return (
    <Accordion allowMultiple allowToggle>
      <Heading as="h2" mb="4" size="2xl" fontWeight="900" textAlign="left">
        FAQs
      </Heading>
      <AccordionItem border="1px solid #E2E8F0">
        <h4>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              When do LIFE Groups happen?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h4>
        <AccordionPanel pb={4}>
          LIFE Groups happen every Tuesday or Wednesday nights across the city
          and university campuses! If you would like to join us, please sign-up{" "}
          <Link
            href="/events"
            fontStyle="italic"
            color="blue"
          >
            here
          </Link>
          , and we will contact you shortly after.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <AccordionButton fontWeight={700} fontSize="lg" p={4}>
          <Box flex="1" textAlign="left">
            Can I join Sunday Celebration/Church Events/LIFE Groups if I'm not a
            Christian?
          </Box>
          <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
        </AccordionButton>
        <AccordionPanel pb={4}>
          Yes! We welcome anyone to be a part of our community! If anything, we
          would love to meet you in person.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              I study at a HK university and my campus doesn't have a LIFE
              Group, what can I do?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          You can still sign up for LIFE Group and we will contact you shortly
          to see how we can best accommodate your needs!
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              What is the weather policy for the LIFE Group gatherings?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          In the case that extreme weather condition signals are hoisted by Hong
          Kong Observatory (e.g. T8/9/10), please contact the respective leader
          of each LIFE Group for more information.
          <br />
          <br />
          If you’re not sure who the leader of the LIFE Group is, please contact
          us by dropping an email{" "}
          <Link
            href="mailto:support@hongkong.hmcc.net"
            fontStyle="italic"
            color="blue"
          >
            here
          </Link>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              What are the current guidelines and measures taken for LIFE Group
              gatherings in light of COVID-19?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          LIFE Groups will provide online methods of participation, and will
          practice social distancing guidelines for any in-person gatherings
          (practice good hygiene, wear masks as often as possible, use of hand
          sanitizers, and washing of hands frequently).
          <br />
          <br />
          Please contact the leader of each LIFE Group for more information
          about online arrangements. If you’re not sure who the leader of the
          LIFE Group is, you can contact us by dropping an email{" "}
          <Link
            href="mailto:support@hongkong.hmcc.net"
            fontStyle="italic"
            color="blue"
          >
            here
          </Link>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              How do I learn more about the different ministries?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          To get a glimpse of what the different ministries look like, scroll up
          and check out the Instagram accounts of each campus ministry/ single
          adult (focus) ministry/ married couple (covenant) ministry. Feel free
          to send an Instagram direct message on the appropriate Instagram
          profile and/or drop an email{" "}
          <Link
            href="mailto:support@hongkong.hmcc.net"
            fontStyle="italic"
            color="blue"
          >
            here
          </Link>{" "}
          to learn more.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;
