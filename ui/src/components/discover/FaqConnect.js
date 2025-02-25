import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Link,
} from '@chakra-ui/react';
import { LuPlus, LuMinus } from "react-icons/lu";

const FaqConnect = (props) => {
  // TODO: verify expand icon
  return (
    <Accordion allowMultiple allowToggle fontFamily="Manrope">
      <Text
        mb="4"
        fontSize={['1.5rem', '2.7rem', '3rem']}
        textAlign="center"
        fontFamily="DMSerifDisplay_Italic"
      >
        FAQs
      </Text>
      <AccordionItem 
        border={["0.5px solid #21A0A7"]}
      >
        {({isExpanded }) => ( // Destructure isExpanded here
        <> 
        <h4>
          <AccordionButton fontWeight={700} fontSize="lg" p={4} bg={["#DBF1F1"]}>
            <Box 
              flex="1" 
              textAlign="left" 
              fontSize={['0.95rem', '1rem', '1.1rem']}
              fontFamily={"Manrope"}
            >
              When do LIFE Groups happen?
            </Box>
            {isExpanded ? (
              <AccordionIcon as={LuMinus}  size="24px" />
            ) : (
              <AccordionIcon as={LuPlus}  size="24px" />
            )}
          </AccordionButton>
        </h4>
        <AccordionPanel 
          pb={4}
          borderTop={["1.5px solid #21A0A7"]}
          bg={"white"}
          fontFamily={"Manrope"}
          fontSize={['0.95rem', '1rem', '1.1rem']}
        >
          LIFE Groups happen every Tuesday or Wednesday nights across the city
          and university campuses! If you would like to join us, please sign-up{' '}
          <Link
            href="https://bit.ly/summerLG2024"
            fontStyle="italic"
            color="blue"
            isExternal
          >
            here
          </Link>
          , and we will contact you shortly after.
        </AccordionPanel>
        </>
        )}
      </AccordionItem>

      <AccordionItem 
        border={["0.5px solid #21A0A7"]}
      >
        {({isExpanded }) => ( // Destructure isExpanded here
        <> 
        <AccordionButton fontWeight={700} fontSize="lg" p={4} bg={["#DBF1F1"]}>
            <Box 
              flex="1" 
              textAlign="left" 
              fontSize={['0.95rem', '1rem', '1.1rem']}
              fontFamily={"Manrope"}
            >
            Can I join Sunday Celebration/Church Events/LIFE Groups if I'm not a
            Christian?
          </Box>
          {isExpanded ? (
              <AccordionIcon as={LuMinus}  size="24px" />
            ) : (
              <AccordionIcon as={LuPlus}  size="24px" />
            )}
        </AccordionButton>
        <AccordionPanel 
          pb={4}
          borderTop={["1.5px solid #21A0A7"]}
          bg={"white"}
          fontFamily={"Manrope"}
          fontSize={['0.95rem', '1rem', '1.1rem']}
        >
          Yes! We welcome anyone to be a part of our community! If anything, we
          would love to meet you in person.
        </AccordionPanel>

        </>
        )}
      </AccordionItem>

      <AccordionItem 
        border={["0.5px solid #21A0A7"]}
      >
        {({isExpanded }) => ( // Destructure isExpanded here
        <> 
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4} bg={["#DBF1F1"]}>
            <Box 
              flex="1" 
              textAlign="left" 
              fontSize={['0.95rem', '1rem', '1.1rem']}
              fontFamily={"Manrope"}
            >
              I study at a HK university and my campus doesn't have a LIFE
              Group, what can I do?
            </Box>
            {isExpanded ? (
              <AccordionIcon as={LuMinus}  size="24px" />
            ) : (
              <AccordionIcon as={LuPlus}  size="24px" />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel 
          pb={4}
          borderTop={["1.5px solid #21A0A7"]}
          bg={"white"}
          fontFamily={"Manrope"}
          fontSize={['0.95rem', '1rem', '1.1rem']}
        >
          You can still sign up for LIFE Group and we will contact you shortly
          to see how we can best accommodate your needs!
        </AccordionPanel>

        </>
        )}
      </AccordionItem>

      <AccordionItem 
        border={["0.5px solid #21A0A7"]}
      >
        {({isExpanded }) => ( // Destructure isExpanded here
        <> 
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4} bg={["#DBF1F1"]}>
            <Box 
              flex="1" 
              textAlign="left" 
              fontSize={['0.95rem', '1rem', '1.1rem']}
              fontFamily={"Manrope"}
            >
              What is the weather policy for the LIFE Group gatherings?
            </Box>
            {isExpanded ? (
              <AccordionIcon as={LuMinus}  size="24px" />
            ) : (
              <AccordionIcon as={LuPlus}  size="24px" />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel 
          pb={4}
          borderTop={["1.5px solid #21A0A7"]}
          bg={"white"}
          fontFamily={"Manrope"}
          fontSize={['0.95rem', '1rem', '1.1rem']}
        >
          In the case that extreme weather condition signals are hoisted by Hong
          Kong Observatory (e.g. T8/9/10), please contact the respective leader
          of each LIFE Group for more information.
          <br />
          <br />
          If you’re not sure who the leader of the LIFE Group is, please contact
          us by dropping an email{' '}
          <Link
            href="mailto:support@hongkong.hmcc.net"
            fontStyle="italic"
            color="blue"
          >
            here
          </Link>
        </AccordionPanel>

        </>
        )}
      </AccordionItem>

      <AccordionItem 
        border={["0.5px solid #21A0A7"]}
      >
        {({isExpanded }) => ( // Destructure isExpanded here
        <> 
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4} bg={["#DBF1F1"]}>
            <Box 
              flex="1" 
              textAlign="left" 
              fontSize={['0.95rem', '1rem', '1.1rem']}
              fontFamily={"Manrope"}
            >
              How do I learn more about the different ministries?
            </Box>
            {isExpanded ? (
              <AccordionIcon as={LuMinus}  size="24px" />
            ) : (
              <AccordionIcon as={LuPlus}  size="24px" />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel 
          pb={4}
          borderTop={["1.5px solid #21A0A7"]}
          bg={"white"}
          fontFamily={"Manrope"}
          fontSize={['0.95rem', '1rem', '1.1rem']}
        >
          To get a glimpse of what the different ministries look like, scroll up
          and check out the Instagram accounts of each campus ministry/ single
          adult (focus) ministry/ married couple (covenant) ministry. Feel free
          to send an Instagram direct message on the appropriate Instagram
          profile and/or drop an email{' '}
          <Link
            href="mailto:support@hongkong.hmcc.net"
            fontStyle="italic"
            color="blue"
          >
            here
          </Link>{' '}
          to learn more.
        </AccordionPanel>

        </>
        )}
      </AccordionItem>

      <AccordionItem 
        border={["0.5px solid #21A0A7"]}
      >
        {({isExpanded }) => ( // Destructure isExpanded here
        <> 
        <h2>
          <AccordionButton fontWeight={700} fontSize="lg" p={4} bg={["#DBF1F1"]}>
            <Box 
              flex="1" 
              textAlign="left" 
              fontSize={['0.95rem', '1rem', '1.1rem']}
              fontFamily={"Manrope"}
            >
              How do I learn more about HMCC?
            </Box>
            {isExpanded ? (
              <AccordionIcon as={LuMinus}  size="24px" />
            ) : (
              <AccordionIcon as={LuPlus}  size="24px" />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel 
          pb={4}
          borderTop={["1.5px solid #21A0A7"]}
          bg={"white"}
          fontFamily={"Manrope"}
          fontSize={['0.95rem', '1rem', '1.1rem']}
        >
          Head over to{' '}
          <Link href="/about-us" fontStyle="italic" color="blue" id="faq-about">
            ABOUT US
          </Link>{' '}
          to learn more about our church!
        </AccordionPanel>

        </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default FaqConnect;
