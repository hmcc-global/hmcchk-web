import { Center, Box } from '@chakra-ui/react';

const BecauseJesusAnimation = () => {
  return (
    <Center>
      <Box
        bgImage={`url('${process.env.PUBLIC_URL}/images/easter/because-jesus-animation.gif')`}
        backgroundRepeat={'no-repeat'}
        bgSize="cover"
        w={['20em', '30em']}
        h={['20em', '30em']}
        display="block"
      ></Box>
    </Center>
  );
};
export default BecauseJesusAnimation;
