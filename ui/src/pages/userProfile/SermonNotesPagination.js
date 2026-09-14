import { AspectRatio, Box, Button, chakra, Flex, Text } from 'components';
import { CheckIcon } from 'components/icons';
import { Link } from 'react-router-dom';

const FALLBACK_IMAGE =
  'https://hongkong.sub.hmccglobal.org/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png';
const BRAND_BLUE = '#4A6EEB';
const BRAND_BLUE_HOVER = '#3D5CD9';

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

const SpeakerDate = ({ speaker, dateString, fontSize }) => (
  <Text mb={1.5} fontSize={fontSize} color="gray.600" noOfLines={1}>
    <Box as="span">{speaker?.trim() || 'Unknown'}</Box>
    {dateString && (
      <>
        <Box as="span" mx={1.5} color="gray.300">
          •
        </Box>
        <Box as="span">{dateString}</Box>
      </>
    )}
  </Text>
);

const SavedStatus = ({ savedDate, fontSize }) => (
  <Flex alignItems="center" gap={1.5}>
    <Box
      w="14px"
      h="14px"
      borderRadius="full"
      bg={savedDate ? BRAND_BLUE : 'gray.300'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
    >
      <CheckIcon boxSize="8px" color="white" />
    </Box>
    <Text fontSize={fontSize} color="gray.600" fontWeight="medium">
      {savedDate ? `Saved: ${savedDate}` : 'Unsaved'}
    </Text>
  </Flex>
);

const SermonNotesPagination = ({
  sermonNotes,
  currentPage,
  setCurrentPage,
  sermonSeriesImages = {},
}) => {
  const itemsPerPage = 5; // Fixed at 5 items per page

  const totalPages = Math.max(1, Math.ceil(sermonNotes.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const indexOfLastItem = validCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSermonNotes = sermonNotes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (currentSermonNotes.length === 0) {
    return (
      <Text color="gray.500" textAlign="center" py={6}>
        No sermon notes yet.
      </Text>
    );
  }

  return (
    <Box>
      {currentSermonNotes.map((item) => {
        const imageSrc =
          sermonSeriesImages[item?.sermonSeries] || item?.imageLink;
        const savedDate = item.isSaved ? formatDate(item.childUpdatedAt) : '';
        const dateString = formatDate(item?.date);

        return (
          <Box
            as={Link}
            to={`/sermons/notes/${item.sermonId}`}
            key={item.sermonId}
            bgColor="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="12px"
            boxShadow="0 1px 3px rgba(0,0,0,0.06)"
            p={{ base: 2, md: 4 }}
            pr={{ base: 3, md: 4 }}
            mb={{ base: 3, md: 4 }}
            display="block"
            cursor="pointer"
            transition="all 0.15s"
            _hover={{ borderColor: BRAND_BLUE }}
            _focusVisible={{ boxShadow: '0 0 0 3px rgba(74,110,235,0.4)' }}
          >
            <Flex
              direction="row"
              alignItems="center"
              flex="1"
              minW={0}
              gap={{ base: 3, md: 4 }}
            >
              <AspectRatio
                ratio={16 / 9}
                w={{ base: '84px', md: '120px' }}
                flexShrink={0}
                borderRadius="8px"
                overflow="hidden"
                bgColor="white"
              >
                {/* inline objectFit overrides AspectRatio's built-in cover, so non-16:9 art letterboxes instead of cropping */}
                <chakra.img
                  src={imageSrc || FALLBACK_IMAGE}
                  alt=""
                  style={{ objectFit: 'contain' }}
                  bgColor="white"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                  w="100%"
                  h="100%"
                />
              </AspectRatio>
              <Box minW={0}>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: '15px', md: 'lg' }}
                  mb={1}
                  color="gray.800"
                >
                  {item?.title || ''}
                </Text>
                <SpeakerDate
                  speaker={item?.speaker}
                  dateString={dateString}
                  fontSize={{ base: '13px', md: 'sm' }}
                />
                <SavedStatus
                  savedDate={savedDate}
                  fontSize={{ base: '13px', md: 'sm' }}
                />
              </Box>
            </Flex>
          </Box>
        );
      })}

      {totalPages > 1 && (
        <Flex justifyContent="flex-end" alignItems="center" mt={4} gap={2}>
          <Button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            isDisabled={validCurrentPage === 1}
            borderRadius="full"
            bg="gray.100"
            color="gray.700"
            _hover={{ bg: 'gray.200' }}
            _disabled={{
              bg: 'gray.100',
              color: 'gray.400',
              cursor: 'not-allowed',
            }}
          >
            &lt;
          </Button>
          <Text
            mx={2}
            textAlign="center"
            fontWeight="semibold"
            color="gray.700"
          >
            {validCurrentPage}/{totalPages}
          </Text>
          <Button
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            isDisabled={validCurrentPage === totalPages}
            borderRadius="full"
            bg={BRAND_BLUE}
            color="white"
            _hover={{ bg: BRAND_BLUE_HOVER }}
            _disabled={{
              bg: '#DFE7FF',
              color: 'gray.500',
              cursor: 'not-allowed',
            }}
          >
            &gt;
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default SermonNotesPagination;
