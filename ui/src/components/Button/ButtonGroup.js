import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup as ChakraButtonGroup, Box } from '@chakra-ui/react';

const ButtonGroup = React.forwardRef(function ButtonGroup(
  { 
    children,
    variant = 'outlined',
    size = 'md',
    orientation = 'horizontal',
    spacing = 0,
    isAttached = true,
    ...rest 
  },
  ref
) {
  const getGroupStyles = () => {
    const baseStyles = {
      '& > button:not(:last-child)': {
        borderTopRightRadius: isAttached ? 0 : undefined,
        borderBottomRightRadius: isAttached ? 0 : undefined,
        ...(orientation === 'horizontal' && isAttached && {
          borderRight: variant === 'outlined' ? 'none' : undefined,
        }),
      },
      '& > button:not(:first-child)': {
        borderTopLeftRadius: isAttached ? 0 : undefined,
        borderBottomLeftRadius: isAttached ? 0 : undefined,
        ...(orientation === 'horizontal' && isAttached && variant === 'outlined' && {
          marginLeft: '-2px',
        }),
      },
      '& > button:first-child:last-child': {
        borderRadius: isAttached ? '80px' : undefined,
      },
      ...(orientation === 'vertical' && {
        '& > button:not(:last-child)': {
          borderBottomLeftRadius: isAttached ? 0 : undefined,
          borderBottomRightRadius: isAttached ? 0 : undefined,
          ...(isAttached && {
            borderBottom: variant === 'outlined' ? 'none' : undefined,
          }),
        },
        '& > button:not(:first-child)': {
          borderTopLeftRadius: isAttached ? 0 : undefined,
          borderTopRightRadius: isAttached ? 0 : undefined,
          ...(isAttached && variant === 'outlined' && {
            marginTop: '-2px',
          }),
        },
      }),
    };

    return baseStyles;
  };

  if (isAttached) {
    return (
      <Box sx={getGroupStyles()} display="inline-flex" flexDirection={orientation === 'vertical' ? 'column' : 'row'}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              variant,
              size,
              ...child.props,
            });
          }
          return child;
        })}
      </Box>
    );
  }

  return (
    <ChakraButtonGroup
      ref={ref}
      variant={variant}
      size={size}
      spacing={spacing}
      orientation={orientation}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            variant,
            size,
            ...child.props,
          });
        }
        return child;
      })}
    </ChakraButtonGroup>
  );
});

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAttached: PropTypes.bool,
};

export default ButtonGroup;