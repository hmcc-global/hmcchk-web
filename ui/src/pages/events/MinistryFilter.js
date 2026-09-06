import { Box, Button, HStack, Text } from 'components';
import { FaCaretDown, FaCaretUp, FaFilter, FaTimes } from 'react-icons/fa';

const MinistryFilter = ({
  w,
  display,
  flex,
  compact,
  open,
  selected,
  tagList,
  onToggle,
  onClear,
  panelId = 'ministry-panel',
}) => {
  const hasSelection = selected !== '';
  const activeTag = hasSelection ? tagList[Number(selected)] : '';

  if (compact) {
    return (
      <Button
        w={w}
        flex={flex}
        display={display}
        onClick={onToggle}
        variant="outline"
        borderRadius={30}
        h={{ base: '36px', md: '40px' }}
        px={2}
        fontSize="14px"
        transition="all 0.18s"
        borderColor="#4A6EEB"
        bg={hasSelection ? '#4A6EEB' : 'transparent'}
        color={hasSelection ? 'white' : '#4A6EEB'}
        _hover={
          hasSelection
            ? { bg: '#5C7BF0', color: 'white', borderColor: '#5C7BF0' }
            : {
                borderColor: '#4A6EEB',
                bgColor: 'rgba(74, 110, 235, 0.1)',
                color: '#4A6EEB',
              }
        }
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        title={hasSelection ? activeTag : 'More Filters'}
      >
        <HStack spacing={1} justify="center">
          <FaFilter />
          {open ? <FaCaretUp /> : <FaCaretDown />}
        </HStack>
      </Button>
    );
  }

  return (
    <Button
      w={w}
      display={display}
      onClick={onToggle}
      variant="outline"
      borderRadius={30}
      h={{ base: '44px', md: '40px' }}
      px={3}
      transition="all 0.18s"
      borderColor="#4A6EEB"
      bg={hasSelection ? '#4A6EEB' : 'transparent'}
      color={hasSelection ? 'white' : '#4A6EEB'}
      fontWeight="700"
      fontSize={{ base: 'sm', md: 'md' }}
      _hover={
        hasSelection
          ? { bg: '#5C7BF0', color: 'white', borderColor: '#5C7BF0' }
          : { bgColor: 'rgba(74, 110, 235, 0.1)' }
      }
      _active={
        hasSelection
          ? { bg: '#5C7BF0' }
          : { bgColor: 'rgba(74, 110, 235, 0.1)' }
      }
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
    >
      <HStack spacing={2} justify="center" w="100%">
        <Text noOfLines={1}>{hasSelection ? activeTag : 'More Filters'}</Text>
        {hasSelection ? (
          <Box
            as="span"
            aria-label="Clear ministry filter"
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            <FaTimes />
          </Box>
        ) : open ? (
          <FaCaretUp />
        ) : (
          <FaCaretDown />
        )}
      </HStack>
    </Button>
  );
};

export default MinistryFilter;
