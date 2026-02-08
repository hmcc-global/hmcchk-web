import React from 'react';
import PropTypes from 'prop-types';
import { Button as ChakraButton } from '@chakra-ui/react';

const NavButton = React.forwardRef(function NavButton(
  { 
    children,
    isActive = false,
    leftIcon,
    rightIcon,
    isDisabled = false,
    href,
    onClick,
    // Single color prop for theme system
    color = 'black',
    ...rest 
  },
  ref
) {
  const getButtonStyles = () => {
    const baseStyles = {
      fontFamily: 'Manrope',
      fontWeight: 'bold',
      fontSize: '16px',
      height: '40px',
      px: '16px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      _focus: { boxShadow: 'none' },
      gap: '8px',
    };
// TODO: Compile this in the theme file.
    const stateStyles = {
      bg: isActive ? `${color}15` : 'transparent', // 15 in hex = ~8% opacity
      color: isDisabled ? 'rgba(196, 196, 196, 1)' : (isActive ? color : `${color}B3`), // B3 in hex = ~70% opacity
      _hover: isDisabled ? {} : {
        bg: `${color}15`, // 15 in hex = ~8% opacity
        color: color,
      },
      _active: {
        bg: `${color}26`, // 26 in hex = ~15% opacity
      },
    };

    return {
      ...baseStyles,
      ...stateStyles,
    };
  };

  const iconProps = {
    color: 'currentColor',
    fontSize: '16px',
  };

  if (href) {
    return (
      <ChakraButton
        ref={ref}
        as="a"
        href={href}
        leftIcon={leftIcon ? React.cloneElement(leftIcon, iconProps) : undefined}
        rightIcon={rightIcon ? React.cloneElement(rightIcon, iconProps) : undefined}
        isDisabled={isDisabled}
        onClick={onClick}
        sx={getButtonStyles()}
        {...rest}
      >
        {children}
      </ChakraButton>
    );
  }

  return (
    <ChakraButton
      ref={ref}
      leftIcon={leftIcon ? React.cloneElement(leftIcon, iconProps) : undefined}
      rightIcon={rightIcon ? React.cloneElement(rightIcon, iconProps) : undefined}
      isDisabled={isDisabled}
      onClick={onClick}
      sx={getButtonStyles()}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
});

NavButton.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  isDisabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default NavButton;