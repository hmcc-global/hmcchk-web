import { Button, Link, useMediaQuery } from '@chakra-ui/react';

const LifeGroupSignupButton = () => {
  return (
    <Button
      as={Link}
      href="https://bit.ly/summerLG2025"
      borderRadius={'0.9375rem'}
      bgColor="#D46764"
      py={'1.75rem'}
      px={'1.75rem'}
      fontSize={{ base: '0.875rem', lg: '1rem' }}
      fontWeight="700"
      _hover={{ boxShadow: 'none' }}
      letterSpacing={'0.25rem'}
      color={'#F6FAFF'}
      fontFamily={'Manrope'}
    >
      SIGN UP FOR LIFE GROUP
    </Button>
  );
};

export default LifeGroupSignupButton;
