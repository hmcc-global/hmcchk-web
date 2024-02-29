import { VStack } from '@chakra-ui/react';
import { EasterTheme } from './EasterTheme';
import { EasterMore } from './EasterMore';
import { EasterStory } from './EasterStory';
import EasterEvents from './EasterEvents';

function EasterBodyMobile() {
  return (
    <VStack w={'90%'} minW={'90%'} spacing={'10px'} m="auto">
      <EasterTheme />
      <EasterStory />
      <EasterEvents />
      <EasterMore />
    </VStack>
  );
}

export default EasterBodyMobile;
