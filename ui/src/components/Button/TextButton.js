import React from 'react';
import PropTypes from 'prop-types';
import { Button as ChakraButton } from '@chakra-ui/react';

const ArrowIcon = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7C10.91 5.09 10.91 5.72 11.3 6.11L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z"
      fill="currentColor"
    />
  </svg>
);

const TextButton = React.forwardRef(function TextButton(
  { 
    children,
    variant = 'filled',
    leftIcon,
    rightIcon,
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
      borderRadius: '80px',
      transition: 'all 0.2s',
      _focus: { boxShadow: 'none' },
    };
// TODO: Compile this in the theme file.
    const sizeStyles = {
      sm: {
        height: '44px',
        px: leftIcon || rightIcon ? (leftIcon ? '30px' : '40px') : '40px',
        pr: leftIcon || rightIcon ? (rightIcon ? '30px' : '40px') : '40px',
        fontSize: '14px',
        gap: '20px',
      },
      md: {
        height: '55px',
        px: leftIcon || rightIcon ? (leftIcon ? '30px' : '40px') : '40px',
        pr: leftIcon || rightIcon ? (rightIcon ? '30px' : '40px') : '40px',
        fontSize: '18px',
        gap: '20px',
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

  const iconProps = {
    color: 'currentColor',
    fontSize: '16px',
  };

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

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  isDisabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md']),
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default TextButton;
export { ArrowIcon };