import { mode } from '@chakra-ui/theme-tools';

const buttonTheme = {
  baseStyle: {
    borderRadius: 'full',
    fontWeight: 700,
    _focus: { boxShadow: 'outline' },
    _disabled: { opacity: 0.6, cursor: 'not-allowed' },
  },
  sizes: {
    sm: { px: 4, py: 2, fontSize: 'sm' },
    md: { px: 6, py: 3, fontSize: 'md' },
    lg: { px: 8, py: 4, fontSize: 'lg' },
  },
  variants: {
    solid: (props) => {
      // Our theme defines single-stop tokens (e.g. primary.1). Use .1 by default
      const getTokenForScheme = (scheme) => {
        switch (scheme) {
          case 'red':
            return 'additional.1';
          case 'yellow':
            return 'primary.3';
          case 'blue':
          case 'default':
          default:
            return 'primary.1';
        }
      };

      const token = getTokenForScheme(props.colorScheme);
      const bgColor = mode(`${token}`, `${token}`)(props);
      return {
        bg: bgColor,
        color: mode('white', 'gray.800')(props),
        _hover: {
          bg: bgColor,
          opacity: 0.9,
        },
      };
    },
    outline: (props) => {
      const getTokenForScheme = (scheme) => {
        switch (scheme) {
          case 'red':
            return 'additional.1';
          case 'yellow':
            return 'primary.3';
          case 'blue':
          case 'default':
          default:
            return 'primary.1';
        }
      };

      const token = getTokenForScheme(props.colorScheme);
      const borderColor = mode(`${token}`, `${token}`)(props);
      return {
        bg: 'transparent',
        border: '1px solid',
        borderColor,
        color: borderColor,
        _hover: {
          bg: borderColor,
          color:
            props.isDisabled || props['aria-disabled'] ? borderColor : 'white',
        },
      };
    },
    ghost: (props) => ({
      bg: 'transparent',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      _hover: { bg: mode('gray.50', 'whiteAlpha.50')(props) },
    }),
    link: (props) => {
      const getTokenForScheme = (scheme) => {
        switch (scheme) {
          case 'red':
            return 'additional.1';
          case 'yellow':
            return 'primary.3';
          case 'blue':
          case 'default':
          default:
            return 'primary.1';
        }
      };

      const token = getTokenForScheme(props.colorScheme);
      const linkColor = mode(`${token}`, `${token}`)(props);
      return {
        bg: 'transparent',
        color: linkColor,
        padding: 0,
        height: 'auto',
        _hover: { textDecoration: 'underline' },
      };
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'primary',
  },
};

export default buttonTheme;
