import { VStack } from '@chakra-ui/react';
import { EasterTheme } from './EasterTheme';
import { EasterMore } from './EasterMore';
import { EasterStory } from './EasterStory';

function EasterBodyMobile() {
  return (
    <VStack w={'100%'} minW={'100%'} spacing={'10px'}>
      <EasterTheme />
      <EasterStory />
      <EasterMore />
    </VStack>
  );
}

export default EasterBodyMobile;
