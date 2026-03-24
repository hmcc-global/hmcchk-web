'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode'
import customTheme from '../../theme'

export function Provider(props) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
