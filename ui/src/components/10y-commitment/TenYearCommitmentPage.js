import { Container, VStack } from '@chakra-ui/react';
import WaysToParticipate from './WaysToParticipate';

const TenYearCommitmentPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack direction="column" gap={10}>
        <WaysToParticipate />
      </VStack>
    </Container>
  );
};

export default TenYearCommitmentPage;