import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  useDisclosure,
  usePrefersReducedMotion,
} from 'components';
import { FiChevronLeft, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  ADMIN_FONT,
  adminFocusRing,
  adminNavGroups,
  adminShellColors,
  isAdminNavItemActive,
  suppressAdminMouseFocus,
} from './adminNav';

const WIDE_ADMIN_QUERY = '(min-width: 1280px)';
const SIDEBAR_WIDTH = '248px';
const RAIL_WIDTH = '72px';
const SIDEBAR_EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

const useIsWideAdmin = () => {
  const [isWide, setIsWide] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(WIDE_ADMIN_QUERY).matches;
  });

  useEffect(() => {
    const query = window.matchMedia(WIDE_ADMIN_QUERY);
    const handleChange = () => {
      setIsWide(query.matches);
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return isWide;
};

const NavGroups = (props) => {
  const { isCollapsed, onNavigate, pathname } = props;

  return adminNavGroups.map((group) => {
    const items = Array.isArray(group.items) ? group.items : [];
    return (
      <Box key={group.label} mt={group.label === 'Start' ? 0 : '18px'}>
        {!isCollapsed && (
          <Text
            mx="10px"
            mb="6px"
            fontFamily={ADMIN_FONT}
            fontSize="12px"
            fontWeight="600"
            color={adminShellColors.muted}
          >
            {group.label}
          </Text>
        )}
        {items.map((item) => {
          const isActive = isAdminNavItemActive(pathname, item.path);
          return (
            <Link
              key={item.path}
              as={RouterLink}
              to={item.path}
              aria-label={item.name}
              aria-current={isActive ? 'page' : undefined}
              title={item.name}
              display="flex"
              alignItems="center"
              justifyContent={isCollapsed ? 'center' : 'flex-start'}
              gap="10px"
              w="100%"
              px={isCollapsed ? 0 : '10px'}
              py="8px"
              borderRadius="8px"
              fontFamily={ADMIN_FONT}
              fontWeight={isActive ? '600' : '500'}
              fontSize="15px"
              color={isActive ? adminShellColors.blue : adminShellColors.ink}
              bg={isActive ? adminShellColors.blueSoft : 'transparent'}
              textDecoration="none"
              _hover={{
                textDecoration: 'none',
                bg: isActive
                  ? adminShellColors.blueSoft
                  : adminShellColors.wash,
                color: isActive ? adminShellColors.blue : adminShellColors.ink,
              }}
              _focus={{ boxShadow: 'none', outline: 'none' }}
              sx={adminFocusRing}
              onMouseDown={suppressAdminMouseFocus}
              onClick={onNavigate}
            >
              {item.icon && (
                <Icon as={item.icon} boxSize="18px" flex="none" aria-hidden />
              )}
              {!isCollapsed && <Text as="span">{item.name}</Text>}
            </Link>
          );
        })}
      </Box>
    );
  });
};

const SidebarPanel = (props) => {
  const { isCollapsed, showCollapse, onToggleCollapse, onNavigate, user } =
    props;
  const { pathname } = useLocation();
  const signedInName =
    typeof user?.fullName === 'string' ? user.fullName.trim() : '';

  return (
    <Flex direction="column" flex="1" minH="0" overflowY="auto">
      <Flex
        align="center"
        gap="8px"
        px={isCollapsed ? 0 : '10px'}
        pb="18px"
        justify={isCollapsed ? 'center' : 'flex-start'}
      >
        {!isCollapsed && (
          <>
            <Text
              fontFamily={ADMIN_FONT}
              fontSize="18px"
              fontWeight="700"
              letterSpacing="-0.03em"
              color={adminShellColors.ink}
            >
              HMCC
            </Text>
            <Text
              fontFamily={ADMIN_FONT}
              fontSize="14px"
              fontWeight="600"
              color={adminShellColors.muted}
            >
              Admin
            </Text>
          </>
        )}
        {showCollapse && (
          <IconButton
            aria-label={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
            aria-expanded={!isCollapsed}
            aria-controls="admin-sidebar"
            icon={
              <Icon
                as={isCollapsed ? FiChevronRight : FiChevronLeft}
                boxSize="18px"
              />
            }
            onClick={onToggleCollapse}
            variant="ghost"
            ml={isCollapsed ? 0 : 'auto'}
            minW="32px"
            w="32px"
            h="32px"
            borderRadius="8px"
            color={adminShellColors.muted}
            _hover={{ bg: adminShellColors.wash, color: adminShellColors.ink }}
            _focus={{ boxShadow: 'none', outline: 'none' }}
            sx={adminFocusRing}
          />
        )}
      </Flex>
      <Box as="nav" aria-label="Admin" id="admin-sidebar">
        <NavGroups
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          pathname={pathname}
        />
      </Box>
      {!isCollapsed && signedInName && (
        <Text
          mt="auto"
          px="10px"
          pt="16px"
          pb="4px"
          fontFamily={ADMIN_FONT}
          fontSize="13px"
          fontWeight="600"
          color={adminShellColors.ink}
        >
          Signed in as {signedInName}
        </Text>
      )}
    </Flex>
  );
};

const SidebarWithHeader = (props) => {
  const { children, user } = props;
  const isWide = useIsWideAdmin();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (isWide && isOpen) onClose();
  }, [isWide, isOpen, onClose]);

  const handleToggleCollapse = () => {
    setIsCollapsed((collapsed) => !collapsed);
  };

  const sidebarTransition = prefersReducedMotion
    ? 'none'
    : `width 180ms ${SIDEBAR_EASE}`;

  return (
    <Flex
      position="relative"
      direction={isWide ? 'row' : 'column'}
      align="stretch"
      bg={adminShellColors.page}
      minH="100%"
      p={isWide ? '12px' : 0}
      gap={isWide ? '12px' : 0}
      fontFamily={ADMIN_FONT}
      color={adminShellColors.ink}
    >
      <Box
        as="a"
        href="#admin-main"
        position="absolute"
        left="16px"
        top="-40px"
        zIndex="2"
        bg={adminShellColors.paper}
        color={adminShellColors.blue}
        px="12px"
        py="8px"
        borderRadius="8px"
        fontFamily={ADMIN_FONT}
        fontWeight="600"
        _focus={{ top: '12px' }}
      >
        Skip to content
      </Box>
      {isWide ? (
        <Flex
          direction="column"
          flex="none"
          w={isCollapsed ? RAIL_WIDTH : SIDEBAR_WIDTH}
          h="calc(100vh - 7vh - 24px)"
          position="sticky"
          top="0"
          bg={adminShellColors.paper}
          border="1px solid"
          borderColor={adminShellColors.line}
          borderRadius="16px"
          boxShadow={adminShellColors.shadow}
          transition={sidebarTransition}
          overflow="hidden"
        >
          <Box
            display="flex"
            flexDirection="column"
            flex="1"
            minH="0"
            h="100%"
            px={isCollapsed ? '10px' : '14px'}
            pt="22px"
            pb="16px"
          >
            <SidebarPanel
              isCollapsed={isCollapsed}
              showCollapse
              onToggleCollapse={handleToggleCollapse}
              user={user}
            />
          </Box>
        </Flex>
      ) : (
        <>
          <Flex align="center" gap="12px" px="4" pt="3">
            <IconButton
              ref={menuButtonRef}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="admin-sidebar"
              icon={<Icon as={isOpen ? FiX : FiMenu} boxSize="18px" />}
              onClick={isOpen ? onClose : onOpen}
              variant="outline"
              borderColor={adminShellColors.line}
              bg={adminShellColors.paper}
              color={adminShellColors.ink}
              borderRadius="8px"
              w="40px"
              h="40px"
              minW="40px"
              _hover={{ bg: adminShellColors.wash }}
              _focus={{ boxShadow: 'none', outline: 'none' }}
              sx={adminFocusRing}
            />
            <Flex align="center" gap="8px">
              <Text
                fontFamily={ADMIN_FONT}
                fontSize="18px"
                fontWeight="700"
                letterSpacing="-0.03em"
                color={adminShellColors.ink}
              >
                HMCC
              </Text>
              <Text
                fontFamily={ADMIN_FONT}
                fontSize="14px"
                fontWeight="600"
                color={adminShellColors.muted}
              >
                Admin
              </Text>
            </Flex>
          </Flex>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={menuButtonRef}
          >
            <DrawerOverlay bg={adminShellColors.overlay} />
            <DrawerContent
              aria-label="Admin navigation"
              w={SIDEBAR_WIDTH}
              maxW={SIDEBAR_WIDTH}
              bg={adminShellColors.paper}
            >
              <DrawerCloseButton
                color={adminShellColors.muted}
                borderRadius="8px"
                _hover={{
                  bg: adminShellColors.wash,
                  color: adminShellColors.ink,
                }}
                _focus={{ boxShadow: 'none', outline: 'none' }}
                sx={adminFocusRing}
                onMouseDown={suppressAdminMouseFocus}
              />
              <Box
                display="flex"
                flexDirection="column"
                h="100%"
                minH="0"
                px="14px"
                pt="48px"
                pb="16px"
              >
                <SidebarPanel
                  isCollapsed={false}
                  showCollapse={false}
                  onNavigate={onClose}
                  user={user}
                />
              </Box>
            </DrawerContent>
          </Drawer>
        </>
      )}
      <Box
        id="admin-main"
        tabIndex={-1}
        flex="1"
        minW="0"
        p="4"
        _focus={{ outline: 'none' }}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default SidebarWithHeader;
