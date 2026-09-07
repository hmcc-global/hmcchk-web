import { useEffect, useRef, useState } from 'react';
import { Box, Button, HStack, Stack, Text } from 'components';
import { FaCaretDown, FaCaretUp, FaCheck } from 'react-icons/fa';

const PANEL_ID = 'event-type-panel';

const chipHover = (active) =>
  active
    ? { bg: '#5C7BF0', color: 'white', borderColor: '#5C7BF0' }
    : { bg: '#DFE7FF' };

const rowHover = (active) =>
  active ? { bg: '#5C7BF0' } : { bgColor: 'rgba(74, 110, 235, 0.1)' };

/**
 * Single-select dropdown for announcement eventType tags ("More Filters").
 * Owns open/close; parent owns the filtered list via onSelect/onClear.
 * Tags are matched by value, not list index.
 */
const EventTypeFilter = ({
  tagList,
  selectedTag,
  isAllActive,
  onSelect,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const hasSelection = selectedTag !== '';
  const label = hasSelection ? selectedTag : 'More Filters';

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) close();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const rowProps = (active) => ({
    w: '100%',
    h: '40px',
    borderRadius: 14,
    px: { base: 2, md: 3 },
    justifyContent: 'space-between',
    bg: active ? '#4A6EEB' : 'transparent',
    color: active ? 'white' : '#1A202C',
    fontWeight: active ? 700 : 600,
    _hover: rowHover(active),
    type: 'button',
    'aria-pressed': active,
  });

  return (
    <Box ref={rootRef} position="relative" flex="1">
      <Button
        ref={triggerRef}
        w="100%"
        onClick={() => setIsOpen((open) => !open)}
        variant="outline"
        borderRadius={30}
        h={{ base: '36px', md: '40px' }}
        px={{ base: 2, md: 3 }}
        borderColor="#4A6EEB"
        bg={hasSelection ? '#4A6EEB' : 'white'}
        color={hasSelection ? 'white' : '#4A6EEB'}
        fontWeight="700"
        fontSize={{ base: 'xs', md: 'md' }}
        _hover={chipHover(hasSelection)}
        _active={chipHover(hasSelection)}
        type="button"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
      >
        <HStack spacing={2} justify="center" w="100%">
          <Text noOfLines={1}>{label}</Text>
          {isOpen ? <FaCaretUp /> : <FaCaretDown />}
        </HStack>
      </Button>

      {isOpen && (
        <Box
          id={PANEL_ID}
          w={{ base: '240px', md: '100%' }}
          position="absolute"
          top="calc(100% + 12px)"
          right={0}
          zIndex={2}
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius={20}
          bg="white"
          boxShadow="0 12px 32px rgba(26, 32, 44, 0.14)"
          p={2}
        >
          <Stack spacing={1}>
            <Button
              {...rowProps(isAllActive)}
              onClick={() => {
                onClear();
                close();
              }}
            >
              <Text fontSize={{ base: 'xs', md: 'md' }}>All events</Text>
              {isAllActive && <FaCheck />}
            </Button>
            {tagList.length === 0 ? (
              <Text px={3} py={2} fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                No tags yet
              </Text>
            ) : (
              tagList.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <Button
                    key={tag}
                    {...rowProps(isActive)}
                    onClick={() => {
                      if (isActive) onClear();
                      else onSelect(tag);
                      close();
                    }}
                  >
                    <Text fontSize={{ base: 'xs', md: 'md' }}>{tag}</Text>
                    {isActive && <FaCheck />}
                  </Button>
                );
              })
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default EventTypeFilter;
