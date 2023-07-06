import { useMediaQuery } from '@chakra-ui/react';

import FooterMobile from './FooterMobile';
import FooterDesktop from './FooterDesktop';

const FooterContainer = (props) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  return <>{isLargerThan768 ? <FooterDesktop /> : <FooterMobile />}</>;
};

export default FooterContainer;
