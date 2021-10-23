import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

const LinkItems = [
  { name: "Home", icon: FiHome, path: "/admin/home" },
  {
    name: "Users",
    icon: FiTrendingUp,
    path: "/admin/users",
  },
  { name: "Forms", icon: FiCompass, path: "/admin/forms" },
  { name: "Giving", icon: FiStar, path: "/admin/giving" },
  { name: "Settings", icon: FiSettings, path: "/admin/settings" },
  {
    name: "Log Out",
    icon: FiSettings,
    path: "/admin/logout",
  },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const { toggleColorMode } = useColorMode();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          HMCC-HK
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={link.path}
          component={link.component}
        >
          {link.name}
        </NavItem>
      ))}
      <Button mx={10} onClick={toggleColorMode}>
        Toggle Color Mode
      </Button>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href={rest.path}
      style={{ textDecoration: "none" }}
      component={rest.component}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        HMCC-HK
      </Text>
    </Flex>
  );
};

export default function SidebarWithHeader(props) {
  const { children, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
        {...rest}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        {...rest}
        autoFocus={true}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent {...rest}>
          <SidebarContent {...rest} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} {...rest} />
      <Box {...rest} ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </>
  );
}
