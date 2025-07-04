import { Container, VStack } from '@chakra-ui/react';
import OurValues from './OurValues';
import Curriculum from './Curriculum';

const BBPage = () => {
  return (
    <Container w="100%">
      <VStack w="100%">
        <OurValues />
        <Curriculum />
      </VStack>
    </Container>
  );
};

export default BBPage;
