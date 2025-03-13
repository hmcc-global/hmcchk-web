import {
  Box,
  Container,
  VStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import MinistryCard from './MinistryCard';
import FaqConnect from './FaqConnect';
import BackButton from './BackButton';

const ConnectMinistry = (props) => {
  const shouldRenderBr = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });
  return (
    <Box bgColor="#F6FAFF">
      <BackButton />
      <Container maxW="container.lg" py={10} pt="60px">
        <VStack spacing={[4, 7]} align={['center']} px={['4', '0']}>
          <Text
            color="#0C0C20"
            fontFamily="DMSerifDisplay_Italic"
            fontSize={['2.25rem', '3rem', '3.75rem']} // Responsive font size
            fontWeight="400"
            lineHeight="97%"
            letterSpacing="-2px"
            textAlign={['center', 'inherit']}
          >
            Connect with Our {shouldRenderBr && <br />}Ministries
          </Text>
          <Text
            color="#0C0C20"
            fontFamily="Manrope"
            fontSize={['0.875rem', '0.9rem', '1.125rem']}
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
            maxW="950px"
            // mx="200px"
            textAlign={['center']}
          >
            At Harvest Mission Community Church, we are actively reaching out to
            people from all walks of life, specifically youths, college
            students, working adults, and families.
          </Text>

          <MinistryCard />
          <FaqConnect />
        </VStack>
      </Container>
    </Box>
  );
};

export default ConnectMinistry;
