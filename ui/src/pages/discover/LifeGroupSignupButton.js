import { Button, Link } from '@chakra-ui/react';

const LifeGroupSignupButton = () => {
  return (
    <Button
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
      asChild><Link href="https://bit.ly/LGSignup-2025">SIGN UP FOR LIFE GROUP
            </Link></Button>
  );
};

export default LifeGroupSignupButton;
