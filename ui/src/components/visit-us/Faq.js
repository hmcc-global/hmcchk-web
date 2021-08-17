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
  return (
    <Accordion allowMultiple allowToggle>
      <Heading as="h2" mb="4" size="2xl" fontWeight="900" textAlign="left">
        FAQs
      </Heading>
      <AccordionItem border="1px solid #E2E8F0">
        <h4>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              What are your services like?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h4>
        <AccordionPanel pb={4}>
          Our services are typically about 2 hours long, and it would normally
          consist of some worship, message, and closing prayer time.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <AccordionButton fontWeight={700} fontSize="lg" p={4}>
          <Box flex="1" textAlign="left">
            Why do I need to register to come to service in-person?
          </Box>
          <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
        </AccordionButton>
        <AccordionPanel pb={4}>
          In light of current Covid-related exemption for religious gatherings,
          we would need to facilitate Sunday Celebrations on a pre-registration
          basis to ensure that we are abiding by regulations set by the
          Prevention and Control of Disease Ordinance, and ensure that everyone
          coming in-person will feel safe.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              How do I register for an in-person Sunday Celebration?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Pre-registrations for Sunday Celebration will open Mondays at 8 PM,
          and you can register by clicking on the “Sign Up for In-person Sunday
          Celebration” button above and submitting the form. You should receive
          an email confirmation shortly notifying you of a successful /{" "}
          wait-listed registration.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              What happens if I get wait-listed for my Sunday Celebration
              pre-registration?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          As pre-registrations are on a first-come-first-serve basis, we do
          apologize for the inconvenience that you may be experiencing. However,
          our lovely host team will continue to monitor registrations throughout
          the week and notify you if additional availability opens up.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              I’ve pre-registered for Sunday Celebration but can’t make it
              anymore. What should I do?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Everyone who pre-registers for Sunday Celebration should commit to
          showing up, because every slot is an opportunity for someone else to
          come join in worship. If there are any extenuating circumstances that
          prevent those pre-registered from joining in person, please notify us
          via email at hongkong@hmcc.net by the Friday (before) 11:59PM
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              What do I wear to church?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          No dress code in particular! However, we would suggest bringing a
          light/thin jacket in case you get cold in our venue.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              Is there a service available specifically for my kids?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Building Blocks is HMCC’s Children’s Ministry, specifically catered
          for kids ages 3 to 11 and with all learning needs, will take place
          alongside of our Sunday Celebrations. The children will be able to
          interact with one another and the teachers over a time of worship,
          Bible story and activities. For more information, please visit the{" "}
          <Link href="https://hongkong.hmcc.net/building-blocks/" color="blue">
            Building Block’s page
          </Link>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="1px solid #E2E8F0">
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              Would in-person service still be available under extreme weather
              conditions?
            </Box>
            <AccordionIcon as={AiFillPlusCircle} w={7} h={7} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          T9 or T10 signals hoisted by the Hong Kong Observatory: Our in-person
          gatherings will be postponed or canceled. Note that if the signal is
          lowered to T8 before or at 8:30AM on Sunday morning, we still have
          Sunday Celebration at 10AM as scheduled. Please check our website or
          social media accounts for updates regarding the latest information or
          online sermons.
          <br />
          <br />
          T8 signal hoisted by the Hong Kong Observatory: We highly value both
          personal safety as well as meeting together as the body of Christ on a
          consistent basis. Therefore, if you are able to come safely, we will
          still have our gatherings as scheduled.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;
