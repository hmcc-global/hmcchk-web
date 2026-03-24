import { Accordion, Box, Heading, Link } from '@chakra-ui/react';
import { AiFillPlusCircle } from 'react-icons/ai';

const Faq = (props) => {
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
              What are your services like?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h4>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>Our services are typically about 2 hours long, and it would normally
                      consist of some worship, message, and closing prayer time.
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-1'>
        <h2>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              What do I wear to church?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>No dress code in particular! However, we would suggest bringing a
                      light/thin jacket in case you get cold in our venue.
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-2'>
        <h2>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              Is there a service available specifically for my kids?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>Building Blocks is HMCC’s Children’s Ministry, specifically catered
                      for kids ages 3 to 11 and with all learning needs, will take place
                      alongside of our Sunday Celebrations. The children will be able to
                      interact with one another and the teachers over a time of worship,
                      Bible story and activities. For more information, please visit the{' '}
            <Link href="/building-blocks" color="#0E66CC">
              Building Block’s page
            </Link>
          </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item border="1px solid #E2E8F0" value='item-3'>
        <h2>
          <Accordion.ItemTrigger fontWeight={700} fontSize="lg" p={4}>
            <Box flex="1" textAlign="left">
              Would in-person service still be available under extreme weather
              conditions?
            </Box>
            <Accordion.ItemIndicator w={7} h={7} asChild><AiFillPlusCircle /></Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent pb={4}><Accordion.ItemBody>T9 or T10 signals hoisted by the Hong Kong Observatory: Our in-person
                      gatherings will be postponed or canceled. Note that if the signal is
                      lowered to T8 before or at 8:30AM on Sunday morning, we still have
                      Sunday Celebration at 10AM as scheduled. Please check our website or
                      social media accounts for updates regarding the latest information or
                      online sermons.
                      <br />
            <br />T8 signal hoisted by the Hong Kong Observatory: We highly value both
                      personal safety as well as meeting together as the body of Christ on a
                      consistent basis. Therefore, if you are able to come safely, we will
                      still have our gatherings as scheduled.
                    </Accordion.ItemBody></Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Faq;
