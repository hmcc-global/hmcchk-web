/**
 * Components library barrel — the single import source for UI in this app.
 *
 *   import { Box, Button, Footer } from 'components';
 *   import { ChevronLeftIcon } from 'components/icons';
 *
 * Rules (see README.md):
 * - EXPLICIT named re-exports only. Never `export *` from two sources here:
 *   colliding names would be SILENTLY dropped (undefined at runtime, no build
 *   error). Chakra v2+ adds names like `Card` that would collide with ours.
 * - Files inside src/components/ must import from './chakra' directly,
 *   never from this barrel (module-initialization cycle).
 * - Need a Chakra export that isn't listed? Add it to the list below.
 */

// ---- Chakra UI primitives (via the ./chakra boundary) ----
export {
  // Layout
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Spacer,
  Stack,
  HStack,
  VStack,
  AspectRatio,
  // Typography
  Heading,
  Text,
  // Media
  Image,
  Icon,
  // Navigation / links
  Link,
  LinkBox,
  LinkOverlay,
  // Buttons
  Button,
  ButtonGroup,
  IconButton,
  CloseButton,
  // Forms
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Textarea,
  // Data display
  Badge,
  Divider,
  List,
  ListItem,
  OrderedList,
  UnorderedList,
  Tag,
  // Feedback
  Alert,
  AlertIcon,
  Progress,
  Spinner,
  Tooltip,
  // Disclosure
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  // Overlay
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  // Transitions
  Fade,
  // Hooks
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  usePrefersReducedMotion,
  useToast,
  // Utilities / app wiring
  chakra,
  extendTheme,
  keyframes,
  ChakraProvider,
} from './chakra';

// ---- App-owned components ----
// (populated as shared components are relocated into this library)
