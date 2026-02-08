import React from 'react';
import PropTypes from 'prop-types';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

const IconButton = React.forwardRef(function IconButton(
  { 
    icon,
    'aria-label': ariaLabel,
    variant = 'filled',
    isDisabled = false,
    size = 'md',
    onClick,
    // Single color prop for theme system
    color = '#090500',
    ...rest 
  },
  ref
) {
  const getButtonStyles = () => {
    const baseStyles = {
      fontFamily: 'Manrope',
      fontWeight: 'bold',
      borderRadius: '50%',
      transition: 'all 0.2s',
      _focus: { boxShadow: 'none' },
    };
// TODO: Compile this in the theme file.
    const sizeStyles = {
      sm: {
        width: '44px',
        height: '44px',
        minW: '44px',
        fontSize: '16px',
      },
      md: {
        width: '55px',
        height: '55px',
        minW: '55px',
        fontSize: '20px',
      },
    };
// TODO: Compile this in the theme file.
    const variantStyles = {
      filled: {
        bg: isDisabled ? 'rgba(158, 158, 158, 0.2)' : color,
        color: isDisabled ? 'rgba(0, 0, 0, 0.2)' : 'white',
        border: 'none',
        _hover: isDisabled ? {} : {
          filter: 'brightness(0.9)',
        },
      },
      outlined: {
        bg: 'transparent',
        color: isDisabled ? 'rgba(0, 0, 0, 0.2)' : color,
        border: '2px solid',
        borderColor: isDisabled ? 'rgba(158, 158, 158, 0.2)' : color,
        _hover: isDisabled ? {} : {
          bg: color,
          color: 'white',
        },
      },
      ghost: {
        bg: 'transparent',
        color: isDisabled ? 'rgba(0, 0, 0, 0.2)' : color,
        border: 'none',
        _hover: isDisabled ? {} : {
          bg: `${color}15`, // 15 in hex = ~8% opacity
        },
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <ChakraIconButton
      ref={ref}
      icon={icon}
      aria-label={ariaLabel}
      isDisabled={isDisabled}
      onClick={onClick}
      sx={getButtonStyles()}
      {...rest}
    />
  );
});

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  'aria-label': PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  isDisabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md']),
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default IconButton;