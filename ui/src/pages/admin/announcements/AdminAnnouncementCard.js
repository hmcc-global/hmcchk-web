import { memo } from 'react';
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
} from 'components';
import { FiMoreVertical } from 'react-icons/fi';
import EventCard from 'components/EventCard';
import { BRAND_BLUE, formatDisplayWindow } from './announcementListHelpers';

const AdminAnnouncementCard = (props) => {
  const {
    item,
    busy,
    canCreate,
    canPublish,
    createDisabledReason,
    publishDisabledReason,
    onEdit,
    onDuplicate,
    onPublish,
    onDelete,
  } = props;

  return (
    <Box p={4} borderRadius="lg" borderWidth="1px">
      {/* Card body is the real public EventCard (WYSIWYG); the rail carries the
          admin metadata and actions — rail on top on mobile, right side on md+. */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 4 }}>
        <Flex
          order={{ base: 1, md: 2 }}
          direction={{ base: 'row', md: 'column' }}
          justify={{ base: 'space-between', md: 'flex-start' }}
          align={{ base: 'flex-start', md: 'stretch' }}
          gap={3}
          flexShrink={0}
          w={{ base: '100%', md: '14rem' }}
          pb={{ base: 3, md: 0 }}
          pl={{ base: 0, md: 4 }}
          borderBottomWidth={{ base: '1px', md: '0px' }}
          borderBottomColor="gray.200"
          borderLeftWidth={{ base: '0px', md: '1px' }}
          borderLeftColor="gray.200"
        >
          <Stack spacing={1} minW={0} flex={1}>
            {(item.isInWeb || item.isInPpt) && (
              <HStack spacing={2} flexWrap="wrap">
                {item.isInWeb && <Badge colorScheme="teal">Web</Badge>}
                {item.isInPpt && <Badge colorScheme="orange">PPT</Badge>}
                {item.isInWeb && (
                  <Badge colorScheme={item.isPublished ? 'green' : 'gray'}>
                    {item.isPublished ? 'Published' : 'Unpublished'}
                  </Badge>
                )}
              </HStack>
            )}
            <Text fontSize="sm" color="gray.600">
              <Text as="span" fontWeight="bold">
                Visible:{' '}
              </Text>
              {formatDisplayWindow(item)}
            </Text>
            <Text fontSize="sm" color="gray.600">
              <Text as="span" fontWeight="bold">
                Submitter:{' '}
              </Text>
              {item.submittedBy || '-'}
            </Text>
            <Text fontSize="sm" color="gray.600">
              <Text as="span" fontWeight="bold">
                Last updated by:{' '}
              </Text>
              {item.lastUpdatedBy || '-'}
            </Text>
          </Stack>
          <HStack
            spacing={2}
            direction={{ base: 'row', md: 'column' }}
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
          >
            <Button
              size="sm"
              colorScheme="blue"
              bgColor={BRAND_BLUE}
              _hover={{ opacity: '90%' }}
              onClick={() => onEdit(item.id)}
              isLoading={busy}
            >
              Edit
            </Button>
            {item.isInWeb && (
              <Tooltip
                label={publishDisabledReason}
                isDisabled={!publishDisabledReason}
                hasArrow
              >
                <Box>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme={item.isPublished ? 'gray' : 'green'}
                    isDisabled={!canPublish || busy}
                    isLoading={busy}
                    onClick={() => {
                      if (canPublish) onPublish(item.id);
                    }}
                  >
                    {item.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                </Box>
              </Tooltip>
            )}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label={`More actions for ${item.title}`}
                icon={<FiMoreVertical />}
                variant="ghost"
                size="sm"
                alignSelf={{ base: 'center', md: 'flex-end' }}
                isDisabled={busy}
              />
              <MenuList>
                {canCreate ? (
                  <MenuItem onClick={() => onDuplicate(item.id)}>
                    Duplicate
                  </MenuItem>
                ) : (
                  <Tooltip label={createDisabledReason} hasArrow>
                    <Box>
                      <MenuItem isDisabled>Duplicate</MenuItem>
                    </Box>
                  </Tooltip>
                )}
                <MenuDivider />
                <Tooltip
                  label={publishDisabledReason}
                  isDisabled={!publishDisabledReason}
                  hasArrow
                >
                  <Box>
                    <MenuItem
                      color="red.500"
                      isDisabled={!canPublish}
                      onClick={() => {
                        if (canPublish) onDelete(item.id);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Box>
                </Tooltip>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Box flex={1} minW={0} order={{ base: 2, md: 1 }}>
          <EventCard eventData={item} />
        </Box>
      </Flex>
    </Box>
  );
};

export default memo(AdminAnnouncementCard);
