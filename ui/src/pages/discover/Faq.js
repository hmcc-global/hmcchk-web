import { Accordion, Box, Heading, Link } from '@chakra-ui/react';
import { AiFillPlusCircle } from 'react-icons/ai';

const Faq = (props) => {
  // TODO: verify expand icon
  return (
    <Accordion.Root multiple collapsible fontFamily="Manrope">
      <Heading
        as="h2"
        mb="4"
        size="2xl"
        fontWeight="900"
        textAlign="left"
        fontFamily="DMSerifDisplay_Italic"
      >
        FAQs
      </Heading>
      <Accordion.Item border="1px solid #E2E8F0" value='item-0'>
        <h4>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              When do LIFE Groups happen?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h4>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>LIFE Groups happen every Tuesday or Wednesday nights across the city
                      and university campuses! If you would like to join us, please sign-up{' '}
            <Link
              href="https://bit.ly/LGSignup-2025"
              fontStyle="italic"
              color="blue"
              target='_blank'
              rel='noopener noreferrer'>
              here
            </Link>, and we will contact you shortly after.
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-1'>
        <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
          <Box flex="1" textAlign="left">
            Can I join Sunday Celebration/Church Events/LIFE Groups if I'm not a
            Christian?
          </Box>
          <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>Yes! We welcome anyone to be a part of our community! If anything, we
                      would love to meet you in person.
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-2'>
        <h2>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              I study at a HK university and my campus doesn't have a LIFE
              Group, what can I do?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>You can still sign up for LIFE Group and we will contact you shortly
                      to see how we can best accommodate your needs!
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-3'>
        <h2>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              What is the weather policy for the LIFE Group gatherings?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>In the case that extreme weather condition signals are hoisted by Hong
                      Kong Observatory (e.g. T8/9/10), please contact the respective leader
                      of each LIFE Group for more information.
                      <br />
            <br />If you’re not sure who the leader of the LIFE Group is, please contact
                      us by dropping an email{' '}
            <Link
              href="mailto:hk@hmccglobal.org"
              fontStyle="italic"
              color="blue"
            >
              here
            </Link>
          </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-4'>
        <h2>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              How do I learn more about the different ministries?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>To get a glimpse of what the different ministries look like, scroll up
                      and check out the Instagram accounts of each campus ministry/ single
                      adult (focus) ministry/ married couple (covenant) ministry. Feel free
                      to send an Instagram direct message on the appropriate Instagram
                      profile and/or drop an email{' '}
            <Link
              href="mailto:hk@hmccglobal.org"
              fontStyle="italic"
              color="blue"
            >
              here
            </Link>{' '}to learn more.
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-5'>
        <h2>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              How do I learn more about HMCC?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>Head over to{' '}
            <Link href="/about-us" fontStyle="italic" color="blue" id="faq-about">
              ABOUT US
            </Link>{' '}to learn more about our church!
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Faq;
