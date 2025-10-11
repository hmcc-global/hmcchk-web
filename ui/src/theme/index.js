import { extendTheme } from "@chakra-ui/react";
import styles from "./styles.js";
import colors from "./foundations/colors";
import textStyles from "./foundations/textStyles"
import fonts from "./foundations/fonts";
// import Button from "./components/button";
// import Input from "./components/input";

const customTheme = extendTheme({
  styles,
  colors,
  textStyles,
  fonts
//   components: {
//     Button,
//     Input,
//     // Add more components as needed
//   },
});

export default customTheme;