import { Button, Link } from 'components';
import { LIFE_GROUP_SIGNUP_PATH } from 'utils/constants';

const LifeGroupSignupButton = () => {
  return (
    <Button
      as={Link}
      href={LIFE_GROUP_SIGNUP_PATH}
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
