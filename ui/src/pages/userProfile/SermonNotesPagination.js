import { AspectRatio, Box, Button, chakra, Flex, Text } from 'components';
import { CheckIcon } from 'components/icons';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';

const FALLBACK_IMAGE =
  'https://hongkong.sub.hmccglobal.org/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png';

const SpeakerDate = ({ speaker, dateString, fontSize, noOfLines }) => (
  <Text mb={1.5} fontSize={fontSize} color="gray.600" noOfLines={noOfLines}>
    <Box as="span">{`${speaker?.trim() || 'Unknown'}`}</Box>
    <Box as="span" mx={1.5} color="#CBD5E0">
      •
    </Box>
    <Box as="span">{dateString}</Box>
  </Text>
);

const SavedStatus = ({ savedDate, fontSize }) => (
  <Flex alignItems="center" gap={1.5}>
    <Box
      w="14px"
      h="14px"
      borderRadius="full"
      bg={savedDate ? '#4A6EEB' : '#CBD5E0'}
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

  const [medias, setMedias] = useState({});

  const handleImageLoad = useCallback((img, sermonId) => {
    const { naturalWidth, naturalHeight } = img;
    if (!naturalWidth || !naturalHeight) return;
    const is169 = Math.abs(naturalWidth / naturalHeight - 16 / 9) < 0.02;
    const fitting = is169 ? 'cover' : 'contain';
    const loadedFallback = img.src === FALLBACK_IMAGE;
    setMedias((prev) => {
      const cur = prev[sermonId] || {};
      const failedSrc = loadedFallback ? cur.failedSrc : null;
      if (cur.fit === fitting && cur.failedSrc === failedSrc) return prev;
      return { ...prev, [sermonId]: { ...cur, fit: fitting, failedSrc } };
    });
  }, []);

  const totalPages = Math.max(1, Math.ceil(sermonNotes.length / itemsPerPage));

  const validCurrentPage = Math.min(currentPage, totalPages);

  const indexOfLastItem = validCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSermonNotes = sermonNotes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Box>
      {currentSermonNotes.map((item) => {
        const imageSrc =
          sermonSeriesImages[item?.sermonSeries] || item?.imageLink;

        const media = medias[item.sermonId] || {};
        const currentSrc =
          media.failedSrc === imageSrc
            ? FALLBACK_IMAGE
            : imageSrc || FALLBACK_IMAGE;

        const savedDate = item.isSaved
          ? new Date(item.childUpdatedAt).toLocaleDateString('default', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : null;

        const dateString = item?.date
          ? new Date(item.date).toLocaleDateString('default', {
              day: '2-digit',
              month: 'short', // This will give "Sep"
              year: 'numeric',
            })
          : '';

        return (
          <Box
            as={Link}
            to={`/sermons/notes/${item.sermonId}`}
            key={item.sermonId}
            bgColor="white"
            border="1px solid"
            borderColor="#EDF2F7"
            borderRadius="12px"
            boxShadow="0 1px 3px rgba(0,0,0,0.06)"
            p={{ base: 2, md: 4 }}
            pr={{ base: 3, md: 4 }}
            mb={{ base: 3, md: 4 }}
            display="block"
            cursor="pointer"
            transition="all 0.15s"
            _hover={{ borderColor: '#4A6EEB' }}
            _focusVisible={{
              boxShadow: '0 0 0 3px rgba(74,110,235,0.4)',
            }}
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
                <chakra.img
                  src={currentSrc}
                  alt=""
                  style={{
                    objectFit: media.fit === 'contain' ? 'contain' : 'cover',
                    objectPosition: '50% 50%',
                  }}
                  bgColor="white"
                  onLoad={(e) =>
                    handleImageLoad(e.currentTarget, item.sermonId)
                  }
                  onError={() => {
                    setMedias((prev) => {
                      const cur = prev[item.sermonId] || {};
                      if (cur.failedSrc === imageSrc) return prev;
                      return {
                        ...prev,
                        [item.sermonId]: { ...cur, failedSrc: imageSrc },
                      };
                    });
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
                  color="#1A202C"
                >
                  {item?.title || ''}
                </Text>

                {/* Mobile: compact rows (date + saved status on their own lines) */}
                <Box display={{ base: 'block', md: 'none' }}>
                  <SpeakerDate
                    speaker={item?.speaker}
                    dateString={dateString}
                    fontSize="13px"
                  />
                  <SavedStatus savedDate={savedDate} fontSize="13px" />
                </Box>

                {/* Desktop: combined meta line + saved row */}
                <Box display={{ base: 'none', md: 'block' }}>
                  <SpeakerDate
                    speaker={item?.speaker}
                    dateString={dateString}
                    fontSize="sm"
                    noOfLines={1}
                  />
                  <SavedStatus savedDate={savedDate} fontSize="sm" />
                </Box>
              </Box>
            </Flex>
          </Box>
        );
      })}

      {/* Pagination Controls */}
      <Flex justifyContent="flex-end" alignItems="center" mt={4} gap={2}>
        <Button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          isDisabled={validCurrentPage === 1}
          borderRadius="full"
          bg="#EDF2F7"
          color="gray.700"
          _hover={{ bg: '#E2E8F0' }}
          _disabled={{
            bg: '#EDF2F7',
            color: 'gray.400',
            cursor: 'not-allowed',
          }}
        >
          &lt;
        </Button>
        <Text mx={2} textAlign="center" fontWeight="semibold" color="gray.700">
          {validCurrentPage}/{totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          isDisabled={validCurrentPage === totalPages}
          borderRadius="full"
          bg="#4A6EEB"
          color="white"
          _hover={{ bg: '#3D5CD9' }}
          _disabled={{
            bg: '#DFE7FF',
            color: 'gray.500',
            cursor: 'not-allowed',
          }}
        >
          &gt;
        </Button>
      </Flex>
    </Box>
  );
};

export default SermonNotesPagination;
