import { VStack } from '@chakra-ui/react';
import { EasterTheme } from './EasterTheme';
import { EasterMore } from './EasterMore';

function EasterBodyMobile() {
  return (
    <VStack w={'100%'} minW={'100%'} spacing={'10px'}>
      <EasterTheme />
      <EasterMore />
    </VStack>
  );
}

export default EasterBodyMobile;
