import { Container, VStack } from '@chakra-ui/react';
import OurValues from './OurValues';
import Curriculum from './Curriculum';
import BBSchedule from './BBSchedule';
import BBFaq from './BBFaq';
import ContactUs from './ContactUs';
import BBHeroSection from './BBHeroSection';

const BBPage = () => {
  return (
    <Container maxW="container.xl" w="100%" py={{ base: '3rem', lg: '5rem' }}>
      <VStack w="100%" gap={{ base: '3rem', lg: '5rem' }}>
        <BBHeroSection />
        <OurValues />
        <Curriculum />
        <BBSchedule />
        <BBFaq />
        <ContactUs />
      </VStack>
    </Container>
  );
};

export default BBPage;
