import { Container, VStack } from '@chakra-ui/react';
import Curriculum from './Curriculum';

const BBPage = () => {
  return (
    <Container w="100%">
      <VStack w="100%">
        <Curriculum />
      </VStack>
    </Container>
  );
};

export default BBPage;
