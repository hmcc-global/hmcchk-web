import {
  Box,
  Container,
  VStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import MinistryCard from './MinistryCard';
import ConnectMinistryFaq from './ConnectMinistryFaq';
import BackButton from './DiscoverBackButton';

const ConnectMinistry = () => {
  const shouldRenderBr = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });
  return (
    <Box bgColor="#F6FAFF">
      <BackButton />
      <Container maxW="container.xl" py={{ base: '4rem', lg: '5rem' }}>
        <Box
          id="connect-ministries"
          display="flex"
          flexDir={'column'}
          alignItems={'center'}
          gap={{ base: '1.75rem', md: '2.5rem', lg: '4rem' }}
        >
          <VStack
            maxWidth={{ base: '95%', lg: '75%' }}
            spacing={{ base: '1rem', lg: '1.5rem' }}
          >
            <Text
              color="#0C0C20"
              fontSize={{ base: '2.25rem', md: '3rem', lg: '3.75rem' }}
              fontWeight={400}
              textAlign="center"
              fontFamily="DMSerifDisplay_Italic"
              letterSpacing={'-0.1rem'}
            >
              Connect with Our {shouldRenderBr && <br />}Ministries
            </Text>
            <Text
              fontSize={{ base: '0.875rem', md: '1rem', lg: '1.125rem' }}
              textAlign={'center'}
              fontFamily={'Manrope'}
            >
              At Harvest Mission Community Church, we are actively reaching out
              to people from all walks of life, specifically youths, college
              students, working adults, and families.
            </Text>
          </VStack>
          <MinistryCard />
          <ConnectMinistryFaq />
        </Box>
      </Container>
    </Box>
  );
};

export default ConnectMinistry;
