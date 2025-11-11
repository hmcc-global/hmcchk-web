import React from 'react';
import { Button as ChakraButton, Link as ChakraLink } from '@chakra-ui/react';

/**
 * Button wrapper around Chakra's Button with ergonomic defaults.
 *
 * Props: variant, size, colorScheme, leftIcon, rightIcon, isFullWidth, as, href, isLoading, isDisabled, onClick, etc.
 */
const Button = React.forwardRef(function Button(
  { as, href, leftIcon, rightIcon, isFullWidth, children, ...rest },
  ref
) {
  const commonProps = {
    leftIcon,
    rightIcon,
    width: isFullWidth ? '100%' : undefined,
    ref,
    ...rest,
  };

  if (href) {
    return (
      <ChakraButton as={ChakraLink} href={href} {...commonProps}>
        {children}
      </ChakraButton>
    );
  }

  return (
    <ChakraButton as={as} {...commonProps}>
      {children}
    </ChakraButton>
  );
});

export default Button;
