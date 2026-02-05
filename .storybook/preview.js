import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../ui/src/theme';

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: 'light',
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a202c',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider theme={customTheme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;