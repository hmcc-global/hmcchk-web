import {
  Box,
} from '@chakra-ui/react';
import { Container, VStack } from '@chakra-ui/react';
import OurValues from './OurValues';
import Curriculum from './Curriculum';
import BBSchedule from './BBSchedule';
import BBFaq from './BBFaq';
import ContactUs from './ContactUs';

const BBPage = () => {
  return (
    <Container minW="100%" py={{ base: '4rem', lg: '5rem' }}>
      <VStack w="100%" gap={{ base: '3rem', lg: '5rem' }}>
        <OurValues />
        <Curriculum />
        <BBSchedule />
        <BBFaq/>
        <ContactUs/>
      </VStack>
    </Container>
  );
};

export default BBPage;
