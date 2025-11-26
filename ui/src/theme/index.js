import { extendTheme } from '@chakra-ui/react';
import styles from './styles.js';
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';
import fonts from './foundations/fonts';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import Button from './components/button';
// import Input from "./components/input";

const customTheme = extendTheme({
  styles,
  colors,
  textStyles,
  fonts,
  components: {
    Button,
    // Add more component overrides here as needed
  },
});

export default customTheme;
