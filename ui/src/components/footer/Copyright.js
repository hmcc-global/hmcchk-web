import { Text } from '@chakra-ui/layout';
import * as React from 'react';

export function Copyright() {
  return (
    <Text fontSize="sm">
      &copy; 1996-{new Date().getFullYear()} Harvest Mission Community Church.
      All rights reserved.
    </Text>
  );
}
